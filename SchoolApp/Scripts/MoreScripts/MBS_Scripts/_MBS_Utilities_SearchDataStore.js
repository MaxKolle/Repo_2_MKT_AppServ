//
// Setting up the search data into Session Store.
// Need the following JS library: _MBS_Class_SessionStorage.js, _MBS_Utilities_String.js
//
function SetUpSearchData(controllerName, linkHref) {

    //debugger;

    if (controllerName === undefined || controllerName === null)
        controllerName = "";

    SearchDataStore = new KCT_SessionStorageClass("Search" + controllerName + "Data", false);
    SearchDataStore.SetDataToSessionStore("totNumberResults", totNumberResults);

    SearchDataStore.SetDataToSessionStore("topListStart", topListStart);
    SearchDataStore.SetDataToSessionStore("topListEnd", topListEnd);
    SearchDataStore.SetDataToSessionStore("ResultsTopList", ResultsTopList);

    SearchDataStore.SetDataToSessionStore("midListStart", midListStart);
    SearchDataStore.SetDataToSessionStore("midListEnd", midListEnd);
    SearchDataStore.SetDataToSessionStore("ResultsMidList", ResultsMidList);

    SearchDataStore.SetDataToSessionStore("bottomListStart", bottomListStart);
    SearchDataStore.SetDataToSessionStore("bottomListEnd", bottomListEnd);
    SearchDataStore.SetDataToSessionStore("ResultsBottomList", ResultsBottomList);

    SearchDataStore.SetDataToSessionStore("CurrentStart", CurrentStart);
    SearchDataStore.SetDataToSessionStore("CurrentEnd", CurrentEnd);

    if (linkHref !== undefined && linkHref !== null) {
        var clickedAnnounceID = getURLComponent(linkHref, "{controller}/{action}/{id}", "id");
        if (CurrentEnd <= topListEnd)
            CurrentDispAnnNum = ResultsTopList.indexOf(clickedAnnounceID, CurrentStart);
        else if (CurrentStart >= bottomListStart)
            CurrentDispAnnNum = bottomListEnd - ResultsBottomList.indexOf(clickedAnnounceID, bottomListEnd - CurrentEnd);
        else if ((CurrentStart >= midListStart) && (CurrentEnd <= midListEnd))
            CurrentDispAnnNum = midListStart + ResultsMidList.indexOf(clickedAnnounceID, CurrentStart - midListStart);
        else {
            //*%* Report a wierd condition to the server.
        }
        SearchDataStore.SetDataToSessionStore("CurrentDispAnnNum", CurrentDispAnnNum);
    }
}