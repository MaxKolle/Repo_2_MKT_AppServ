
var isObject = function (a) {
    return (!!a) && (a.constructor === Object);
};
var isArray = function (a) {
    return (!!a) && (a.constructor === Array);
};

function Utility_ManageJsonObject(input){
    if (isObject(input) || isArray(input))
        return input;
    else
        return JSON.parse(input);
}

function Utility_ManageJsonResult(result, errorMsg, failFunct) {

    //debugger;

    var ret;
    if ( /* result.data != undefined && result.data != null && result.data != "" && */ result.status != undefined && result.status != null && result.status != "") {
        if (result.status === "FAILURE") {
            if (failFunct === undefined || failFunct === null || failFunct === "") {
                errorMsg = (errorMsg === undefined || errorMsg === null || errorMsg === "") ? "There was an error in requesting the data." : errorMsg;
                alert(errorMsg + " \r\n Error Message: " + result.errorMessage);
                return;
            }
            else
                failFunct();
        }
        else {
            if (isObject(result.data) || isArray(result.data))
                ret = result.data;
            else
                ret = JSON.parse(result.data);
        }
    }
    else {
        ret = result;
    }
    return ret;
}
