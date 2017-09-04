var asynchronousCall_CachedHtmlUI = false; 
var Dictionary_CachedHtmlUI = {};

    //debugger;

var Utility_GetHtmlTemplate = function (url /* , controllerName */ ) {

    var divID = url.replace(/\//g, '');
    //controllerName = (controllerName === undefined || controllerName === null) ? "" : controllerName;

    
    var str;
    if (asynchronousCall_CachedHtmlUI)
        str = "<div id='" + divID + "' class='" + divID + "'> </div><script> /* debugger; */ divElem = $('." + divID + "').last(); divElem.html(Utility_GetHtmlUI_DictionaryCached('" + url + "', null, divElem)); </script>";
    else
        str = "<div id='" + divID + "' class='" + divID + "'> </div><script> /* debugger; */ $('." + divID + "').last().html(Utility_GetHtmlUI_DictionaryCached('" + url + "')); </script>";
    

    /*
    var str;
    if (asynchronousCall_CachedHtmlUI)
        str = "<div id='" + divID + "'> </div><script> debugger; divElem = $('#" + divID + "'); divElem.html(Utility_GetHtmlUI_DictionaryCached('" + url + "', null, divElem)); </script>";
    else
        str = "<div id='" + divID + "'> </div><script> debugger; $('#" + divID + "').html(Utility_GetHtmlUI_DictionaryCached('" + url + "')); </script>";
        */

    /*
    var str;
    if (asynchronousCall_CachedHtmlUI)
        str = "<div id='" + divID + "' ng-controller='" + controllerName + "'> </div><script> debugger; divElem = $('#" + divID + "'); divElem.html(Utility_GetHtmlUI_DictionaryCached('" + url + "', null, divElem)); </script>";
    else
        str = "<div id='" + divID + "' ng-controller='" + controllerName + "'> </div><script> debugger; $('#" + divID + "').html(Utility_GetHtmlUI_DictionaryCached('" + url + "')); </script>";
        */

    return str;
}

//debugger


var Utility_HtmlTemplate_AddToUrl = "";
var Utility_HtmlTemplate_AddToAddToUrl = function(str){
    if (Utility_HtmlTemplate_AddToUrl === undefined || Utility_HtmlTemplate_AddToUrl === null || Utility_HtmlTemplate_AddToUrl === "")
        Utility_HtmlTemplate_AddToUrl += "?" + str;
    else
        Utility_HtmlTemplate_AddToUrl += "&" + str;
}
var Utility_HtmlTemplate_AddToAddToUrl_KeyVal = function(key, val){
    if (Utility_HtmlTemplate_AddToUrl === undefined || Utility_HtmlTemplate_AddToUrl === null || Utility_HtmlTemplate_AddToUrl === "")
        Utility_HtmlTemplate_AddToUrl += "?" + key + "=" + val;
    else
        Utility_HtmlTemplate_AddToUrl += "&" + key + "=" + val;
}


var Utility_GetHtmlUI_DictionaryCached = function (url, data, divElem) {

    //debugger;

    var internUrl = url + Utility_HtmlTemplate_AddToUrl;
    //if (Utility_HtmlTemplate_AddToUrl !== undefined && Utility_HtmlTemplate_AddToUrl !== null && Utility_HtmlTemplate_AddToUrl !== "")
        //internUrl = url + /* "?" + */ Utility_HtmlTemplate_AddToUrl;

    data = null;

    if (Dictionary_CachedHtmlUI[internUrl] !== undefined && Dictionary_CachedHtmlUI[internUrl] !== null && Dictionary_CachedHtmlUI[internUrl] !== "") {
        return Dictionary_CachedHtmlUI[internUrl];
    }
    else {
        var asynchronousCall = (divElem === undefined || divElem === null || divElem === "") ? false : true;
        $.ajax({
            url: internUrl,
            type: "GET",
            data: (data !== undefined && data !== null) ? {} : data,
            async: asynchronousCall,
            //async: true, //false, //true,
            cache: false,
            //dataType: "json",
            success: function (result) {

                //debugger;

                Dictionary_CachedHtmlUI[internUrl] = result;
                if (asynchronousCall)
                    divElem.html(result);
            }
        });
        if (!asynchronousCall)
            return Dictionary_CachedHtmlUI[internUrl];
    }
}















//var UI_HTML_CachingObj = {

//    Dictionary_CachedHtmlUI: {},
//    GetHtmlUI_DictionaryCached: function (url /* , data */ ) {
//        if (Dictionary_CachedHtmlUI[url] !== undefined && Dictionary_CachedHtmlUI[url] !== null && Dictionary_CachedHtmlUI[url] !== "") {
//            return Dictionary_CachedHtmlUI[url];
//        }
//        else {
//            $.ajax({
//                url: url,
//                type: "GET",
//                data: (data !== undefined && data !== null) ? {} : data,
//                async: false, //true,
//                cache: false,
//                //dataType: "json",
//                success: function (result) {
//                    Dictionary_CachedHtmlUI[url] = result;
//                }
//            });
//            return Dictionary_CachedHtmlUI[url];
//        }
//    }
    



//};