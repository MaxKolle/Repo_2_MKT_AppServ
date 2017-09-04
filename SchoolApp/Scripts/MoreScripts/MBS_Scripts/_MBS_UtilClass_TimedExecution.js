

//
// Class Definition and Contruction Function
//
function MBS_TimedExecutionClass(overallDelay, funct, extendDeley) {

    //*%* Note: Ludovick - Please consider in this particular case (REF: PRODLIST) having an implementation where by we immidiately 
        // handle the event when it occures and then block and wait for a while before handling another occurrence.

    // Configuration Variables ======
    var OverallDelay = Utilities_ParseConditionalValue(overallDelay, 10000);
    var ExtendDeley = Utilities_ParseConditionalValue(extendDeley, true);

    // Private Variables =====
    var delay = OverallDelay;
    var dateTime;
    var lastKeyPressDateTime;
    var currentDateTime = null;
    //var continueLooping = true;
    var timerCurrentlyOn = false;
    var timerPtr = null;

    // Private Methods 
    function RunFunctionAfter(expectedDelay, funct) {

        timerCurrentlyOn = true;
        dateTime = new Date();
        currentDateTime = (dateTime.getMinutes() * 60 * 1000) + (dateTime.getSeconds() * 1000) + dateTime.getMilliseconds();
        if (ExtendDeley && ((currentDateTime - lastKeyPressDateTime) < expectedDelay)) {

            // Trying here to clear the timer object
            if (timerPtr !== null) {
                clearTimeout(timerPtr);
                timerPtr = null;
            }

            timerPtr = setTimeout(function () {
                RunFunctionAfter(expectedDelay, funct);
            }, expectedDelay - (currentDateTime - lastKeyPressDateTime));
        }
        else {
            funct();
            timerCurrentlyOn = false;
            
            // Trying here to clear the timer object
            clearTimeout(timerPtr);
            timerPtr = null;
        }
    }

    return {
        // Public Methods ====
        EventOccured: function () {
            dateTime = new Date();
            lastKeyPressDateTime = (dateTime.getMinutes() * 60 * 1000) + (dateTime.getSeconds() * 1000) + dateTime.getMilliseconds();
            if(timerCurrentlyOn === false)
                RunFunctionAfter(delay, funct);
        }
    };
}
