
var ListManagement = {};

ListManagement.controllerName = "";
ListManagement.searchMethodName = "Search";
ListManagement.detailsMethodName = "DetailsForView";
ListManagement.newSearch = true;

ListManagement.totNumberResults = 0;

ListManagement.topListStart = 0;
ListManagement.topListEnd = 0;
ListManagement.ResultsTopList = [];

ListManagement.midListStart = 0;
ListManagement.midListEnd = 0;
ListManagement.ResultsMidList = [];

ListManagement.bottomListStart = 0;
ListManagement.bottomListEnd = 0;
ListManagement.ResultsBottomList = [];

ListManagement.CurrentStart = 0;
ListManagement.CurrentEnd = 0;
ListManagement.CurrentDispID = null;
ListManagement.CurrentDispNum = 0;

//*%* Note: Ludovick - You need to have these parameters defined in some way like in a View so as to use then throughout the system.
ListManagement.MaxNumResultsPerBlock = 50; //param_numResultsPerPage * param_perPageMultiplePerFetch * 2; //50; //param_numResultsPerPage * param_perPageMultiplePerFetch * 3; // * 10;

ListManagement.listRes = null;

ListManagement.BackToListClicked = false;

// Resetting the navigation variables =====

ListManagement.ResetVariables = function () {

    this.totNumberResults = 0;

    this.topListStart = 0;
    this.topListEnd = 0;
    this.ResultsTopList = [];

    this.midListStart = 0;
    this.midListEnd = 0;
    this.ResultsMidList = [];

    this.bottomListStart = 0;
    this.bottomListEnd = 0;
    this.ResultsBottomList = [];

    this.CurrentStart = 0;
    this.CurrentEnd = 0;
    this.listRes = null;
};

// Adding fetched data to the lists 

ListManagement.AddToTopList = function (addToTopList) {
    if (addToTopList !== undefined && addToTopList !== null && addToTopList !== '') {
        //this.topListEnd = (this.topListEnd === undefined || this.topListEnd === null) ? -1 : this.topListEnd;
        for (var i = 0; i < addToTopList.length; i++) {
            this.ResultsTopList[this.ResultsTopList.length] = addToTopList[i];
        }
        this.topListEnd = this.topListEnd + addToTopList.length;

        /*
        $.each(addToTopList, function (key, value) {
            this.topListEnd++;
            this.ResultsTopList[this.topListEnd] = value;
            //this.topListEnd++;
        }); */
    }
};
ListManagement.MoveToNewMid = function (newMidList) {
    if (newMidList !== undefined && newMidList !== null && newMidList !== '') {
        var numberResultsMidList = 0;
        this.ResultsMidList = [];
        for (var i = 0; i < newMidList.length; i++) {
            this.ResultsMidList[this.ResultsMidList.length] = newMidList[i];
        }
        numberResultsMidList = numberResultsMidList + this.ResultsMidList.length;
        
        /*
        $.each(newMidList, function (key, value) {
            this.ResultsMidList[numberResultsMidList] = value;
            numberResultsMidList++;
        }); */
    }
};
ListManagement.AddToBottomList = function (addToBottomList) {
    if (addToBottomList !== undefined && addToBottomList !== null && addToBottomList !== '') {
        for (var i = 0; i < addToBottomList.length; i++) {
            this.ResultsBottomList[this.ResultsBottomList.length] = addToBottomList[i]
        }
        this.bottomListStart = this.bottomListStart - addToBottomList.length;

        /*
        $.each(addToBottomList, function (key, value) {
            this.bottomListStart--;
            this.ResultsBottomList[this.bottomListEnd - this.bottomListStart] = value;
        }); */
    }
};

// Get Displayed Results ====

ListManagement.GetDisplayResultListTop = function () {
    var ret = "";
    var loopStart = this.CurrentStart;
    var loopEnd = this.CurrentEnd;
    for (var i = loopStart; i <= loopEnd; i++) {
        ret = ret + this.ResultsTopList[i] + param_delimiter;
    }
    return { firstID: this.ResultsTopList[loopStart], listIDs: ret };
    //return ret;
};
ListManagement.GetDisplayResultListMid = function (PrevNext) {
    var ret = "";
    var loopStart = this.CurrentStart - this.midListStart;
    var loopEnd = loopStart + param_numResultsPerPage - 1;
    if (loopEnd >= this.ResultsMidList.length)
        loopEnd = this.ResultsMidList.length - 1;
    for (var i = loopStart; i <= loopEnd; i++) {
        ret = ret + this.ResultsMidList[i] + param_delimiter;
    }
    return { firstID: this.ResultsMidList[loopStart], listIDs: ret };
    //return ret;
};
ListManagement.GetDisplayResultListBottom = function () {
    var ret = "";
    var loopStart = this.bottomListEnd - this.CurrentStart;
    var loopEnd = this.bottomListEnd - this.CurrentEnd;
    for (var i = loopStart; i >= loopEnd; i--) {
        ret = ret + this.ResultsBottomList[i] + param_delimiter;
    }
    return { firstID: this.ResultsBottomList[loopStart], listIDs: ret };
    //return ret;
};

// Fetching data from Server 

//*%* Note: Steve - We need to implement the corresponding "searchData" in the Api Controllers
ListManagement.FetchAndAddToTop = function (numResults, searchData) {

    //debugger;

    $.ajax({
        url: this.controllerName + "/" + this.searchMethodName, //'@Url.Action(ViewBag.SearchFunctName)',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            id: this.ResultsTopList[this.topListEnd],
            prevNext: "Next",
            numResults: numResults,
            SearchData: searchData
        }),
        dataType: "json",
        async: false,
        cache: false,
        success: function (result) {

            //debugger;

            //var data = Utility_ManageJsonResult(result);
            ListManagement.AddToTopList(result.ids);
        }
    });
};
//*%* Note: Steve - We need to implement the corresponding "searchData" in the Api Controllers
ListManagement.FetchAndAddToBottom = function (numResults, searchData) {
    $.ajax({
        url: this.controllerName + "/" + this.searchMethodName, //'@Url.Action(ViewBag.SearchFunctName)',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            id: this.ResultsBottomList[this.bottomListEnd - this.bottomListStart],
            prevNext: "Prev",
            numResults: numResults,
            SearchData: searchData
        }),
        dataType: "json",
        async: false,
        cache: false,
        success: function (result) {
            //var data = Utility_ManageJsonResult(result);
            ListManagement.AddToBottomList(result.ids);
        }
    });
};
//*%* Note: Steve - We need to implement the corresponding "searchData" in the Api Controllers
ListManagement.FetchNewMid = function (idFrom, numResults, PrevNext, searchData) {
    $.ajax({
        url: this.controllerName + "/" + this.searchMethodName, //'@Url.Action(ViewBag.SearchFunctName)',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            id: idFrom,
            prevNext: PrevNext,
            numResults: numResults,
            SearchData: searchData
        }),
        dataType: "json",
        async: false,
        cache: false,
        success: function (result) {
            //var data = Utility_ManageJsonResult(result);
            var result_ids = result.ids;
            if (PrevNext === "PREV" || PrevNext === "Prev" || PrevNext === "prev") {
                var fullLength = result_ids.length;
                var halfLength = Math.floor(result_ids.length / 2);
                var tempVal;
                for (var i = 0; i < halfLength; i++) {
                    tempVal = result_ids[i];
                    result_ids[i] = result_ids[fullLength - i - 1];
                    result_ids[fullLength - i - 1] = tempVal;
                }
            }
            ListManagement.MoveToNewMid(result_ids);
        }
    });
};

ListManagement.GetDetailResults = function (CurrDispAnnID) {

    $.ajax({
        url: this.controllerName + "/" + this.detailsMethodName, //'@Url.Action(ViewBag.SearchFunctName)',
        type: "GET",
        contentType: "application/json; charset=utf-8",
        data: { id: CurrDispAnnID },
        dataType: "json",
        async: false,
        cache: false,
        success: function (result) {

            //debugger;

            //AddToBottomList(result.ids);
        }
    });
};



// ======================================================================================================================

//var ListManagement = {};

/*
var ListManagement = {
    
    // The Directive Control Variables
    controllerName: "",
    searchMethodName: "Search",
    detailsMethodName: "DetailsForView",
    newSearch: true,

    totNumberResults: 0,

    topListStart: 0,
    topListEnd: 0,
    ResultsTopList: [],

    midListStart: 0,
    midListEnd: 0,
    ResultsMidList: [],

    bottomListStart: 0,
    bottomListEnd: 0,
    ResultsBottomList: [],

    //CurrentStart: 0,
    //CurrentEnd: 0,
    MaxNumResultsPerBlock: 50, //param_numResultsPerPage * param_perPageMultiplePerFetch * 3, // * 10,

    listRes: null,
        
    // Resetting the navigation variables =====

    ResetVariables: function() {

        this.totNumberResults = 0;

        this.topListStart = 0;
        this.topListEnd = 0;
        this.ResultsTopList = [];

        this.midListStart = 0;
        this.midListEnd = 0;
        this.ResultsMidList = [];

        this.bottomListStart = 0;
        this.bottomListEnd = 0;
        this.ResultsBottomList = [];

        this.CurrentStart = 0;
        this.CurrentEnd = 0;
        this.listRes = null;
    },

    // Adding fetched data to the lists 

    AddToTopList: function (addToTopList) {
        if (addToTopList !== undefined && addToTopList !== null && addToTopList !== '') {
            this.topListEnd = (this.topListEnd === undefined || this.topListEnd === null) ? -1 : this.topListEnd;
            $.each(addToTopList, function (key, value) {
                this.topListEnd++;
                this.ResultsTopList[this.topListEnd] = value;
                //this.topListEnd++;
            });
        }
    },
    MoveToNewMid: function (newMidList) {
        if (newMidList !== undefined && newMidList !== null && newMidList !== '') {
            var numberResultsMidList = 0;
            this.ResultsMidList = [];
            $.each(newMidList, function (key, value) {
                this.ResultsMidList[numberResultsMidList] = value;
                numberResultsMidList++;
            });
        }
    },
    AddToBottomList: function (addToBottomList) {
        if (addToBottomList !== undefined && addToBottomList !== null && addToBottomList !== '') {
            $.each(addToBottomList, function (key, value) {
                this.bottomListStart--;
                this.ResultsBottomList[this.bottomListEnd - this.bottomListStart] = value;
            });
        }
    },


    // Get Displayed Results ====

    GetDisplayResultListTop: function () {
        var ret = "";
        var loopStart = this.CurrentStart;
        var loopEnd = this.CurrentEnd;
        for (var i = loopStart; i <= loopEnd; i++) {
            ret = ret + this.ResultsTopList[i] + param_delimiter;
        }
        return { firstID: this.ResultsTopList[loopStart], listIDs: ret };
        //return ret;
    },
    GetDisplayResultListMid: function (PrevNext) {
        var ret = "";
        var loopStart = this.CurrentStart - this.midListStart;
        var loopEnd = loopStart + param_numResultsPerPage - 1;
        if (loopEnd >= this.ResultsMidList.length)
            loopEnd = this.ResultsMidList.length - 1;
        for (var i = loopStart; i <= loopEnd; i++) {
            ret = ret + this.ResultsMidList[i] + param_delimiter;
        }
        return { firstID: this.ResultsMidList[loopStart], listIDs: ret };
        //return ret;
    },
    GetDisplayResultListBottom: function () {
        var ret = "";
        var loopStart = this.bottomListEnd - this.CurrentStart;
        var loopEnd = this.bottomListEnd - this.CurrentEnd;
        for (var i = loopStart; i >= loopEnd; i--) {
            ret = ret + this.ResultsBottomList[i] + param_delimiter;
        }
        return { firstID: this.ResultsBottomList[loopStart], listIDs: ret };
        //return ret;
    },

    // Fetching data from Server 

    FetchAndAddToTop: function (numResults) {
        $.ajax({
            url: this.controllerName + "/" + this.searchMethodName, //'@Url.Action(ViewBag.SearchFunctName)',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                id: this.ResultsTopList[this.topListEnd],
                prevNext: "Next",
                numResults: numResults
            }),
            dataType: "json",
            async: false,
            cache: false,
            success: function (result) {
                AddToTopList(result.ids);
            }
        });
    },
    FetchAndAddToBottom: function (numResults) {
        $.ajax({
            url: this.controllerName + "/" + this.searchMethodName, //'@Url.Action(ViewBag.SearchFunctName)',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                id: this.ResultsBottomList[this.bottomListEnd - this.bottomListStart],
                prevNext: "Prev",
                numResults: numResults
            }),
            dataType: "json",
            async: false,
            cache: false,
            success: function (result) {
                AddToBottomList(result.ids);
            }
        });
    },
    FetchNewMid: function (idFrom, numResults, PrevNext) {
        $.ajax({
            url: this.controllerName + "/" + this.searchMethodName, //'@Url.Action(ViewBag.SearchFunctName)',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                id: idFrom,
                prevNext: PrevNext,
                numResults: numResults
            }),
            dataType: "json",
            async: false,
            cache: false,
            success: function (result) {
                var result_ids = result.ids;
                if (PrevNext === "PREV" || PrevNext === "Prev" || PrevNext === "prev") {
                    var fullLength = result_ids.length;
                    var halfLength = Math.floor(result_ids.length / 2);
                    var tempVal;
                    for (var i = 0; i < halfLength; i++) {
                        tempVal = result_ids[i];
                        result_ids[i] = result_ids[fullLength - i - 1];
                        result_ids[fullLength - i - 1] = tempVal;
                    }
                }
                MoveToNewMid(result_ids);
            }
        });
    },

    GetDetailResults: function (CurrDispAnnID) {

        $.ajax({
            url: this.controllerName + "/" + this.detailsMethodName, //'@Url.Action(ViewBag.SearchFunctName)',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            data: { id: CurrDispAnnID },
            dataType: "json",
            async: false,
            cache: false,
            success: function (result) {

                //debugger;

                //AddToBottomList(result.ids);
            }
        });
    }
};  */