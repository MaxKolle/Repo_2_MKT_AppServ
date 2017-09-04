
//
// Private Class Attributes
//

var Intern_NameSpace = "SearchResults" + "_";
    
var Intern_totNumberResults = totNumberResults;
var Intern_numResultsPerPage = numResultsPerPage;
var Intern_NumberResultsTopList = 0;
var Intern_ResultsTopList = [];
var Intern_NumberResultsBottomList = 0;
var Intern_ResultsBottomList = [];

var Intern_CurrentStart = 0;
var Intern_CurrentEnd = numResultsPerPage - 1;


ResultsTopListKey = NameSpace + 











var PreKeyStr = NameSpace;
if (LanguageID !== undefined && LanguageID !== null && LanguageID !== "") {
    LanguageID = LanguageID + "_";
    PreKeyStr = PreKeyStr + LanguageID;
}
else {
    LanguageID = "";
}
var isEmpty = true;
var LocalStoreKeysStr = "LocalStoreKeys";
var LocalStoreLastDateStr = "LocalStoreLastDate";
var LocalStoreSizeStr = "LocalStoreSize";
var LocalStoreKeys = [];
var LocalStoreSize = 0;



//
// Public Class Attributes
//
//this.LatestUpdateDate = LatestUpdateDate;
//this.renewDataAfter_NumDays = renewDataAfter_NumDays;



//
// Private Class Methods
//

function RenewStoreData(lastUpdateLocalKey, LatestUpdateDate, renewAfterDays) {

    //1//console.log("1 - RenewStoreData - " + lastUpdateLocalKey + " - " + renewAfterDays + " - " + LatestUpdateDate);

    try {
        var localStoreData = GetDataFromLocalStore(lastUpdateLocalKey, false);
        //1//console.log("2 - RenewStoreData - " + localStoreData);
        if (localStoreData !== undefined && localStoreData !== null) {
            var LocationDataDate = new Date(localStoreData);


            //if (LocationDataDate < LatestUpdateDate) {

            var diff = LatestUpdateDate - LocationDataDate;
            //1//console.log("4 - RenewStoreData - " + LatestUpdateDate + " - " + LocationDataDate + " - " + diff + " - " + (diff > 0));
            if (diff > 0) {
                //1//console.log("3 - RenewStoreData - " + LocationDataDate + " < " + LatestUpdateDate + " - " + (diff > 0));
                //EmptyLocalStoreData(GetDataFromLocalStore(LocalStoreKeys));
                return true;
            }
            else {
                var Today = new Date();
                var diff = Today - LocationDataDate;
                var days = diff / 1000 / 60 / 60 / 24;

                if (days > renewAfterDays) {
                    //SetDataToLocalStore(lastUpdateLocalKey, Today);
                    return true;
                }
                else return false;
            }
            //else {
            //    //1//console.log("4 - RenewStoreData - " + lastUpdateLocalKey + " - " + renewAfterDays + " - " + LatestUpdateDate);
            //    SetDataToLocalStore(lastUpdateLocalKey, Today);
            //    return true;
            //}
        }
        else {
            //SetDataToLocalStore(lastUpdateLocalKey, new Date());
            return false;
        }
    }
    catch (err) {
        //1//console.log("5 - RenewStoreData - Exception " + err);

        return true;
    }
}

function EmptyLocalStoreData(LocalStoreKeysArr) {
    //localStorage.removeItem(NameSpace + "LocalStoreKeys");
    //localStorage.removeItem(NameSpace + "LocalStoreLastDate");
    $.each(LocalStoreKeysArr, function (key, value) {
        //1//console.log("1 - EmptyLocationStoreData - " + key + " - " + value);
        localStorage.removeItem(NameSpace + value);
    });
    isEmpty = true;
    LocalStoreKeys = [];
    LocalStoreSize = 0;
}



//
// Public Class Methods
//
function AddResultsToTop(numResultsTopList, resultsTopList) {   
    $.each(resultsTopList, function (key, value) {
        Intern_ResultsTopList[Intern_NumberResultsTopList] = value;
        Intern_NumberResultsTopList++;
    });
}
    
function AddResultsToBottom(numberResultsBottomList, resultsBottomList) {        
    $.each(resultsBottomList, function (key, value) {
        Intern_ResultsBottomList[Intern_NumberResultsBottomList] = value;
        Intern_NumberResultsBottomList ++;
    });
}

function GetNextResults() {
    var tempEnd = Intern_CurrentEnd + numResultsPerPage;
    if(tempEnd > Intern_totNumberResults)
        return null;
    else if(tempEnd > Intern_NumberResultsTopList) {


    }
    else {
        Intern_CurrentStart += numResultsPerPage;
        Intern_CurrentEnd = tempEnd;
        ret = [];
        for(var i = 0; i++; i < numResultsPerPage) {
            ret[i] = Intern_ResultsTopList[i + Intern_CurrentStart];
        }
        //return ret;
        $(location).attr('href', 'http://www.sitefinity.com');
    }


}































function SetDataToLocalStore(storeKey, Data) {
    var tempKey;
    var tempData;
    try {
        if (isEmpty) {
            LocalStoreKeys = [LocalStoreKeysStr, LocalStoreLastDateStr, LocalStoreSizeStr];
            LocalStoreSize = LocalStoreSize + (NameSpace + LocalStoreSizeStr).length;
            LocalStoreSize = LocalStoreSize + (NameSpace + LocalStoreKeysStr).length + (JSON.stringify(LocalStoreKeys)).length;

            //1//console.log("1 - SetDataToLocalStore - " + NameSpace + LocalStoreLastDateStr + " - " + new Date() + " - " + JSON.stringify(new Date()));
            //1//console.log("1 - SetDataToLocalStore - " + storeKey + " - " + Data);

            //localStorage[NameSpace + LocalStoreLastDateStr] = JSON.stringify(new Date());
            tempKey = NameSpace + LocalStoreLastDateStr;
            tempData = new Date();
            LocalStoreSize = LocalStoreSize + tempKey.length + 62;

            localStorage[tempKey] = tempData;
            isEmpty = false;
        }

        tempKey = NameSpace + LocalStoreKeysStr;
        tempData = LanguageID + storeKey;
        LocalStoreKeys[LocalStoreKeys.length] = tempData;
        LocalStoreSize = LocalStoreSize + tempData.length;
        localStorage[tempKey] = JSON.stringify(LocalStoreKeys);

        tempKey = PreKeyStr + storeKey;
        tempData = JSON.stringify(Data);
        LocalStoreSize = LocalStoreSize + tempKey.length + tempData.length + 3;
        localStorage[tempKey] = tempData;
            
        localStorage[NameSpace + LocalStoreSizeStr] = LocalStoreSize;
    }
    catch (err) {
        //1//console.log("SetDataToLocalStore - Exception - " + err);
    }
}

function GetDataFromLocalStore(storeKey, parseJsonData) {
    try {
        var ret;
        //if (storeKey === "LocalStoreKeys" || storeKey === "LocalStoreLastDate" || storeKey === LocalStoreSizeStr)
        if (storeKey === LocalStoreKeysStr || storeKey === LocalStoreLastDateStr || storeKey === LocalStoreSizeStr)
            ret = localStorage[NameSpace + storeKey];
        else
            ret = localStorage[PreKeyStr + storeKey];

        //1//console.log("1 - GetDataFromLocalStore - " + NameSpace + storeKey + " - " + ret);

        if (ret === undefined || ret === null) return null;
        else if (parseJsonData === undefined || parseJsonData === null || parseJsonData === true) return JSON.parse(ret);
        else return ret;
    }
    catch (err) {

    }
}

this.SetDataToLocalStore = SetDataToLocalStore;
this.GetDataFromLocalStore = GetDataFromLocalStore;



//
// Call the constructor function
//
//The Constructor Method or Function
function InitializeFromLocalStore() {
    try {
        localStoreData = GetDataFromLocalStore(LocalStoreKeysStr);
        //1//console.log("1 - InitializeFromLocalStore - " + LocalStoreKeysStr + " - " + localStoreData);
        if (localStoreData === undefined || localStoreData === null) {
            isEmpty = true;
        }
        else {
            LocalStoreKeys = localStoreData;
            //*%* You might have to clear the localstore when the data size is above a certain value.
            LocalStoreSize = parseInt(GetDataFromLocalStore(LocalStoreSizeStr, false)); 
            //1//console.log("2 - InitializeFromLocalStore - " + LocalStoreSizeStr + " - " + LocalStoreSize);
            isEmpty = false;
        }
        //1//console.log("3 - InitializeFromLocalStore - " + LocalStoreLastDateStr + " - " + renewDataAfter_NumDays + " - " + LatestUpdateDate);

        //function RenewStoreData(lastUpdateLocalKey, LatestUpdateDate, renewAfterDays ) {
        if (RenewStoreData(LocalStoreLastDateStr, LatestUpdateDate, renewDataAfter_NumDays)) {
            //1//console.log("4 - InitializeFromLocalStore - The data is getting renewed");
            EmptyLocalStoreData(LocalStoreKeys);
        }
    }
    catch (err) {
        //1//console.log("InitializeFromLocalStore - Exception - " + err);
    }
}
InitializeFromLocalStore();
