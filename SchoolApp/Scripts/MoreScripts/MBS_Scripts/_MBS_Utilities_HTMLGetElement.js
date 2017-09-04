//===========================================================================================================================
function GetCurrDDElem(elemID) {
    return $('#' + elemID + ' option[value=' + $('#' + elemID).val() + ']');
}

function GetCurrDDElemText(elemID) {
    return $('#' + elemID + ' option[value=' + $('#' + elemID).val() + ']').text();
}

function GetDDElemFromVal(elemID, val) {
    return $('#' + elemID + ' option[value=' + val + ']');
}

function GetDDElemTextFromVal(elemID, val) {
    return $('#' + elemID + ' option[value=' + val + ']').text();
}


//===========================================================================================================================
