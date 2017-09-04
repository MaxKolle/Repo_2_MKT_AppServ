
function AgJs_Utilities_GenerateSelectOpt(key, value) {
    var ArrObj = [{key: key, value: value}]
    return '<option ng-repeat="item in ' + JSON.stringify(ArrObj).replace(/"/g, "'") + '" value="{{item.key}}">{{item.value}}</option>';
}

function AgJs_Utilities_DictionaryToSelectOpt(Dictionay, initialKey, initialValue) {
    var NewDict = [];
    if (initialKey === ""){}
    else {
        //NewDict[initialKey] = initialValue;
        NewDict[NewDict.length] = { key: initialKey, value: initialValue };
    }
    $.each(Dictionay, function (key, value) {
        //NewDict[key] = value;
        NewDict[NewDict.length] = { key: key, value: value };
    });
    return '<option ng-repeat="item in ' + JSON.stringify(NewDict).replace(/"/g, "'") + '" value="{{item.key}}">{{item.value}}</option>';
}


//

function AgJs_Utilities_DictionaryToKeyValueArr(Dictionay, initialKey, initialValue) {
    var NewDict = [];
    if (initialKey === undefined || initialKey === null || initialKey === ""){}
    else {
        //NewDict[initialKey] = initialValue;
        NewDict[NewDict.length] = { key: initialKey, value: initialValue };
    }
    $.each(Dictionay, function (key, value) {
        //NewDict[key] = value;
        NewDict[NewDict.length] = { key: key, value: value };
    });
    return NewDict;
}


//

function AgJs_Utilities_ArrayToKeyValueArr(Arr, initialKey) {
    var NewDict = [];
    if (initialKey === undefined || initialKey === null || initialKey === ""){}
    else {
        //NewDict[initialKey] = initialValue;
        NewDict[NewDict.length] = { key: initialKey, value: initialKey };
    }
    $.each(Arr, function (key, value) {
        //NewDict[key] = value;
        NewDict[NewDict.length] = { key: value, value: value };
    });
    return NewDict;
}

function AgJs_Utilities_ArrayToKeyValueArr_WithFields(Arr, keyField, valueField, initialKey, initialValue) {
    var NewDict = [];
    if (initialKey === undefined || initialKey === null || initialKey === "") { }
    else if (initialValue === undefined || initialValue === null || initialValue === "") { }
    else {
        //NewDict[initialKey] = initialValue;
        NewDict[NewDict.length] = { key: initialKey, value: initialValue };
    }
    $.each(Arr, function (key, value) {
        //NewDict[key] = value;
        NewDict[NewDict.length] = { key: value[keyField], value: value[valueField] };
    });
    return NewDict;
}