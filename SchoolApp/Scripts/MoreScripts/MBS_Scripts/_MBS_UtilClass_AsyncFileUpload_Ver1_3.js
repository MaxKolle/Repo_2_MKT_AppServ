
//
// Class Definition and Contruction Function
//
function MBS_FileUploadClass() {
    
    //
    // Private Class Attributes
    //
    var Intern_DragNDropDiv;
    var Intern_FileInputElem;
    var Intern_FileInputElem_ForRef;
    //var Intern_ThumbImageSize = @thumbImageSizePX;
    var Intern_MaxPostSize = 3000000;
    var Intern_MaxFileSize = Intern_MaxPostSize; // 3000000;
    //var Intern_ListPhotos = $("#@listPhotos");
    var Intern_URL;
    var Intern_Data = {};
    var Intern_ResultObj;
    var Intern_Margin = 0; //3;
    var Intern_ImgDropBoxTextElem;
    var Intern_ImgDropBoxInitText;
    var Intern_NumUpedImg = 0;
    var Intern_NumUpingImg = 0;
    var Intern_MaxNumUpedImgs = 1;
    var Intern_DeleteURL;

    var InternFunct_ImgDisplay = null;
    var InternFunct_ResultHandle;
    var InternFunct_ProgressMonitor = null;
    
    var Intern_IsBusy = false;

    var textPercUped = "Percentage Uploaded";

    //
    // Public Class Attributes
    //
    //this.LatestUpdateDate = LatestUpdateDate;
    //this.renewDataAfter_NumDays = renewDataAfter_NumDays;



    //
    // Private Class Methods
    //
    function Upload(name, files, remote, data, successFn, progressFn) {

        //debugger;

        // if we don't have post data, move it along
        if (typeof data != "object") {
            progressFn = successFn;
            successFn = data;
        }
        if (files) {
            var formData = new FormData();
            for (var i in files) {
                formData.append(i, files[i]);
            }
            // if we have post data too
            if (typeof data == "object") {
                for (var i in data) {
                    formData.append(i, data[i]);
                }
            }
            // do the ajax request
            $.ajax({
                url: remote,
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                xhr: function () {
                    myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload && progressFn) {
                        myXhr.upload.addEventListener('progress', function (prog) {
                            var value = ~~((prog.loaded / prog.total) * 100);
                            // if we passed a progress function
                            if (progressFn && typeof progressFn == "function") {
                                progressFn(prog, value);
                                // if we passed a progress element
                            } else if (progressFn) {
                                $(progressFn).val(value);
                            }
                        }, false);
                    }
                    return myXhr;
                },
                complete: function (res) {
                    if (successFn) successFn(res.responseText);
                }
            });
        }
    }

    function OnFinishedReadingFile(file) {

        //debugger;

        var img = new Image();        //creating new image object
        img.src = file.target.result;
        img.onload = function () {

            //debugger;

            if (InternFunct_ImgDisplay !== undefined && InternFunct_ImgDisplay !== null) {
                InternFunct_ImgDisplay(img, file.target.fileName);
            }
            else {
                img.style.marginTop = Intern_Margin + "px";
                img.style.marginBottom = Intern_Margin + "px";
                img.className = "clsCenterElement";
                Util_DisplayImageInDiv(img, Intern_DragNDropDiv, true);
            }
            Intern_NumUpingImg++;
        }
    }

    /*
    function OnFinishedReadingFile(file) {

        //debugger;

        var img = new Image();        //creating new image object
        img.src = file.target.result;

        if (InternFunct_ImgDisplay !== undefined && InternFunct_ImgDisplay !== null) {
            InternFunct_ImgDisplay(img, this.fileName);
        }
        else {
            img.style.marginTop = Intern_Margin + "px";
            img.style.marginBottom = Intern_Margin + "px";
            img.className = "clsCenterElement";
            Util_DisplayImageInDiv(img, Intern_DragNDropDiv, true);
        }
        Intern_NumUpingImg++;
    }   */

    function ProcessFiles(fileList) {

        //debugger;

        if (Intern_IsBusy) return;

        var totalFileSize = 0;
        var files = [];
        var continueProcess = true;
        $.each(fileList, function (index, file) {

            //debugger;

            if (!(file.type.match("image.*"))) {      //'image.*' is a regular expression. u could have use 'ímage.jpg' or 'image.png' or whatever
                alert("The uploaded file '" + file.name + "' is not an image");
                continueProcess = false;
            }
            else if (file.size > Intern_MaxFileSize) {
                alert("The uploaded file '" + file.name + "' is of size " + file.size / 1000 + "KB, which is greater than the maximum file size of " + Intern_MaxFileSize / 1000 + "KB");
                continueProcess = false;
            }
            else {
                files[files.length] = file;
            }

            totalFileSize += file.size;
            if (totalFileSize > Intern_MaxPostSize) {
                alert("The total size of the selected files is greater than the maximum post size of " + Intern_MaxPostSize / 1000 + "KB");
                continueProcess = false;
            }
        });

        if (continueProcess && files.length > 0) {
            if (Intern_NumUpingImg + files.length > Intern_MaxNumUpedImgs) {
                alert("You may not add any further pictures");
                return;
            }

            //debugger;

            Intern_IsBusy = true;
            for (i = 0; i < files.length; i++) {
                var reader = new FileReader();
                reader.onloadend = OnFinishedReadingFile;
                //reader.onload = OnFinishedReadingFile;
                reader.fileName = files[i].name;
                reader.readAsDataURL(files[i]);
            }

            Upload(
                "Image1",
                files,
                Intern_URL,
                Intern_Data,
                function (result) {
                    //Intern_NumUpedImg++;
                    Intern_NumUpedImg = Intern_NumUpingImg;
                    Intern_ResultObj = JSON.parse(result);
                    InternFunct_ResultHandle(Intern_ResultObj);
                },
                function (prog, value) {
                    if (InternFunct_ProgressMonitor === null || InternFunct_ProgressMonitor === undefined) {
                        if (value < 100) {
                            Intern_ImgDropBoxTextElem.html(value + "% " + textPercUped);
                        }
                        else {
                            Intern_ImgDropBoxTextElem.html(Intern_ImgDropBoxInitText);
                            Intern_IsBusy = false;
                        }
                    }
                    else {
                        if (value < 100) {
                            Intern_ImgDropBoxTextElem.html("Please Hold, " + value + "% " + textPercUped);
                        }
                        else {
                            Intern_ImgDropBoxTextElem.html(Intern_ImgDropBoxInitText);
                            Intern_IsBusy = false;
                        }
                        InternFunct_ProgressMonitor(value);
                    }
                }
            );
        }
    }

    function onDragOver(evt) {
        evt.stopPropagation();      //these lines prevent the browser from openning the files
        evt.preventDefault();       //we want to handle what happens after the drop ourselves
    }
    function onFilesDropped(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        return ProcessFiles(evt.dataTransfer.files);
    }
    function onDragDropDivClicked(evt) {
        evt.stopPropagation();      //these lines prevent the browser from openning the files
        evt.preventDefault();       //we want to handle what happens after the drop ourselves

        Intern_FileInputElem.trigger("click");
    }
    function onFilesSelected(evt) {

        //debugger;

        return ProcessFiles(evt.currentTarget.files);
    }
        
    function RemoveHandlers() {
        Intern_DragNDropDiv.removeEventListener("dragover", onDragOver);
        Intern_DragNDropDiv.removeEventListener("drop", onFilesDropped);
        Intern_DragNDropDiv.removeEventListener("click", onDragDropDivClicked);

        Intern_FileInputElem_ForRef.removeEventListener("change", onFilesSelected);
    }

    //
    // Public Class Methods
    //
    function DeleteFile(fileName, mainFolderName) {

        //debugger;

        Intern_FileInputElem.val("");

        if (mainFolderName !== undefined && mainFolderName !== null && mainFolderName !== "") {
            $.ajax({
                url: Intern_DeleteURL,
                type: "POST",
                data: { Code: Intern_Data.Code, FileName: fileName, MainFolderName: mainFolderName },
                async: true,
                cache: false,
                dataType: "json",
                success: function (result) {
                    //ExclusionList = result;
                }
            });
        }
        else {
            $.ajax({
                url: Intern_DeleteURL,
                type: "POST",
                data: { Code: Intern_Data.Code, FileName: fileName },
                async: true,
                cache: false,
                dataType: "json",
                success: function (result) {
                    //ExclusionList = result;
                }
            });
        }

        Intern_NumUpedImg--;
        Intern_NumUpingImg--;
    }

    function DestroyObject() {
        RemoveHandlers();
    }

    function setDragNDropDiv(element) {

        //debugger;

        Intern_DragNDropDiv = document.getElementById(element); //$("#" + element);

        Intern_DragNDropDiv.addEventListener("dragover", onDragOver);
        Intern_DragNDropDiv.addEventListener("drop", onFilesDropped);
        Intern_DragNDropDiv.addEventListener("click", onDragDropDivClicked);

        /*
        var Elem = document.getElementById(element);

        Elem.addEventListener("dragover", onDragOver);
        Elem.addEventListener("drop", onFilesDropped);
        Elem.addEventListener("click", onDragDropDivClicked);   */
    }
    function setFileInputElem(element) {

        //debugger;

        Intern_FileInputElem = $("#" + element);

        Intern_FileInputElem_ForRef = document.getElementById(element);
        Intern_FileInputElem_ForRef.addEventListener("change", onFilesSelected);
    }

    //function setThumbImageSize(element) {
    //    Intern_ThumbImageSize = element;
    //}
    function setMaxFileSize(element) {
        Intern_MaxFileSize = element;
    }
    //function setListPhotos(element) {
    //    Intern_ListPhotos = element;
    //}
    function setURL(element) {
        Intern_URL = element;
    }
    function setData(element) {
        Intern_Data = element;
    }
    function setMargin(element) {
        Intern_Margin = element;
    }
    function setNumUpedImg(num) {
        Intern_NumUpedImg = num;
        Intern_NumUpingImg = num;
    }
    function setMaxNumUpedImgs(element) {
        Intern_MaxNumUpedImgs = element;
    }
    function setImgDropBoxTextElem(element) {
        //Intern_ImgDropBoxTextElem = $("#" + element);
        Intern_ImgDropBoxTextElem = element;
        Intern_ImgDropBoxInitText = element.html();
    }
    function setDeleteURL(element) {
        Intern_DeleteURL = element;
    }
    
    function setFunct_ImgDisplay(funct) {
        InternFunct_ImgDisplay = funct;
    }
    function setFunct_ResultHandle(funct) {
        InternFunct_ResultHandle = funct;
    }
    function setFunct_ProgressMonitor(funct){
        InternFunct_ProgressMonitor = funct
    }
    
    function getNumUpedImg() {
        return Intern_NumUpedImg;
    }
    function getNumUpingImg() {
        return Intern_NumUpingImg;
    }
    function getResultObj() {
        return Intern_ResultObj;
    }
    function getIsBusy() {
        return Intern_IsBusy;
    }

    this.DestroyObject = DestroyObject;

    this.setDragNDropDiv = setDragNDropDiv;
    this.setFileInputElem = setFileInputElem;
    //this.setThumbImageSize = setThumbImageSize;
    this.setMaxFileSize = setMaxFileSize;
    //this.setListPhotos = setListPhotos;
    this.setURL = setURL;
    this.setData = setData;
    this.setMargin = setMargin;
    this.setNumUpedImg = setNumUpedImg;
    this.setMaxNumUpedImgs = setMaxNumUpedImgs;
    this.setImgDropBoxTextElem = setImgDropBoxTextElem;
    this.setDeleteURL = setDeleteURL;
    
    this.setFunct_ImgDisplay = setFunct_ImgDisplay;
    this.setFunct_ResultHandle = setFunct_ResultHandle;
    this.setFunct_ProgressMonitor = setFunct_ProgressMonitor;
    
    this.getNumUpedImg = getNumUpedImg;
    this.getNumUpingImg = getNumUpingImg;
    this.getResultObj = getResultObj;
    this.getIsBusy = getIsBusy;

    this.DeleteFile = DeleteFile;
    this.Initialize = Initialize;
    
    
    //
    // Call the constructor function
    //
    //The Constructor Method or Function
    function Initialize()
    {
        var browserHasFileAPI = (window.File && window.FileReader);  //checks to see if we have the file api available in this browser 
        if (!browserHasFileAPI) {
            alert("This browser does not support the file API");
            return;
        }
    }        
    Initialize();

}