Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
}

function Utilities_GetUTCDate() {
    var tempDate = new Date();
    return new Date(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getDate() - 1, tempDate.getUTCHours(), tempDate.getUTCMinutes(), tempDate.getUTCSeconds());
}
// =====================================================================================================================================================================================================================

function Utilities_ToDisplayDateStd(date) {

    var tempDate;
    var timeMilliSec = date.substr(6, 13);
    if (IsNumericVal(timeMilliSec))
        tempDate = new Date(parseInt(timeMilliSec));
    else
        tempDate = new Date(date);

    //var tempDate = new Date(parseInt(date));

    var tempDateStr = tempDate.toDateString() + " " + tempDate.toLocaleTimeString();
    
    return tempDateStr;
}

// =====================================================================================================================================================================================================================

function Utilities_GenerateDateFromFormate(date, format) {

    //debugger;

    //var index = 0;
    var extract = 0;
    var day, month, year, hour, min, sec;
    for(var i = 0; i < date.length; i++) {
        if(format[i] === "d" && format[i + 1] === "d"){
            extract = date.substr(i, 2);
            day = parseInt(extract);
            i+=2;
        }
        else if (format[i] === "M" && format[i + 1] === "M" && format[i + 2] === "M") {
            extract = date.substr(i, 3);
            month = parseInt(extract);
            i+=3;
        }
        else if(format[i] === "M" && format[i + 1] === "M"){
            extract = date.substr(i, 2);
            month = parseInt(extract);
            i+=2;
        }
        else if(format[i] === "y" && format[i + 1] === "y" && format[i + 2] === "y" && format[i + 3] === "y"){
            extract = date.substr(i, 4);
            year = parseInt(extract);
            i+=4;
        }
        else if(format[i] === "y" && format[i + 1] === "y"){
            extract = date.substr(i, 2);
            year = 2000 + parseInt(extract);
            i+=2;
        }
        else if(format[i] === "H" && format[i + 1] === "H"){
            extract = date.substr(i, 2);
            hour = parseInt(extract);
            i+=2;
        }
        else if(format[i] === "m" && format[i + 1] === "m"){
            extract = date.substr(i, 2);
            min = parseInt(extract);
            i+=2;
        }
        else if(format[i] === "s" && format[i + 1] === "s"){
            extract = date.substr(i, 2);
            sec = parseInt(extract);
            i+=2;
        }
        else {

        }
    }
    return new Date(year, month - 1, day, hour, min, sec);
}


function Utilities_GenerateDateFromDateTimeDictionary(dateObjStr) {

    //debugger;

    var dateObj = JSON.parse(dateObjStr.replace(/&quot;/g, '"'));

    return new Date(dateObj.year, dateObj.month - 1, dateObj.day, dateObj.hour, dateObj.minute, dateObj.second);
}


// ===========================================================================================================================

function Utilities_ToDisplayDate(date, gmtCorrection, weekDaysArr, monthArr, includeTime) {

    if (includeTime === undefined || includeTime === null)
        includeTime = true;
    
    //debugger;

    var tempDate;
    var timeMilliSec = date.substr(6, 13);
    if (IsNumericVal(timeMilliSec))
        tempDate = new Date(parseInt(timeMilliSec));
    else
        tempDate = new Date(date);

    //var tempDate = new Date(parseInt(date));


    tempDate = tempDate.addHours(gmtCorrection);
    var hours = tempDate.getHours() >= 10 ? tempDate.getHours().toString() : "0" + tempDate.getHours().toString();
    var minutes = tempDate.getMinutes() >= 10 ? tempDate.getMinutes().toString() : "0" + tempDate.getMinutes().toString();
    var tempDateStr = weekDaysArr[tempDate.getDay()] + ", "
        + tempDate.getDate() + " " + monthArr[tempDate.getMonth()] + " " + tempDate.getFullYear();
    if(includeTime === true)
        tempDateStr = tempDateStr + ";   " + hours + ":" + minutes;

    return tempDateStr;
}
//function Utilities_ToDisplayDate(date, gmtCorrection, weekDaysArr, monthArr) {

//    var tempDate = new Date(parseInt(date));
//    tempDate = tempDate.addHours(gmtCorrection);
//    var hours = tempDate.getUTCHours() >= 10 ? tempDate.getUTCHours().toString() : "0" + tempDate.getUTCHours().toString();
//    var minutes = tempDate.getUTCMinutes() >= 10 ? tempDate.getUTCMinutes().toString() : "0" + tempDate.getUTCMinutes().toString();
//    var tempDateStr = weekDaysArr[tempDate.getUTCDay()] + ", "
//        + tempDate.getUTCDate() + " " + monthArr[tempDate.getUTCMonth()] + " " + tempDate.getUTCFullYear() + ";   "
//        + hours + ":" + minutes;

//    return tempDateStr;
//}
function Utilities_ToDisplayDateLong(date, gmtCorrection, includeTime) {

    var Intern_gmtCorrection = 0;
    if (gmtCorrection !== undefined && gmtCorrection !== null && gmtCorrection !== "")
        Intern_gmtCorrection = gmtCorrection;

    var WeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var MonthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return Utilities_ToDisplayDate(date, Intern_gmtCorrection, WeekDays, MonthsArr, includeTime);
}
function Utilities_ToDisplayDateShort(date, gmtCorrection, includeTime) {

    //debugger;

    var Intern_gmtCorrection = 0;
    if (gmtCorrection !== undefined && gmtCorrection !== null && gmtCorrection !== "")
        Intern_gmtCorrection = gmtCorrection;

    var WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var MonthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return Utilities_ToDisplayDate(date, Intern_gmtCorrection, WeekDays, MonthsArr, includeTime);
}

// ===========================================================================================================================

//*%* Note: Ludovick - Please note that the code below is a duplicate of the code above.
    // Thus it will be a good idea to sort it all out

// Date Time in Format: yyyy-mm-ddThh:mm:ss - 2015-03-25T12:00:00Z
function Utilities_ToDisplayDate_Form2(date, gmtCorrection, weekDaysArr, monthArr, includeTime) {

    if (includeTime === undefined || includeTime === null)
        includeTime = true;

    //debugger;

    var tempDate = new Date(date);
    tempDate = tempDate.addHours(gmtCorrection);
    var hours = tempDate.getHours() >= 10 ? tempDate.getHours().toString() : "0" + tempDate.getHours().toString();
    var minutes = tempDate.getMinutes() >= 10 ? tempDate.getMinutes().toString() : "0" + tempDate.getMinutes().toString();
    var tempDateStr = weekDaysArr[tempDate.getDay()] + ", "
        + tempDate.getDate() + " " + monthArr[tempDate.getMonth()] + " " + tempDate.getFullYear();
    if (includeTime === true)
        tempDateStr = tempDateStr + ";   " + hours + ":" + minutes;

    return tempDateStr;
}

function Utilities_ToDisplayDateShort_Form2(date, gmtCorrection, includeTime) {

    //debugger;

    var Intern_gmtCorrection = 0;
    if (gmtCorrection !== undefined && gmtCorrection !== null && gmtCorrection !== "")
        Intern_gmtCorrection = gmtCorrection;

    var WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var MonthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return Utilities_ToDisplayDate_Form2(date, Intern_gmtCorrection, WeekDays, MonthsArr, includeTime);
}


// ==============================================================================================================================================================================================================================================

function Utilities_GenerateDateObject(inputDate, dateDelimiter) {
    dateDelimiter = (dateDelimiter === undefined || dateDelimiter === null || dateDelimiter === "") ? "/" : dateDelimiter;

    var dateArray = inputDate.split(dateDelimiter);
    var dateObject = {};
    if (dateArray.length === 3) {
        dateObject.year = parseInt(dateArray[2]);
        dateObject.month = parseInt(dateArray[1]);
        dateObject.day = parseInt(dateArray[0]);
        dateObject.hour = 0;
        dateObject.minute = 0;
        dateObject.second = 0;
        return dateObject;
    }
    return null;
}

function Utilities_GenerateDateTimeObject(inputDate, inputTime, dateDelimiter, timeDelimiter) {

    dateDelimiter = (dateDelimiter === undefined || dateDelimiter === null || dateDelimiter === "") ? "/" : dateDelimiter;
    timeDelimiter = (timeDelimiter === undefined || timeDelimiter === null || timeDelimiter === "") ? ":" : timeDelimiter;

    var dateObject = null;
    if (inputDate !== undefined && inputDate !== null && inputDate !== "") {
        var dateArray = inputDate.split(dateDelimiter);
        if (dateArray.length === 3) {
            dateObject = {};
            dateObject.year = parseInt(dateArray[2]);
            dateObject.month = parseInt(dateArray[1]);
            dateObject.day = parseInt(dateArray[0]);
            dateObject.hour = 0;
            dateObject.minute = 0;
            dateObject.second = 0;
        }
    }
    if (inputTime !== undefined && inputTime !== null && inputTime !== "") {
        var timeArray = inputTime.trim().split(" ");
        var hourMin = timeArray[0].split(timeDelimiter);
        if (hourMin.length >= 2) {
            /*
            if (dateObject === null) {
                dateObject.year = 1900;
                dateObject.month = 1;
                dateObject.day = 1;
            }
            */
            dateObject.hour = (timeArray.length >= 2 && timeArray[1].toLowerCase() === "pm") ? parseInt(hourMin[0]) + 12 : parseInt(hourMin[0]);
            dateObject.minute = parseInt(hourMin[1]);
            dateObject.second = (hourMin[3] === undefined || hourMin[3] === null || hourMin[3] === "") ? 0 : parseInt(hourMin[3]);
        }
    }
    return dateObject;
}

function Utilities_ObtainDateTime_DDMMYYYY_HHmmss(dateTimeObj, dateDelimiter, timeDelimiter) {
    dateDelimiter = (dateDelimiter === undefined || dateDelimiter === null || dateDelimiter === "") ? "/" : dateDelimiter;
    timeDelimiter = (timeDelimiter === undefined || timeDelimiter === null || timeDelimiter === "") ? ":" : timeDelimiter;

    var result = dateTimeObj.day + dateDelimiter + dateTimeObj.month + dateDelimiter + dateTimeObj.year;
    if (dateTimeObj.hour !== 0 || dateTimeObj.minute !== 0 || dateTimeObj.second !== 0)
        result += dateTimeObj.hour + timeDelimiter + dateTimeObj.minute + timeDelimiter + dateTimeObj.second;

    return result;
}