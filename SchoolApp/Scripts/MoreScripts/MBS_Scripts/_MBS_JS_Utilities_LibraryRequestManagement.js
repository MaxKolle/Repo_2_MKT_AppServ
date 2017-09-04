

var LibraryRequestManagement = {};

// Below is the google maps Library Request Management Object
LibraryRequestManagement.googleMapsLibraryLoadedObj = {
    googleMapsLibraryHasAreadyBeenLoaded: false,
    Arr_OperationsToPerformOnceLoaded: [],

    AddOperationsToPerformOnceLoaded: function (funct) {
        this.Arr_OperationsToPerformOnceLoaded[this.Arr_OperationsToPerformOnceLoaded.length] = funct;
    },
    Get_GoogleMapsLibraryHasAreadyBeenLoaded: function () {
        return this.googleMapsLibraryHasAreadyBeenLoaded;
    },
    Set_GoogleMapsLibraryHasAreadyBeenLoaded: function (val) {
        if (val === true) {
            this.googleMapsLibraryHasAreadyBeenLoaded = true;
            $.each(this.Arr_OperationsToPerformOnceLoaded, function (key, value) {
                value();
            });
        }
        else {
            this.googleMapsLibraryHasAreadyBeenLoaded = false;
        }
    },
    Set_FunctionToExecute: function(funct){
        if (this.googleMapsLibraryHasAreadyBeenLoaded === true) {
            funct();
        }
        else {
            this.Arr_OperationsToPerformOnceLoaded[this.Arr_OperationsToPerformOnceLoaded.length] = funct;
        }
    },
    Set_LibraryURLToLoad: function(str){
        if (this.googleMapsLibraryHasAreadyBeenLoaded === false) {
            // We are here by ensuring that the google map library has indeed been loaded before we can proceed.
            $.when(
                $.getScript(str),
                $.Deferred(function (deferred) {
                    $(deferred.resolve);
                })
            ).done(function () {
                LibraryRequestManagement.googleMapsLibraryLoadedObj.Set_GoogleMapsLibraryHasAreadyBeenLoaded(true);
            });
        }
    }
};