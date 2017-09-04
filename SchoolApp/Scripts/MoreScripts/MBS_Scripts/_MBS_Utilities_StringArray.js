
var _KCT_Utilities_String_Defined = true;


//

function Utilities_StringInArray(str, Arr) {
    if (Arr === undefined)
        return false;

    var lenArr = Arr.length;
    for (var i = 0; i < lenArr; i++) {
        if (str === Arr[i]) return true;
    }
    return false;
}

function Utilities_StringInArrayBinarySearch(str, Arr) {

    if (Arr === undefined)
        return false;

    var lower = 0;
    var upper = Arr.length;
    var mid = Math.floor((lower + upper) / 2);
    while (mid != lower && mid != upper) {
        if (str < Arr[mid]) {
            upper = mid;
            mid = Math.floor((lower + upper) / 2);
        }
        else if (str > Arr[mid]) {
            lower = mid;
            mid = Math.floor((lower + upper) / 2);
        }
        else {
            return true;
        }
    }
    if (str === Arr[lower] || str === Arr[upper])
        return true;

    return false;
}


//

function Utilities_StringInArrayIndex(str, Arr) {
    if (Arr === undefined)
        return -1;

    var lenArr = Arr.length;
    for (var i = 0; i < lenArr; i++) {
        if (str === Arr[i]) return i;
    }
    return -1;
}

function Utilities_StringInArrayBinarySearchIndex(str, Arr) {

    if (Arr === undefined)
        return -1;

    var lower = 0;
    var upper = Arr.length;
    var mid = Math.floor((lower + upper) / 2);
    while (mid != lower && mid != upper) {
        if (str < Arr[mid]) {
            upper = mid;
            mid = Math.floor((lower + upper) / 2);
        }
        else if (str > Arr[mid]) {
            lower = mid;
            mid = Math.floor((lower + upper) / 2);
        }
        else {
            return mid;
        }
    }
    if (str === Arr[lower])
        return lower;
    if (str === Arr[upper])
        return upper;

    return -1;
}

// ==========================================================================================================================

function Utilities_ArrayToString(Arr) {
    var str = "{ ";
    $.each(function (index, value) {
        str = str + index + ": " + value + "; "
    });
    str = str + "}";
    return str;
}

// 

function Utilities_OrderArrayOfString(Arr, ascending) {
    ascending = (ascending === undefined || ascending === null || ascending === "" || ascending === true) ? true : false;

    //debugger;

    var valueIndex;
    var tempVal;
    for (var i = 0; i < Arr.length; i++) {
        valueIndex = i;
        for (var j = i + 1; j < Arr.length; j++) {
            if (ascending) {
                if (Arr[valueIndex] > Arr[j]) {
                    valueIndex = j;
                }
            }
            else {
                if (Arr[valueIndex] < Arr[j]) {
                    valueIndex = j;
                }
            }
        }
        tempVal = Arr[i];
        Arr[i] = Arr[valueIndex];
        Arr[valueIndex] = tempVal;
    }
    return Arr;
}

//======================================================================================================================

function Utilities_ConcatArrWithDelim(ArrayValue, delimiter, defaultReturn) {
    if (defaultReturn === undefined) {
        defaultReturn = null;
    }
    if (ArrayValue === undefined) {
        return defaultReturn;
    }
    if (delimiter === undefined) {
        delimiter = GeneralParams.delimiter;
    }
    var result = null;
    if (Array.isArray(ArrayValue)) {
        result = "";
        for (var i = 0; i < ArrayValue.length; i++) {
            result += ArrayValue[i].toString() + delimiter;
        }
    }
    else {
        result = ArrayValue.toString() + delimiter;
    }
    return result;
}

function Utilities_ConcatArrObjWithDelim(ArrayObject, objectProperty, delimiter, defaultReturn) {

    if (objectProperty === undefined || objectProperty === null || objectProperty === "") {
        return "";
    }
    if (defaultReturn === undefined) {
        defaultReturn = null;
    }
    if (ArrayObject === undefined) {
        return defaultReturn;
    }
    if (delimiter === undefined) {
        delimiter = GeneralParams.delimiter;
    }
    var result = null;
    if (Array.isArray(ArrayObject)) {
        var isfirsturn = true;
        for (var i = 0; i < ArrayObject.length; i++) {
            if (ArrayObject[i][objectProperty] !== undefined && isfirsturn) {
                result = "";
                isfirsturn = false;
                result += ArrayObject[i][objectProperty] + delimiter;
            }
            else if (ArrayObject[i][objectProperty] !== undefined) {
                result += ArrayObject[i][objectProperty] + delimiter;
            }
        }
    }
    else {
        result = ArrayObject.toString() + delimiter;
    }
    return result;
}