
/*
//debugger;

//var increaseHeight = 50;
//var wellPadding10Elem = $(".well .padding-10");

////var wellPadding10ElemHeight = wellPadding10Elem.css("height")
////var heightOfElem = parseInt(wellPadding10Elem.css("height").replace("px", ""));

////wellPadding10Elem.css("height", heightOfElem + increaseHeight + "px");


//wellPadding10Elem.css("height", "+=" + increaseHeight);

debugger;

//$('input[type="checkbox"]#smart-fixed-header').click();
//$('input[type="checkbox"]#smart-fixed-navigation').click();
//$('input[type="checkbox"]#smart-fixed-ribbon').click();
//$('input[type="checkbox"]#smart-fixed-footer').click();
//$('input[type="checkbox"]#smart-rtl').click();

//$("#smart-topmenu").change();
//$('input[type="checkbox"]#colorblind-friendly').click();

$('input[type="checkbox"]#smart-fixed-container').click();
$("#smart-bgimages img:nth-child(3)").click()   // nth-child ranges from 2 to 6 inclusive


$('#smart-style-2').click();    // smart-style-n: with the value of n ranging from 0 to 5 inclusive

//$('#smart-style-0').click();
//$('#smart-style-1').click();
$('#smart-style-2').click();
//$('#smart-style-3').click();
//$('#smart-style-4').click();
//$('#smart-style-5').click();
*/


// Fixing Responsiveness in the List Pages ======

//debugger;

function Utilities_FixListUIResponsiveness() {

    var divListItemImgWidth = $(".divListItemImg").first().width();
    var param_divListItemDetailsWidth = 193;

    var mainAppDivElem = $("#mainAppDiv");
    //var divListItemDetailsElem = $(".divListItemDetails");
    var mainAppDivWidth;
    var divListItemDetailsWidth;

    function SetDivListItemDetailsWidth() {

        //debugger;

        mainAppDivWidth = mainAppDivElem.width();
        divListItemDetailsWidth = mainAppDivWidth - divListItemImgWidth /* 152 */ - 5;

        console.log("mainAppDivWidth: " + mainAppDivWidth + "; divListItemDetailsWidth: " + divListItemDetailsWidth);

        divListItemDetailsElem = $(".divListItemDetails");
        //divListItemDetailsElem.width(divListItemDetailsWidth);
        divListItemDetailsElem.css("width", divListItemDetailsWidth + "px");

        if (divListItemDetailsWidth < param_divListItemDetailsWidth) {
            $(".divListItemBottom").height("2.5em");
            $(".divListItemMid").hide();
        }
        else {
            $(".divListItemBottom").height("17px");
            $(".divListItemMid").show();
        }
    }
    SetDivListItemDetailsWidth();

    //*%* Note: Ludovick - REF: PRODLIST - Please consider in this particular case having an implementation where by we immidiately 
    // handle the event when it occures and then block and wait for a while before handling another occurrence.
    var param_TimeToRespond = 500;
    var timedExecutionObj = MBS_TimedExecutionClass(param_TimeToRespond, function () {
        SetDivListItemDetailsWidth();
    });

    //*%* Note: Ludovick - Please consider removing the event when the view is destroyed, like it was the case with 
    // the Photos display directive.
    $(window).bind("resize.ListUIResponsiveness", function () {
    //$(window).resize(function () {

        //debugger;

        timedExecutionObj.EventOccured();
        //SetDivListItemDetailsWidth();
    });
    
    $("#divForListingItems").bind("remove.ListUIResponsiveness", function () {
    //$("#divForListingItems").on("remove", function () {

        //debugger;

        $(this).unbind("remove.ListUIResponsiveness");
        $(window).unbind("resize.ListUIResponsiveness");

        /*
        $(this).off("remove");
        $(window).off("resize");
        */
    });
    
}

// =========================================================================================================================



// =========================================================================================================================

//debugger;

function Utilities_FixMenuDisplayOnMobile(uiElem, removeMonitorElem, ArrOps) {
    
    //debugger;
    console.log('function Utilities_FixMenuDisplayOnMobile(uiElem, removeMonitorElem, ArrOps) { - 0004');

    var intern_uiElem = uiElem;
    var intern_removeMonitorElem = removeMonitorElem;
    var intern_ArrOps = ArrOps;

    if (intern_ArrOps === undefined || intern_ArrOps === null) {
        if (intern_removeMonitorElem === undefined || intern_removeMonitorElem === null) {
            return;
        }
        else {
            intern_ArrOps = intern_removeMonitorElem;
        }
    }

    function PerformUIOperation() {

        //debugger;
        console.log('function PerformUIOperation() { - 0005');

        var uiElemWidth = intern_uiElem.width();

        var intervalFound = false;
        var defaultIndex = -1;
        var minVal, maxVal, Operation;
        var lenArrOps = intern_ArrOps.length;
        for (var i = 0; i < lenArrOps; i++) {
            if ((Utilities_ParseConditionalValue(intern_ArrOps[i].minPx, null) === null) && (Utilities_ParseConditionalValue(intern_ArrOps[i].maxPx, null) === null)) {
                defaultIndex = i;
            }
            else {
                minVal = Utilities_ParseConditionalValue(intern_ArrOps[i].minPx, 0);
                maxVal = Utilities_ParseConditionalValue(intern_ArrOps[i].maxPx, Number.MAX_SAFE_INTEGER);
                if (minVal <= uiElemWidth && uiElemWidth <= maxVal) {
                    Operation = Utilities_ParseConditionalValue(intern_ArrOps[i].Operation, function () { });
                    Operation();
                    intervalFound = true;
                    break;
                }
            }
        }
        if (intervalFound === false && defaultIndex >= 0) {
            Operation = Utilities_ParseConditionalValue(intern_ArrOps[defaultIndex].Operation, function () { });
            Operation();

            //intern_ArrOps[defaultIndex]();
        }
    }
    PerformUIOperation();

    //*%* Note: Ludovick - REF: PRODLIST - Please consider in this particular case having an implementation where by we immidiately 
    // handle the event when it occures and then block and wait for a while before handling another occurrence.
    var param_TimeToRespond = 500;
    var timedExecutionObj = MBS_TimedExecutionClass(param_TimeToRespond, function () {
        PerformUIOperation();
    });

    //*%* Note: Ludovick - Please consider removing the event when the view is destroyed, like it was the case with 
    // the Photos display directive.
    intern_uiElem.bind("resize.ManagingMenuToggling", function () {
    //intern_uiElem.resize(function () {

        //debugger;
        console.log('intern_uiElem.resize(function () { - 0006');

        timedExecutionObj.EventOccured();
        //PerformUIOperation();
    });

    if (intern_removeMonitorElem !== undefined && intern_removeMonitorElem !== null) {
        intern_removeMonitorElem.bind("remove.ManagingMenuToggling", function () {
        //intern_removeMonitorElem.on("remove", function () {

            //debugger;
            console.log('intern_removeMonitorElem.on("remove", function () { - 0007');

            $(this).unbind("remove.ManagingMenuToggling");
            intern_uiElem.unbind("resize.ManagingMenuToggling");

            /*
            $(this).off("remove");
            intern_uiElem.off("resize");
            */
        });
    }
    
}

// =========================================================================================================================
