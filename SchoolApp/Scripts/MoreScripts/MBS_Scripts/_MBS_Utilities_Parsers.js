
//
// Parsing Values
//
function Utilities_ParseBool(inputStr) {
    if (inputStr === "true" || inputStr === "True" || inputStr === "TRUE")
        return true;
    else
        return false;
}


function Utilities_ParseConditionalValue(valueToParse, defaultValue) {
    if (valueToParse === undefined || valueToParse === null || valueToParse === "")
        return defaultValue;
    else
        return valueToParse;
}

function Utilities_ParseConditionalBoolValue(valueToParse, defaultValue) {
    if (valueToParse === undefined || valueToParse === null || valueToParse === "")
        return defaultValue;
    else {
        if (valueToParse === "true" || valueToParse === "True" || valueToParse === "TRUE")
            return true;
        else if (valueToParse === "false" || valueToParse === "False" || valueToParse === "FALSE")
            return false;
        else
            return defaultValue;
    }
}

function Utilities_ParseConditionalJsonValue(valueToParse, defaultValue) {
    if (valueToParse === undefined || valueToParse === null || valueToParse === "")
        return defaultValue;
    else {
        return JSON.parse(valueToParse.replace(/&quot;/g, '"'));
    }
}
