
//
// Class Definition and Contruction Function
//
function KCT_LocalStorageClass(NameSpace, LanguageID, LatestUpdateDate, renewDataAfter_NumDays, maxSizeOfStore) {


    //
    // Private Class Attributes
    //

    NameSpace = NameSpace + "_";

    var PreKeyStr = NameSpace;
    if (LanguageID !== undefined && LanguageID !== null && LanguageID !== "") {
        LanguageID = LanguageID + "_";
        PreKeyStr = PreKeyStr + LanguageID;
    }
    else {
        LanguageID = "";
    }

    var MaxStoreSize = 1000000;
    if (maxSizeOfStore !== undefined && maxSizeOfStore !== null && maxSizeOfStore !== "") {
        MaxStoreSize = maxSizeOfStore;
    }

    var isEmpty = true;
    var LocalStoreKeysStr = "LocalStoreKeys";
    var LocalStoreLastDateStr = "LocalStoreLastDate";
    var LocalStoreSizeStr = "LocalStoreSize";
    var LocalStoreKeys = [];
    var LocalStoreSize = 0;

    var newLatestDate = null;



    //
    // Public Class Attributes
    //
    //this.LatestUpdateDate = LatestUpdateDate;
    //this.renewDataAfter_NumDays = renewDataAfter_NumDays;



    //
    // Private Class Methods
    //

    function RenewStoreData(lastUpdateLocalKey, latestUpdateDate, renewAfterDays) {
        
        //$.when(
        //    $.getScript("/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_DateTime.js"),
        //    $.Deferred(function (deferred) {
        //        $(deferred.resolve);
        //    })
        //).done(function () {

            //debugger;

            //var ret = false;
            try {
                if (LocalStoreSize > MaxStoreSize) {
                    //ret = true;
                    return true;
                }
                var localStoreData = GetDataFromLocalStore(lastUpdateLocalKey, false);
                if (localStoreData !== undefined && localStoreData !== null) {
                    var LatestUpdateDate = null;
                    if (jQuery.isPlainObject(latestUpdateDate)) {
                        LatestUpdateDate = Utilities_GenerateDateFromDateTimeDictionary(latestUpdateDate);
                    }
                    else {
                        LatestUpdateDate = Utilities_GenerateDateFromFormate(latestUpdateDate, "dd/MM/yyyy HH:mm:ss");
                    }
                    var LocationDataDate = new Date(localStoreData);
                    var diff = LatestUpdateDate - LocationDataDate;
                    if (diff > 0) {
                        newLatestDate = LatestUpdateDate;
                        //ret = true;
                        return true;
                    }
                    else {
                        var Today = Utilities_GetUTCDate(); // new Date();
                        var diff = Today - LocationDataDate;
                        var days = diff / 1000 / 60 / 60 / 24;

                        if (days > renewAfterDays) {
                            //ret = true;
                            return true;
                        }
                        else
                            //ret = false;
                            return false;
                    }
                }
                else {
                    //ret = false;
                    return false;
                }
            }
            catch (err) {
                console.error("ERROR - KCT_LocalStorageClass - RenewStoreData : " + err);
                return true;
            }
        //    if (ret) EmptyLocalStoreData(LocalStoreKeys);
        //});
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
                if (newLatestDate !== undefined && newLatestDate !== null)
                    tempData = newLatestDate;
                else {

                    //debugger;

                    //var tempDate = new Date();
                    //tempData = new Date(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getDate() - 1, tempDate.getUTCHours(), tempDate.getUTCMinutes(), tempDate.getUTCSeconds());

                    tempData = Utilities_GetUTCDate();
                }
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
            console.error("ERROR - KCT_LocalStorageClass - SetDataToLocalStore : " + err);
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
            console.error("ERROR - KCT_LocalStorageClass - GetDataFromLocalStore : " + err);
        }
    }

    function GetDataFromLocalWithNull(storeKey, defaultVal, parseJsonData) {
        var ret = GetDataFromLocalStore(storeKey, parseJsonData);
        if (ret === undefined || ret === null || ret === '')
            return defaultVal;
        return ret;
    }

    this.SetDataToLocalStore = SetDataToLocalStore;
    this.GetDataFromLocalStore = GetDataFromLocalStore;



    //
    // Call the constructor function
    //
    //The Constructor Method or Function
    function InitializeFromLocalStore() {
        try {
            var localStoreData = GetDataFromLocalStore(LocalStoreKeysStr);
            //1//console.log("1 - InitializeFromLocalStore - " + LocalStoreKeysStr + " - " + localStoreData);
            if (localStoreData === undefined || localStoreData === null) {
                isEmpty = true;
            }
            else {
                LocalStoreKeys = localStoreData;
                //*%* You might have to clear the localstore when the data size is above a certain value.
                LocalStoreSize = parseInt(GetDataFromLocalStore(LocalStoreSizeStr, false)); 
                isEmpty = false;
            }

            //debugger

            if (RenewStoreData(LocalStoreLastDateStr, LatestUpdateDate, renewDataAfter_NumDays)) {

                //debugger

                EmptyLocalStoreData(LocalStoreKeys);
            }
        }
        catch (err) {
            console.error("ERROR - KCT_LocalStorageClass - InitializeFromLocalStore : " + err);
        }
    }
    InitializeFromLocalStore();

}