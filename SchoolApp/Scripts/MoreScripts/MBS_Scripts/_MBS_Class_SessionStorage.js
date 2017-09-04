
////
//// Class Definition and Contruction Function
////
//function KCT_SessionStorageClass(NameSpace, EmptyStorage) {


//    //
//    // Private Class Attributes
//    //

//    NameSpace = NameSpace + "_";

//    var PreKeyStr = NameSpace;

//    var isEmpty = true;
//    var SessionStoreKeysStr = "SessionStoreKeys";
//    var SessionStoreLastDateStr = "SessionStoreLastDate";
//    var SessionStoreSizeStr = "SessionStoreSize";
//    var SessionStoreKeys = [];
//    var SessionStoreSize = 0;



//    //
//    // Public Class Attributes
//    //
//    //this.LatestUpdateDate = LatestUpdateDate;
//    //this.renewDataAfter_NumDays = renewDataAfter_NumDays;



//    //
//    // Private Class Methods
//    //

//    //function RenewStoreData(lastUpdateLocalKey, LatestUpdateDate, renewAfterDays) {
//    //    try {
//    //        var sessionStoreData = GetDataFromSessionStore(lastUpdateLocalKey, false);
//    //        if (sessionStoreData !== undefined && sessionStoreData !== null) {
//    //            var LocationDataDate = new Date(sessionStoreData);
//    //            var diff = LatestUpdateDate - LocationDataDate;
//    //            if (diff > 0) {
//    //                return true;
//    //            }
//    //            else {
//    //                var Today = new Date();
//    //                var diff = Today - LocationDataDate;
//    //                var days = diff / 1000 / 60 / 60 / 24;

//    //                if (days > renewAfterDays) {
//    //                    return true;
//    //                }
//    //                else return false;
//    //            }
//    //        }
//    //        else {
//    //            return false;
//    //        }
//    //    }
//    //    catch (err) {
//    //        return true;
//    //    }
//    //}

//    function EmptySessionStoreData(SessionStoreKeysArr) {
//        $.each(SessionStoreKeysArr, function (key, value) {
//            sessionStorage.removeItem(NameSpace + value);
//        });
//        isEmpty = true;
//        SessionStoreKeys = [];
//        SessionStoreSize = 0;
//    }


//    //
//    // Public Class Methods
//    //

//    function SetDataToSessionStore(storeKey, Data) {
//        var tempKey;
//        var tempData;

//        //console.log("SetDataToSessionStore: " + storeKey + ": " + Data);
//        //console.log("SetDataToSessionStore: isEmpty: " + isEmpty );

//        try {
//            if (isEmpty) {
//                SessionStoreKeys = [SessionStoreKeysStr, SessionStoreLastDateStr, SessionStoreSizeStr];
//                SessionStoreSize = SessionStoreSize + (NameSpace + SessionStoreSizeStr).length;
//                SessionStoreSize = SessionStoreSize + (NameSpace + SessionStoreKeysStr).length + (JSON.stringify(SessionStoreKeys)).length;

//                tempKey = NameSpace + SessionStoreLastDateStr;
//                tempData = new Date();

//                SessionStoreSize = SessionStoreSize + tempKey.length + 62;

//                sessionStorage[tempKey] = tempData;
//                isEmpty = false;
//            }
//            tempKey = NameSpace + SessionStoreKeysStr;
//            tempData = /* LanguageID + */ storeKey;
//            SessionStoreKeys[SessionStoreKeys.length] = tempData;
//            SessionStoreSize = SessionStoreSize + tempData.length;

//            //console.log("SetDataToSessionStore - tempKey: " + tempKey );
//            //console.log("SetDataToSessionStore - tempData: " + tempData );
//            //console.log("SetDataToSessionStore - SessionStoreKeys: " + SessionStoreKeys );

//            sessionStorage[tempKey] = JSON.stringify(SessionStoreKeys);

//            tempKey = PreKeyStr + storeKey;
//            tempData = JSON.stringify(Data);
//            SessionStoreSize = SessionStoreSize + tempKey.length + tempData.length + 3;
//            sessionStorage[tempKey] = tempData;

//            sessionStorage[NameSpace + SessionStoreSizeStr] = SessionStoreSize;
//        }
//        catch (err) {
//            console.log("SetDataToSessionStore - Exception - " + err);
//        }
//    }

//    function GetDataFromSessionStore(storeKey, parseJsonData) {
//        try {
//            var ret;
//            if (storeKey === SessionStoreKeysStr || storeKey === SessionStoreLastDateStr || storeKey === SessionStoreSizeStr)
//                ret = sessionStorage[NameSpace + storeKey];
//            else
//                ret = sessionStorage[PreKeyStr + storeKey];

//            if (ret === undefined || ret === null) return null;
//            else if (parseJsonData === undefined || parseJsonData === null || parseJsonData === true) return JSON.parse(ret);
//            else return ret;
//        }
//        catch (err) {

//        }
//    }

//    this.SetDataToSessionStore = SetDataToSessionStore;
//    this.GetDataFromSessionStore = GetDataFromSessionStore;



//    //
//    // Call the constructor function
//    //
//    //The Constructor Method or Function
//    function InitializeFromSessionStore() {
//        try {
//            var sessionStoreData = GetDataFromSessionStore(SessionStoreKeysStr);
//            if (sessionStoreData === undefined || sessionStoreData === null) {
//                isEmpty = true;
//            }
//            else {
//                SessionStoreKeys = sessionStoreData;
//                //*%* You might have to clear the localstore when the data size is above a certain value.
//                SessionStoreSize = parseInt(GetDataFromSessionStore(SessionStoreSizeStr, false));
//                isEmpty = false;
//            }
//            //if (RenewStoreData(SessionStoreLastDateStr, LatestUpdateDate, renewDataAfter_NumDays)) {
//            //    EmptySessionStoreData(SessionStoreKeys);
//            //}
//            if (EmptyStorage === true) {
//                EmptySessionStoreData(SessionStoreKeys);
//            }
//        }
//        catch (err) {
//            //1//console.log("InitializeFromSessionStore - Exception - " + err);
//        }
//    }
//    InitializeFromSessionStore();

//}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//
// Class Definition and Contruction Function
//
function KCT_SessionStorageClass(NameSpace, EmptyStorage) {


    //
    // Private Class Attributes
    //

    NameSpace = NameSpace + "_";

    var PreKeyStr = NameSpace;

    var isEmpty = true;
    var SessionStoreKeysStr = "SessionStoreKeys";
    var SessionStoreLastDateStr = "SessionStoreLastDate";
    var SessionStoreSizeStr = "SessionStoreSize";
    var SessionStoreKeys = [];
    var SessionStoreSize = 0;



    //
    // Public Class Attributes
    //
    //this.LatestUpdateDate = LatestUpdateDate;
    //this.renewDataAfter_NumDays = renewDataAfter_NumDays;



    //
    // Private Class Methods
    //

    //function RenewStoreData(lastUpdateLocalKey, LatestUpdateDate, renewAfterDays) {
    //    try {
    //        var sessionStoreData = GetDataFromSessionStore(lastUpdateLocalKey, false);
    //        if (sessionStoreData !== undefined && sessionStoreData !== null) {
    //            var LocationDataDate = new Date(sessionStoreData);
    //            var diff = LatestUpdateDate - LocationDataDate;
    //            if (diff > 0) {
    //                return true;
    //            }
    //            else {
    //                var Today = new Date();
    //                var diff = Today - LocationDataDate;
    //                var days = diff / 1000 / 60 / 60 / 24;

    //                if (days > renewAfterDays) {
    //                    return true;
    //                }
    //                else return false;
    //            }
    //        }
    //        else {
    //            return false;
    //        }
    //    }
    //    catch (err) {
    //        return true;
    //    }
    //}

    function EmptySessionStoreData(SessionStoreKeysArr) {
        console.log("EmptySessionStoreData - SessionStoreKeysArr - " + SessionStoreKeysArr);
        $.each(SessionStoreKeysArr, function (key, value) {
            sessionStorage.removeItem(NameSpace + value);
        });
        isEmpty = true;
        SessionStoreKeys = [];
        SessionStoreSize = 0;
    }


    //
    // Public Class Methods
    //

    function SetDataToSessionStore(storeKey, Data, isNewKey) {
        var tempKey;
        var tempData;

        //console.log("SetDataToSessionStore: " + storeKey + ": " + Data);
        //console.log("SetDataToSessionStore: isEmpty: " + isEmpty );

        try {
            if (isEmpty) {
                SessionStoreKeys = [SessionStoreKeysStr, SessionStoreLastDateStr, SessionStoreSizeStr];
                SessionStoreSize = SessionStoreSize + (NameSpace + SessionStoreSizeStr).length;
                SessionStoreSize = SessionStoreSize + (NameSpace + SessionStoreKeysStr).length + (JSON.stringify(SessionStoreKeys)).length;

                tempKey = NameSpace + SessionStoreLastDateStr;
                tempData = new Date();

                SessionStoreSize = SessionStoreSize + tempKey.length + 62;

                sessionStorage[tempKey] = tempData;
                isEmpty = false;
            }
            if (isNewKey === undefined || isNewKey === null || isNewKey === true) {
                tempKey = NameSpace + SessionStoreKeysStr;
                tempData = /* LanguageID + */ storeKey;
                SessionStoreKeys[SessionStoreKeys.length] = tempData;
                SessionStoreSize = SessionStoreSize + tempData.length;
                sessionStorage[tempKey] = JSON.stringify(SessionStoreKeys);

                tempKey = PreKeyStr + storeKey;
                tempData = JSON.stringify(Data);
                SessionStoreSize = SessionStoreSize + tempKey.length + tempData.length + 3;
                sessionStorage[tempKey] = tempData;

                sessionStorage[NameSpace + SessionStoreSizeStr] = SessionStoreSize;
            }
            else {
                tempKey = PreKeyStr + storeKey;
                tempData = JSON.stringify(Data);

                var oldDataLength = sessionStorage[tempKey].length;

                sessionStorage[tempKey] = tempData;

                SessionStoreSize = SessionStoreSize + (tempData.length - oldDataLength);
                sessionStorage[NameSpace + SessionStoreSizeStr] = SessionStoreSize;
            }

        }
        catch (err) {
            console.log("SetDataToSessionStore - Exception - " + err);
        }
    }

    function GetDataFromSessionStore(storeKey, parseJsonData) {
        try {
            var ret;
            if (storeKey === SessionStoreKeysStr || storeKey === SessionStoreLastDateStr || storeKey === SessionStoreSizeStr)
                ret = sessionStorage[NameSpace + storeKey];
            else
                ret = sessionStorage[PreKeyStr + storeKey];

            if (ret === undefined || ret === null) return null;
            else if (parseJsonData === undefined || parseJsonData === null || parseJsonData === true) return JSON.parse(ret);
            else return ret;
        }
        catch (err) {

        }
    }

    function GetDataFromSessWithNull(storeKey, defaultVal, parseJsonData) {
        var ret = GetDataFromSessionStore(storeKey, parseJsonData);
        if (ret === undefined || ret === null || ret === '')
            return defaultVal;
        return ret;
    }

    this.SetDataToSessionStore = SetDataToSessionStore;
    this.GetDataFromSessionStore = GetDataFromSessionStore;
    this.GetDataFromSessWithNull = GetDataFromSessWithNull;



    //
    // Call the constructor function
    //
    //The Constructor Method or Function
    function InitializeFromSessionStore() {
        try {
            var sessionStoreData = GetDataFromSessionStore(SessionStoreKeysStr);
            if (sessionStoreData === undefined || sessionStoreData === null) {
                isEmpty = true;
            }
            else {
                SessionStoreKeys = sessionStoreData;
                //*%* You might have to clear the localstore when the data size is above a certain value.
                SessionStoreSize = parseInt(GetDataFromSessionStore(SessionStoreSizeStr, false));
                isEmpty = false;
            }
            //if (RenewStoreData(SessionStoreLastDateStr, LatestUpdateDate, renewDataAfter_NumDays)) {
            //    EmptySessionStoreData(SessionStoreKeys);
            //}
            if (EmptyStorage === true) {
                console.log("InitializeFromSessionStore - EmptyStorage - " + EmptyStorage);
                EmptySessionStoreData(SessionStoreKeys);
            }
        }
        catch (err) {
            //1//console.log("InitializeFromSessionStore - Exception - " + err);
        }
    }
    InitializeFromSessionStore();

}
