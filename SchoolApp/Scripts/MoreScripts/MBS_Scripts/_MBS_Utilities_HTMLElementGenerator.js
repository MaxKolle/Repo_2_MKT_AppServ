
function Utilities_GenerateSelectOpt(value, key) {
    return '<option value="' + value + '">' + key + '</option>';
}

function Utilities_DictionaryToSelectOpt(Dictionay, initialValue, initialKey) {
    var options;
    if (initialKey === "")
        options = "";
    else {
        //options = Utilities_GenerateSelectOpt(initialValue, initialKey);
        options = '<option value="' + initialValue + '">' + initialKey + '</option>';
    }
    $.each(Dictionay, function (key, value) {
        //options = options + Utilities_GenerateSelectOpt(key, value);
        options = options + '<option value="' + key + '">' + value + '</option>';
    });
    return options;
}

function Utilities_ArrayToSelectOpt(Array, initialKey, initialText, keyField, TextField) {
    var options;
    if (initialKey === "")
        options = "";
    else {
        options = '<option value="' + initialKey + '">' + initialText + '</option>';
    }
    $.each(Array, function (key, value) {
        options = options + '<option value="' + value[keyField] + '">' + value[TextField] + '</option>';
    });
    return options;
}


//===================================================================================================================================================================================================================================


function GenerateHtmlInputFromList(className, type, listName, list, startIndex) {
    var strBuild = "";
    var index = 0;
    if (startIndex !== null && startIndex !== undefined)
        index = startIndex;

    $.each(list, function (key, value) {
        strBuild += "<input class=\"" + className + "\" ";
        strBuild += "id=\"" + listName + "_" + index + "_\" ";
        strBuild += "name=\"" + listName + "[" + index + "]\" ";
        strBuild += "type=\"" + type + "\" ";
        strBuild += "value=\"" + value + "\" />";

        index++;
    });

    return strBuild;
}

function GenerateHtmlRadioList(className, nameAndID, dictionary) {
    var strBuild = "";
    var type = "radio";
    var classDef = "";
    if (className !== null && className !== undefined && className !== "") {
        classDef = "class=\"" + className + "\" ";
    }

    $.each(dictionary, function (key, value) {
        strBuild += value + " ";
        strBuild += "<input " + classDef;
        strBuild += "id=\"" + nameAndID + "\" ";
        strBuild += "name=\"" + nameAndID + "\" ";
        strBuild += "type=\"" + type + "\" ";
        strBuild += "value=\"" + key + "\" />";
    });

    return strBuild;
}

function GenerateHtmlCheckList(className, dictionary) {
    var strBuild = "";
    var type = "checkbox";
    var classDef = "";
    if (className !== null && className !== undefined && className !== "") {
        classDef = "class=\"" + className + "\" ";
    }

    $.each(dictionary, function (key, value) {
        strBuild += value + " ";
        strBuild += "<input " + classDef;
        //strBuild += "data-val=\"true\" data-val-required=\"The " + value + " field is required.\"";

        strBuild += "id=\"CheckList_" + key + "\" ";
        strBuild += "name=\"CheckList_" + key + "\" ";
        strBuild += "type=\"" + type + "\" ";
        //strBuild += "value=\"" + key + "\" />";

        strBuild += "value=\"true\" />";
    });

    return strBuild;
}


//============================================================================================================================================================================================================================================


function GenerateHtmlInput(className, nameAndID, type, label, value) {
    var strBuild = "";
    var classDef = "";
    if (className !== null && className !== undefined && className !== "") {
        classDef = "class=\"" + className + "\" ";
    }

    strBuild += label + " ";
    strBuild += "<input " + classDef;
    strBuild += "id=\"" + nameAndID + "\" ";
    strBuild += "name=\"" + nameAndID + "\" ";
    strBuild += "type=\"" + type + "\" ";
    strBuild += "value=\"" + value + "\" />";

    return strBuild;
}

//function GenerateHtmlCheckBoxInput(className, nameAndID, type, label, value) {
//    var strBuild = "";
//    var classDef = "";
//    if (className !== null && className !== undefined && className !== "") {
//        classDef = "class=\"" + className + "\" ";
//    }

//    strBuild += label + " ";
//    strBuild += "<input " + classDef;
//    strBuild += "id=\"" + nameAndID + "\" ";
//    strBuild += "name=\"" + nameAndID + "\" ";
//    strBuild += "type=\"" + type + "\" ";
//    strBuild += "value=\"" + value + "\" />";

//    return strBuild;
//}

//==========================================================================================================================================================================================================================================


function GenerateHtmlElem(elemType, elemID, className, innerHtml) {
    var strBuild = "";
    var classDef = "";
    if (className !== undefined && className !== null && innerHtml !== "") {
        classDef = "class=\"" + className + "\" ";
    }
    var innerHtmlDef = "";
    if (innerHtml !== undefined && innerHtml !== null && innerHtml !== "") {
        innerHtmlDef = innerHtml;
    }

    strBuild += "<" + elemType + " " + classDef;
    strBuild += "id=\"" + elemID + "\">";
    strBuild += innerHtmlDef;
    strBuild += "</" + elemType + ">";

    return strBuild;
}


//=========================================================================================================================================================================================================================================

function GenerateHtmlLink(htmlPage, htmlAttributeObj) {
    var ret = htmlPage;
    var firstAttribute = true;
    $.each(htmlAttributeObj, function (key, value) {
        if (firstAttribute)
            ret = ret + "?" + key + "=" + value;
        else
            ret = ret + "&" + key + "=" + value;
        firstAttribute = false;
    });
    return ret;
}