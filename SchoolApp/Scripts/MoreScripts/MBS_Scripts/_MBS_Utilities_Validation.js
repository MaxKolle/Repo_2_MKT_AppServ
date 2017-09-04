//
// Validating numerics within bounds
//
function IsNumericVal(str) {
    //return !isNaN(parseFloat(str)) && isFinite(str);
    return !isNaN(str) && isFinite(str);
}

function ValidateInBoundNumeric(str, lowerBound, upperBound) {
    var result = false;

    if (IsNumericVal(str)) {
        var value = parseFloat(str);
        if ((value <= upperBound) && (value >= lowerBound)) {
            result = true;
        }
    }

    return result;
}

function ValidateLowerBoundedNumerics(str, lowerBound) {
    if (IsNumericVal(str)) {
        var value = parseFloat(str);
        if (value >= lowerBound) return true;
    }
    return false;
}

function Validate_InputElem_MinMax(NumericInputElem, changeVals, defaultVal, setfocus) {

    //debugger;

    defaultVal = defaultVal === undefined || defaultVal === null || defaultVal === "" ? null : defaultVal;
    setfocus = setfocus === undefined || setfocus === null || setfocus === "" ? true : setfocus;

    if (IsNumericVal(NumericInputElem.val())) {
        var changeValues = changeVals;
        if (changeValues === undefined || changeValues === null)
            changeValues = false;

        var numEntered = parseInt(NumericInputElem.val());
        var tempVal = parseInt(NumericInputElem.attr("min"));
        if (numEntered < tempVal) {
            alert("The value of '" + numEntered + "' which you entered is less than the allowed minimum of '" + tempVal + "'.");
            if (changeValues === true)
                NumericInputElem.val(defaultVal === null ? tempVal : defaultVal);
            if (setfocus)
                NumericInputElem.focus();
            return false;
        }
        else {
            tempVal = parseInt(NumericInputElem.attr("max"));
            if (numEntered > tempVal) {
                alert("The value of '" + numEntered + "' which you entered is more than the allowed maximum of '" + tempVal + "'.");
                if (changeValues === true)
                    NumericInputElem.val(defaultVal === null ? tempVal : defaultVal);
            if (setfocus)
                NumericInputElem.focus();
                return false;
            }
        }
        return true;
    }
    return false;
}

function Validate_InputElems_SetMinMax(Elems, min, max, trueFalse) {

    //debugger;

    if (min === undefined || min === null)
        min = null;
    if (max === undefined || max === null)
        max = null;
    if (trueFalse === undefined || trueFalse === null)
        trueFalse = true;
    Elems.each(function () {

        //debugger;

        if (min !== null)
            $(this).attr("min", min);
        if (max !== null)
            $(this).attr("max", max);
        $(this).change(Validate_InputElem_MinMax($(this), trueFalse));
    });
}

//
// Validation of string length
//
function ValidateStringLength(str, bound) {
    return (str.length <= bound);
}


//
// Handling validation
//
function HandleNumericValidation(strValue, errorMsg) {
    var idSelect = "#" + strValue;
    var spanStr = "#span" + strValue;

    $(idSelect).change(function () {
        if (($(this).val() !== "") && (!ValidateLowerBoundedNumerics($(this).val(), 0))) {
            $(idSelect).addClass("inputValidationError");
            $(spanStr).html("*");
            $("#spanErrorSummary").html(errorMsg);
        }
        else {
            $(idSelect).removeClass("inputValidationError");
            $(spanStr).html("");
            $("#spanErrorSummary").html("");
        }
    });
}

function ValidateDateInput(Elem) {
    var ElemVal = Elem.val();
    if (ElemVal === undefined || ElemVal === null || ElemVal === "") {
        Elem.addClass("inputValidationError");
        Elem.focus();
        return false;
    }
    else {
        Elem.removeClass("inputValidationError");
        return true;
    }
}


//
// Validate Alpha Numeric Input
//
function Utilities_IsAlphaNumeric(str) {
    var ret = true;

    //debugger;

    var strLen = str.length;
    for (var i = 0; i < strLen; i++) {
        if ((str[i] !== " ")
            && (str.charCodeAt(i) < 48 || str.charCodeAt(i) > 57)
            && (str.charCodeAt(i) < 65 || str.charCodeAt(i) > 90)
            && (str.charCodeAt(i) < 97 || str.charCodeAt(i) > 122)) {
            ret = false;
            break;
        }
    }
    return ret;
}

function Utilities_InputIsAlphaNumeric(inputIDStr, errorMeg) {
    if (errorMeg === undefined || errorMeg === null || errorMeg === "") {
        errorMeg = "The specified input can only be AlphaNumeric."
    }
    var inputIDElem = $("#" + inputIDStr);
    inputIDElem.change(function () {

        //debugger;

        textVal = inputIDElem.val();
        if (!Utilities_IsAlphaNumeric(textVal)) {
            inputIDElem.focus();
            inputIDElem.addClass("text-input-error");
            alert(errorMeg);
            inputIDElem.keyup(function () {
            //inputIDElem.keypress(function () {

                //debugger;

                textVal = inputIDElem.val();
                if (Utilities_IsAlphaNumeric(textVal)) {
                    inputIDElem.removeClass("text-input-error");
                    inputIDElem.unbind("keyup");
                }
            });
        }
    });
}


//
// Phone Number Validation
//
function Utilities_IsValidPhoneNum(str, length, preStr) {

    //debugger;

    if (str.length !== length) return false;
    if (str.substring(0, preStr.length) !== preStr) return false;

    var postStr = str.substring(preStr.length, str.length);
    var strLen = postStr.length;
    var ret = true;
    for (var i = 0; i < strLen; i++) {
        if ((postStr[i] !== " ")
            && (postStr.charCodeAt(i) < 48 || postStr.charCodeAt(i) > 57)) {
            ret = false;
            break;
        }
    }
    return ret;
}
function Utilities_IsValidSAPhoneNum(str) {
    var length = 12;
    var preStr = "+27";
    return Utilities_IsValidPhoneNum(str, length, preStr);
}

function Utilities_IsValidPhoneNumObj(obj) {
    var str = obj.str;
    var length = obj.length;
    var preStr = obj.preStr;

    Utilities_IsValidPhoneNum(str, length, preStr);
}


//
// Email Validation
//

function Utilities_IsValidateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}


//
// Generic Validation Handler
//

function Utilities_GenericValidHandler(inputIDStr, validFunct, errorMeg) {
    if (validFunct === undefined || validFunct === null) {
        validFunct = function (elemVal) {
            if (elemVal === undefined || elemVal === null || elemVal === "") {
                return false;
            }
            else {
                return true;
            }
        }
    }
    if (errorMeg === undefined || errorMeg === null || errorMeg === "") {
        errorMeg = "The specified input can only be AlphaNumeric."
    }

    var inputIDElem = $("#" + inputIDStr);
    inputIDElem.change(function () {
        textVal = inputIDElem.val();
        if (!validFunct(textVal)) {
            inputIDElem.focus();
            inputIDElem.addClass("text-input-error");
            alert(errorMeg);
            inputIDElem.keyup(function () {
                //inputIDElem.keypress(function () {

                //debugger;
                
                textVal = inputIDElem.val();
                if (validFunct(textVal)) {
                    inputIDElem.removeClass("text-input-error");
                    inputIDElem.unbind("keyup");
                }
            });
        }
    });
}
