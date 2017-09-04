
function GlobalRemovePopUp() {
    $("#dialogBoxes_Level1").html("");
    $("#dialogBoxes_Level2").html("");
}

//===========================================================================================================================

function Utilities_PopupDiv_Alert(message) {
    Utilities_PopupDiv_QuickMsg({ popupLevel: 1, title: "Alert", description: message });
}

//===========================================================================================================================

function Utilities_PopupDiv_QuickMsg(ParamObject) {
    var popupLevel = 2;
    var title = "Title";
    var description = "Description";
    var trueButtonText = "Ok";
    //var falseButtonText = "No";
    var TrueFunction = null;
    //var FalseFunction = null;

    var ret = false;

    var divContent = '';

    if (ParamObject !== undefined && ParamObject !== null) {
        if (ParamObject.popupLevel !== undefined && ParamObject.popupLevel !== null)
            popupLevel = ParamObject.popupLevel;
        if (ParamObject.title !== undefined && ParamObject.title !== null)
            title = ParamObject.title;
        if (ParamObject.description !== undefined && ParamObject.description !== null)
            description = ParamObject.description;
        if (ParamObject.trueButtonText !== undefined && ParamObject.trueButtonText !== null)
            trueButtonText = ParamObject.trueButtonText;
        //if (ParamObject.falseButtonText !== undefined && ParamObject.falseButtonText !== null)
        //    falseButtonText = ParamObject.falseButtonText;
        if (ParamObject.TrueFunction !== undefined && ParamObject.TrueFunction !== null)
            TrueFunction = ParamObject.TrueFunction;
        //if (ParamObject.FalseFunction !== undefined && ParamObject.FalseFunction !== null)
        //    FalseFunction = ParamObject.FalseFunction;
    }

    divContent += '<div id="modal" style="opacity: 1; visibility: hidden; top: 371px;">';
    divContent += '<div id="heading">' + title + '</div>';
    divContent += '<div id="content"><p>' + description + '</p>';
    divContent += '<div id="divButtonContainer">';
    //divContent += '<div style="margin-left:auto; margin-right:auto; display:block; width:260px">';
    divContent += '<a href="#" id="trueButton" class="button green close" style="margin-left: 85px;"><img src="/Images/SomeControls/PopupModalDialog/tick.png" />' + trueButtonText + '</a>';
    //divContent += '<a href="#" id="falseButton" class="button red close"><img src="/Images/SomeControls/PopupModalDialog/cross.png" />' + falseButtonText + '</a>';
    divContent += '</div></div></div>';

    $(document).ready(function () {
        if (popupLevel === 1)
            $("#dialogBoxes_Level1").html(divContent);
        else
            $("#dialogBoxes_Level2").html(divContent);

        $("#trueButton").click(function () {
            ret = true;
            if (TrueFunction !== undefined && TrueFunction !== null) {
                TrueFunction();
            }
        });
        //$("#falseButton").click(function () {
        //    ret = false;
        //    if (FalseFunction !== undefined && FalseFunction !== null) {
        //        FalseFunction();
        //    }
        //});

        //debugger;

        $('#modal').reveal({                // The item which will be opened with reveal
            animation: 'fade',              // fade, fadeAndPop, none
            animationspeed: 600,            // how fast animtions are
            closeonbackgroundclick: true,   // if you click background will modal close?
            dismissmodalclass: 'close'      // the class of a button or element that will close an open modal
        });
    });

    return ret;
}

//===========================================================================================================================

function Utilities_PopupDiv_Confirm(ParamObject) {
    var popupLevel = 2;
    var title = "Title";
    var description = "Description";
    var trueButtonText = "Yes";
    var falseButtonText = "No";
    var TrueFunction = null;
    var FalseFunction = null;

    var ret = false;

    var divContent = '';

    if (ParamObject !== undefined && ParamObject !== null) {
        if (ParamObject.popupLevel !== undefined && ParamObject.popupLevel !== null)
            popupLevel = ParamObject.popupLevel;
        if (ParamObject.title !== undefined && ParamObject.title !== null)
            title = ParamObject.title;
        if (ParamObject.description !== undefined && ParamObject.description !== null)
            description = ParamObject.description;
        if (ParamObject.trueButtonText !== undefined && ParamObject.trueButtonText !== null)
            trueButtonText = ParamObject.trueButtonText;
        if (ParamObject.falseButtonText !== undefined && ParamObject.falseButtonText !== null)
            falseButtonText = ParamObject.falseButtonText;
        if (ParamObject.TrueFunction !== undefined && ParamObject.TrueFunction !== null)
            TrueFunction = ParamObject.TrueFunction;
        if (ParamObject.FalseFunction !== undefined && ParamObject.FalseFunction !== null)
            FalseFunction = ParamObject.FalseFunction;
    }

    divContent += '<div id="modal" style="opacity: 1; visibility: hidden; top: 371px;">';
    divContent += '<div id="heading">' + title + '</div>';
    divContent += '<div id="content"><p>' + description + '</p>';
    divContent += '<div id="divButtonContainer">';
    //divContent += '<div style="margin-left:auto; margin-right:auto; display:block; width:260px">';
    divContent += '<a href="#" id="trueButton" class="button green close"><img src="/Images/SomeControls/PopupModalDialog/tick.png" />' + trueButtonText + '</a>';
    divContent += '<a href="#" id="falseButton" class="button red close"><img src="/Images/SomeControls/PopupModalDialog/cross.png" />' + falseButtonText + '</a>';
    divContent += '</div></div></div>';

    $(document).ready(function () {
        if (popupLevel === 1)
            $("#dialogBoxes_Level1").html(divContent);
        else
            $("#dialogBoxes_Level2").html(divContent);

        $("#trueButton").click(function () {
            ret = true;
            if (TrueFunction !== undefined && TrueFunction !== null) {
                TrueFunction();
            }
        });
        $("#falseButton").click(function () {
            ret = false;
            if (FalseFunction !== undefined && FalseFunction !== null) {
                FalseFunction();
            }
        });

        //debugger;

        $('#modal').reveal({                // The item which will be opened with reveal
            animation: 'fade',              // fade, fadeAndPop, none
            animationspeed: 600,            // how fast animtions are
            closeonbackgroundclick: true,   // if you click background will modal close?
            dismissmodalclass: 'close'      // the class of a button or element that will close an open modal
        });
    });

    return ret;
}

//===========================================================================================================================

function Utilities_PopupDiv_SubPage(ParamObject) {
    var popupLevel = 2;
    var popupWidth = 360;
    var popupHeight = 144;

    var title = "Title";
    var divBodyContent = "Div Body Content";
    var trueButtonText = "Submit";
    var falseButtonText = "Cancel";
    var scrollToDivID = null
    var AfterLoadFunction = null;
    var TrueFunction = null;
    var FalseFunction = null;
    var ShowStandardBtns = true;
    var CloseElemSelector = null;

    var ret = false;

    var divContent = '';

    //debugger;

    if (ParamObject !== undefined && ParamObject !== null) {
        if (ParamObject.popupLevel !== undefined && ParamObject.popupLevel !== null)
            popupLevel = ParamObject.popupLevel;
        if (ParamObject.popupWidth !== undefined && ParamObject.popupWidth !== null)
            popupWidth = ParamObject.popupWidth;
        if (ParamObject.popupHeight !== undefined && ParamObject.popupHeight !== null)
            popupHeight = ParamObject.popupHeight;
        if (ParamObject.title !== undefined && ParamObject.title !== null)
            title = ParamObject.title;
        if (ParamObject.divBodyContent !== undefined && ParamObject.divBodyContent !== null)
            divBodyContent = ParamObject.divBodyContent;
        if (ParamObject.trueButtonText !== undefined && ParamObject.trueButtonText !== null)
            trueButtonText = ParamObject.trueButtonText;
        if (ParamObject.falseButtonText !== undefined && ParamObject.falseButtonText !== null)
            falseButtonText = ParamObject.falseButtonText;
        if (ParamObject.scrollToDivID !== undefined && ParamObject.scrollToDivID !== null && ParamObject.scrollToDivID !== "")
            scrollToDivID = ParamObject.scrollToDivID;
        if (ParamObject.AfterLoadFunction !== undefined && ParamObject.AfterLoadFunction !== null)
            AfterLoadFunction = ParamObject.AfterLoadFunction;
        if (ParamObject.TrueFunction !== undefined && ParamObject.TrueFunction !== null)
            TrueFunction = ParamObject.TrueFunction;
        if (ParamObject.FalseFunction !== undefined && ParamObject.FalseFunction !== null)
            FalseFunction = ParamObject.FalseFunction;
        if (ParamObject.ShowStandardBtns !== undefined && ParamObject.ShowStandardBtns !== null)
            ShowStandardBtns = ParamObject.ShowStandardBtns;
        if (ParamObject.CloseElemSelector !== undefined && ParamObject.CloseElemSelector !== null && ParamObject.CloseElemSelector !== "")
            CloseElemSelector = ParamObject.CloseElemSelector;
    }

    //divContent += '<div id="modal" style="opacity: 1; visibility: hidden; top: 371px;">';
    divContent += '<div id="modal" style="opacity: 1; visibility: hidden; width:' + popupWidth + 'px; height:' + (parseInt(popupHeight) + 91) + 'px;">';
    divContent += '<div id="heading" style="width:' + popupWidth + 'px;">' + title + '</div>';
    divContent += '<div id="content" style="width:' + popupWidth + 'px; height:' + (parseInt(popupHeight) + 46) + 'px;">' + divBodyContent;
    if (ShowStandardBtns === true) {
        divContent += '<div id="divButtonContainer">';
        divContent += '<a href="#" id="trueButton" class="button green close"><img src="/Images/SomeControls/PopupModalDialog/tick.png" />' + trueButtonText + '</a>';
        divContent += '<a href="#" id="falseButton" class="button red close"><img src="/Images/SomeControls/PopupModalDialog/cross.png" />' + falseButtonText + '</a>';
        divContent += '</div>';
    }
    divContent += '</div></div>';
        
    $(document).ready(function () {
        function RemovePopUp() {
            if (popupLevel === 1)
                $("#dialogBoxes_Level1").html("");
            else
                $("#dialogBoxes_Level2").html("");
        }
        //ParamObject.RemovePopUp = RemovePopUp;

        if (popupLevel === 1)
            $("#dialogBoxes_Level1").html(divContent);
        else
            $("#dialogBoxes_Level2").html(divContent);
        if (scrollToDivID !== null)
            $("html, body").animate({ scrollTop: $('#' + scrollToDivID).offset().top }, 1000);

        if (CloseElemSelector !== null) {
            $(CloseElemSelector).click(RemovePopUp);
            /*
            $(CloseElemSelector).click(function () {
                if (popupLevel === 1)
                    $("#dialogBoxes_Level1").html("");
                else
                    $("#dialogBoxes_Level2").html("");
            }); */
        }

        if (AfterLoadFunction !== undefined && AfterLoadFunction !== null) {
            AfterLoadFunction();
        }

        if (ShowStandardBtns === true) {
            $("#trueButton").click(function () {
                ret = true;
                if (TrueFunction !== undefined && TrueFunction !== null) {
                    TrueFunction();
                }
                if (scrollToDivID !== null)
                    $("html, body").animate({ scrollTop: $('#' + scrollToDivID).offset().top }, 1000);
            });
            $("#falseButton").click(function () {
                ret = false;
                if (FalseFunction !== undefined && FalseFunction !== null) {
                    FalseFunction();
                }
                if (scrollToDivID !== null)
                    $("html, body").animate({ scrollTop: $('#' + scrollToDivID).offset().top }, 1000);
            });
        }

        //debugger;

        $('#modal').reveal({                // The item which will be opened with reveal
            animation: 'fade',              // fade, fadeAndPop, none
            animationspeed: 600,            // how fast animtions are
            closeonbackgroundclick: true,   // if you click background will modal close?
            dismissmodalclass: 'close'      // the class of a button or element that will close an open modal
        });
    });

    return ret;
}