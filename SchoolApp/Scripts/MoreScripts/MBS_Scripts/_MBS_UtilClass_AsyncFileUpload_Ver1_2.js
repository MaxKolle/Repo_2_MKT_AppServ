
//=======================================================================================================================
// Class Definition and Contruction Function
//=======================================================================================================================
function MBS_FileUploadClass() {
    
    //=======================================================================================================================
    // Private Class Attributes
    //=======================================================================================================================
    var Intern_DragNDropDiv;
    //var Intern_ThumbImageSize = @thumbImageSizePX;
    var Intern_MaxFileSize = 3000000;
    //var Intern_ListPhotos = $("#@listPhotos");
    var Intern_URL;
    var Intern_Data = {};
    var Intern_ResultObj;
    var Intern_Margin = 0; //3;
    var Intern_ImgDropBoxTextElem;
    var Intern_ImgDropBoxInitText;
    var Intern_NumUpedImg = 0;
    var Intern_MaxNumUpedImgs = 1;
    var Intern_DeleteURL;

    var InternFunct_ImgDisplay = null;
    var InternFunct_ResultHandle;
    var InternFunct_ProgressMonitor = null;
    

    var textPercUped = "Percentage Uploaded";

    //=======================================================================================================================
    // Public Class Attributes
    //=======================================================================================================================
    //this.LatestUpdateDate = LatestUpdateDate;
    //this.renewDataAfter_NumDays = renewDataAfter_NumDays;



    //=======================================================================================================================
    // Private Class Methods
    //=======================================================================================================================
    function Upload(name, file, remote, data, successFn, progressFn) {

        //debugger;

        // if we don't have post data, move it along
        if (typeof data != "object") {
            progressFn = successFn;
            successFn = data;
        }
        if (file) {
            var formData = new FormData();
            formData.append(name, file);
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
        
    function onDragOver(evt) {

        //debugger;

        evt.stopPropagation();      //these lines prevent the browser from openning the files
        evt.preventDefault();       //we want to handle what happens after the drop ourselves
    }

    function onFilesDropped(evt) {

        //debugger;

        evt.stopPropagation();
        evt.preventDefault();

        if (Intern_NumUpedImg >= Intern_MaxNumUpedImgs) {
            alert("You may not add any further pictures");
            return;
        }

        var file = evt.dataTransfer.files[0];
        //if file is an image
        if (!(file.type.match("image.*"))) {      //'image.*' is a regular expression. u could have use 'ímage.jpg' or 'image.png' or whatever
            alert("The uploaded file was not an image");
        }
        else if (file.size > Intern_MaxFileSize)
        {
            alert("The uploaded file was not of the correct size");
        }
        else{
            var reader = new FileReader();
            reader.onload = function (evt) {

                //debugger;

                //var resultdata = evt.target.result;
                var img = new Image();        //creating new image object
                img.src = evt.target.result;
                
                if (InternFunct_ImgDisplay !== undefined && InternFunct_ImgDisplay !== null) {
                    InternFunct_ImgDisplay(img);
                }
                else {
                    img.style.marginTop = Intern_Margin + "px";
                    img.style.marginBottom = Intern_Margin + "px";
                    img.className = "clsCenterElement";
                    Util_DisplayImageInDiv(img, Intern_DragNDropDiv, true);
                }

                Upload(
                    "Image1",
                    file,
                    Intern_URL,
                    Intern_Data,
                    function (result) {
                        Intern_NumUpedImg++;
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
                            }
                        }
                        else {
                            InternFunct_ProgressMonitor(value);
                        }
                    }
                );
            }
            reader.readAsDataURL(file);
        }
    }


    //=======================================================================================================================
    // Public Class Methods
    //=======================================================================================================================
    function DeleteFile(fileName) {
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
        Intern_NumUpedImg--;
    }
    
    function setDragNDropDiv(element) {

        //debugger;

        Intern_DragNDropDiv = $("#" + element);
        //Intern_DragNDropDiv = element;

        //debugger;
        //console.log(Intern_DragNDropDiv.height() + "   " + Intern_DragNDropDiv.width());

        //Intern_DragNDropDiv.bind("dragover", onDragOver);
        //Intern_DragNDropDiv.bind("drop", onFilesDropped);

        //Intern_DragNDropDiv.addEventListener("dragover", onDragOver);
        //Intern_DragNDropDiv.addEventListener("drop", onFilesDropped);

        document.getElementById(element).addEventListener("dragover", onDragOver);
        document.getElementById(element).addEventListener("drop", onFilesDropped);

        //Intern_DragNDropDiv.addEventListener("dragover", onDragOver);
        //Intern_DragNDropDiv.addEventListener("drop", onFilesDropped);
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
    function setNumUpedImg(element) {
        Intern_NumUpedImg = element;
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
    function getResultObj() {
        return Intern_ResultObj;
    }

    this.setDragNDropDiv = setDragNDropDiv;
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
    this.getResultObj = getResultObj;

    this.DeleteFile = DeleteFile;
    this.Initialize = Initialize;
    
    
    //=======================================================================================================================
    // Call the constructor function
    //=======================================================================================================================
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