
function Utilities_SubStringBetween(str, open, close) {

    //var matches = str.match(/\((.*?)\)/);
    //var matches = str.match("/" + open + "(.*?)" + close + "/");


    var ret;
    if (open === "") {
        var index = str.indexOf(close);
        ret = str.substring(0, index);
    }
    else if (close === undefined || close === null || close === "") {
        var index = str.indexOf(open) + open.length;
        //var index = str.indexOf(open) + 1;
        ret = str.substring(index);
    }
    else {
        var matches = str.match(open + "(.*)" + close);
        if (matches) {
            ret = matches[1];
        }
    }

    return ret;
}

function Utilities_SubStringBetweenStr(str, open, close, openStartIndex) {

    //var matches = str.match(/\((.*?)\)/);
    //var matches = str.match("/" + open + "(.*?)" + close + "/");

    //debugger;

    if (openStartIndex === undefined || openStartIndex === null || openStartIndex === "")
        openStartIndex = 0;

    var ret;
    if (open === undefined || open === null || open === "") {
        var index = str.indexOf(close);
        ret = str.substring(0, index);
    }
    else if (close === undefined || close === null || close === "") {
        var index = str.indexOf(open, openStartIndex) + open.length;
        ret = str.substring(index);
    }
    else {
        var indexStart = str.indexOf(open, openStartIndex) + open.length;
        if (indexStart !== -1)
            var indexEnd = str.indexOf(close, indexStart);
        else {
            var indexEnd = str.indexOf(close, openStartIndex);
            indexStart = 0;
        }
        if (indexEnd === -1) {
            ret = str.substring(indexStart);
        }
        else {
            ret = str.substring(indexStart, indexEnd);
        }






        //var matches = str.match(open + "(.*)" + close);
        //if (matches) {
        //    ret = matches[1];
        //}
    }

    return ret;
}


function RoundUpNumber(str, numDecimalPlaces) {
    //cut the string at numDecimalPlaces + 1 e.g. if 3.988884354316616 to 2d.p., work with 3.988
    var cutStr = "";
    var decimalPosition;
    for (var i = 0; i < str.length; i++) {
        if (str[i] === ".") {
            decimalPosition = i;
            for (var j = i; j <= (decimalPosition + numDecimalPlaces + 1) ; j++) {
                //cuz it might be at the end of the string
                if (str[j] !== NaN) {
                    cutStr += str[j];
                }
            }
            break;
        }
        else {
            cutStr += str[i];
        }
    }
    //alert(cutStr);
    var result = "";
    var strVal = parseFloat(cutStr);
    var newInt = Math.round(strVal * Math.pow(10, numDecimalPlaces)) / Math.pow(10, numDecimalPlaces);
    result += newInt;
    return result;
}

//==========================================================================================================================

function getURLParameter(url, param) {

    //debugger;

    var searhParam = "";
    if (url.indexOf("?" + param + "=") !== -1)
        searhParam = "?" + param + "=";
    else
        searhParam = "&" + param + "=";

    var paramVal = Utilities_SubStringBetweenStr(url, searhParam, "&");
    if (paramVal === undefined || paramVal === null || paramVal === "")
        paramVal = Utilities_SubStringBetweenStr(url, searhParam);
    return paramVal;
}
function getURLComponent(url, mvcURLRouteStructure, param) {

    //debugger;

    var mvcParams = Utilities_SubStringBetweenStr(url, "/", "?");
    if (mvcParams === undefined || mvcParams === null || mvcParams === "")
        mvcParams = Utilities_SubStringBetweenStr(url, "/");
    var ParamArr = mvcParams.split("/");

    //var urlRouteStructStr = mvcURLRouteStructure.replace("{", "");
    //urlRouteStructStr = urlRouteStructStr.replace("}", "");
    //var urlRouteStructArr = urlRouteStructStr.split("/");

    var urlRouteStructStr = mvcURLRouteStructure.substring(1, mvcURLRouteStructure.length - 1);
    var urlRouteStructArr = urlRouteStructStr.split("}/{");


    var indexOfParam = jQuery.inArray(param, urlRouteStructArr);

    return ParamArr[indexOfParam];
}