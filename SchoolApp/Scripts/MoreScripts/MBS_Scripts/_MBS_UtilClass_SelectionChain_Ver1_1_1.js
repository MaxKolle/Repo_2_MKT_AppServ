//=======================================================================================================================
// Class Definition and Contruction Function
//=======================================================================================================================
function MBS_SelectionChainClass(nameOfChain, MaxSize) {
    
    //=======================================================================================================================
    // Private Class Attributes
    //=======================================================================================================================
    var Intern_NameOfChain = "";
    if(nameOfChain !== undefined && nameOfChain !== null)
        Intern_NameOfChain = nameOfChain;
    var Intern_ControllerName = ""; // Intern_NameOfChain;

    var Intern_LanguageID = 1;
    var Intern_ChainEditLevel = 0;
    var Intern_RenewLocationDataAfter = 30;
    var Intern_LatestUpdateDate; // = new Date();
    var Intern_UseLocalStore = true;
    var Intern_HTMLLocalStore_MaxSize = 100000;
    if (MaxSize !== undefined && MaxSize !== null)
        Intern_HTMLLocalStore_MaxSize = MaxSize;

    var Intern_ArrElemIDs = [];
    var Intern_ArrDefaultVals = [];
    var Intern_ArrDefaultText = [];
    var Intern_ArrInitialVals = [];
    var Intern_ArrServerCallMethods = [];
    var Intern_ArrFullServerCallMethods = null;
    var Intern_ArrElements = [];

    var Intern_OptionGenerFunct_Single = Utilities_GenerateSelectOpt;
    var Intern_OptionGenerFunct_Multiple = Utilities_DictionaryToSelectOpt;


    //=======================================================================================================================
    // Public Class Attributes
    //=======================================================================================================================
    //this.LatestUpdateDate = LatestUpdateDate;
    //this.renewDataAfter_NumDays = renewDataAfter_NumDays;






    //=======================================================================================================================
    // Private Class Methods
    //=======================================================================================================================

    function RemoveChangeHandlers() {

        //debugger;

        var numElements = Intern_ArrElemIDs.length;
        for (var j = numElements - 1; j >= 0; j--) {
            Intern_ArrElements[j].unbind("change.SelectionChain");
        }
    }




    //=======================================================================================================================
    // Public Class Methods
    //=======================================================================================================================

    function SetChangeHandlers() {

        //debugger;

        if (Intern_UseLocalStore === true) {
            var LocalDataStore = new KCT_LocalStorageClass(Intern_NameOfChain, Intern_LanguageID, Intern_LatestUpdateDate, Intern_RenewLocationDataAfter, Intern_HTMLLocalStore_MaxSize);
        }

        var numElements = Intern_ArrElemIDs.length;
        for (var j = numElements - 1; j > 0; j--) {
            //Intern_ArrElements[j].html(Intern_OptionGenerFunct_Single(Intern_ArrDefaultVals[j], Intern_ArrDefaultText[0])).attr('disabled', 'disabled');

            // Corrected by Kevin
            Intern_ArrElements[j].html(Intern_OptionGenerFunct_Single(Intern_ArrDefaultVals[j], Intern_ArrDefaultText[j - 1])).attr('disabled', 'disabled');
        }

        var ajaxURL;
        var ChangeHandler;
        for (var i = 0; i < numElements - 1; i++) {
            ChangeHandler = function () {

                var currentID = $(this).attr('id');
                var a = Utilities_StringInArrayIndex(currentID, Intern_ArrElemIDs);
                
                if (Intern_ArrElements[a].val() === Intern_ArrDefaultVals[a]) {
                    //Intern_ArrElements[a + 1].html(Intern_OptionGenerFunct_Single(Intern_ArrDefaultVals[j], Intern_ArrDefaultText[a])).attr('disabled', 'disabled');
                    for (var j = numElements - 1; j >= a + 1; j--) {
                        Intern_ArrElements[j].html(Intern_OptionGenerFunct_Single(Intern_ArrDefaultVals[j], Intern_ArrDefaultText[a])).attr('disabled', 'disabled');
                    }
                }
                else {
                    for (var j = numElements - 1; j > a + 1; j--) {
                        Intern_ArrElements[j].html(Intern_OptionGenerFunct_Single(Intern_ArrDefaultVals[j], Intern_ArrDefaultText[a + 1])).attr('disabled', 'disabled');
                    }

                    //debugger;

                    if (Intern_UseLocalStore === true) {
                        var dataFromLocalStore = LocalDataStore.GetDataFromLocalStore(Intern_ArrElemIDs[a] + "_" + Intern_ArrElements[a].val());
                        if (dataFromLocalStore !== undefined && dataFromLocalStore !== null) {
                            Intern_ArrElements[a + 1].removeAttr("disabled").html(Intern_OptionGenerFunct_Multiple(dataFromLocalStore, Intern_ArrDefaultVals[a + 1], Intern_ArrDefaultText[a + 1]));
                            Intern_ArrElements[a + 1].val(Intern_ArrInitialVals[a + 1]);
                            Intern_ArrInitialVals[a + 1] = Intern_ArrDefaultVals[a + 1];
                            Intern_ArrElements[a + 1].change();
                            if (Intern_ChainEditLevel >= (a + 1)) Intern_ArrElements[a + 1].attr('disabled', 'disabled');
                            return;
                        }
                    }
                    if (Intern_ArrFullServerCallMethods !== undefined && Intern_ArrFullServerCallMethods !== null)
                        ajaxURL = Intern_ArrFullServerCallMethods[a];
                    else
                        ajaxURL = Intern_ControllerName === "" ? '/' + Intern_ArrServerCallMethods[a] : '/' + Intern_ControllerName + '/' + Intern_ArrServerCallMethods[a];
                    $.ajax({
                        url: ajaxURL,
                        type: "GET",
                        data: { id: Intern_ArrElements[a].val() },
                        async: false,
                        cache: false,
                        success: function (result) {

                            //debugger;

                            Intern_ArrElements[a + 1].removeAttr("disabled").html(Intern_OptionGenerFunct_Multiple(result, Intern_ArrDefaultVals[a + 1], Intern_ArrDefaultText[a + 1]));
                            Intern_ArrElements[a + 1].val(Intern_ArrInitialVals[a + 1]);
                            Intern_ArrInitialVals[a + 1] = Intern_ArrDefaultVals[a + 1];
                            Intern_ArrElements[a + 1].change();
                            if (Intern_ChainEditLevel >= (a + 1)) Intern_ArrElements[a + 1].attr('disabled', 'disabled');                            
                            if (Intern_UseLocalStore === true) {
                                LocalDataStore.SetDataToLocalStore(Intern_ArrElemIDs[a] + "_" + Intern_ArrElements[a].val(), result);
                            }
                        }
                    });
                }
            }
            //Intern_ArrElements[i].change(ChangeHandler);
            Intern_ArrElements[i].bind("change.SelectionChain", ChangeHandler);
        }

        // Here is to ensure that the initial value of the first dropdown is set. This was mostly modified to handle the workings of the system with AngularJS (Date: 06/03/2016) 
        // BEGIN {
        /*
        if (Intern_ArrInitialVals[0] === Intern_ArrDefaultVals[0]) {
            Intern_ArrElements[0].val(Intern_ArrDefaultVals[0]);
        }   */
        Intern_ArrElements[0].val(Intern_ArrInitialVals[0]);
        // } END

        for (var i = 0; i < numElements - 1; i++) {
            if (Intern_ArrInitialVals[i] !== Intern_ArrDefaultVals[i]) {
                Intern_ArrElements[i].change();
            }
        }
    }
    function DestroyObject() {
        RemoveChangeHandlers();
    }

    function setNameOfChain(element) {
        Intern_NameOfChain = element;
    }
    function setControllerName(element) {
        Intern_ControllerName = element;
    }
    function setLanguageID(element) {
        Intern_LanguageID = element;
    }
    function setChainEditLevel(element) {
        Intern_ChainEditLevel = element;
    }
    function setRenewLocationDataAfter(element) {
        Intern_RenewLocationDataAfter = element;
    }
    function setLatestUpdateDate(element) {
        Intern_LatestUpdateDate = element;
    }
    function setUseLocalStore(element) {
        Intern_UseLocalStore = element;
    }
    function setArrElemIDs(element) {
        Intern_ArrElemIDs = element;
        var numElements = Intern_ArrElemIDs.length;
        for (var i = 0; i < numElements; i++) {
            Intern_ArrElements[i] = $("#" + Intern_ArrElemIDs[i]);
        }
    }
    function setArrDefaultVals(element) {
        Intern_ArrDefaultVals = element;
    }
    function setArrDefaultText(element) {
        Intern_ArrDefaultText = element;
    }
    function setArrInitialVals(element) {
        Intern_ArrInitialVals = element;
    }
    function setArrServerCallMethods(element) {
        Intern_ArrServerCallMethods = element;
    }
    function setArrFullServerCallMethods(element) {
        Intern_ArrFullServerCallMethods = element;
    }
    function setOptionGenerFunct_Single(funct) {
        Intern_OptionGenerFunct_Single = funct;
    }
    function setOptionGenerFunct_Multiple(funct) {
        Intern_OptionGenerFunct_Multiple = funct;
    }
    
    this.SetChangeHandlers = SetChangeHandlers;
    this.DestroyObject = DestroyObject;

    this.setNameOfChain = setNameOfChain;
    this.setControllerName = setControllerName;
    this.setLanguageID = setLanguageID;
    this.setChainEditLevel = setChainEditLevel;
    this.setRenewLocationDataAfter = setRenewLocationDataAfter;
    this.setLatestUpdateDate = setLatestUpdateDate;
    this.setUseLocalStore = setUseLocalStore;
    this.setArrElemIDs = setArrElemIDs;
    this.setArrDefaultVals = setArrDefaultVals;
    this.setArrDefaultText = setArrDefaultText;
    this.setArrInitialVals = setArrInitialVals;
    this.setArrServerCallMethods = setArrServerCallMethods;
    this.setArrFullServerCallMethods = setArrFullServerCallMethods;
    this.setOptionGenerFunct_Single = setOptionGenerFunct_Single;
    this.setOptionGenerFunct_Multiple = setOptionGenerFunct_Multiple;
    
    this.Initialize = Initialize;
    
    
    //=======================================================================================================================
    // Call the constructor function
    //=======================================================================================================================
    //The Constructor Method or Function
    function Initialize()
    {

    }        
    Initialize();

}