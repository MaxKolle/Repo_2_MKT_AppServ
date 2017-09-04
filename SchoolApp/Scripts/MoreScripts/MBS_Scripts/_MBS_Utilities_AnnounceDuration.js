//
// Computing the duration of an announcement
//
//function Utility_AnnounceDuration(elementClassName, serverDate) {
//    var creationDates = $("." + elementClassName);


function Utility_AnnounceDuration(creationDates, today, textYear, textMonths, textDays, textHours, textMins) {

    //debugger;

    //var today = new Date(serverDate);
    //var today = new Date();
    //var textYear = " years";
    //var textMonths = " months";
    //var textDays = " days";
    //var textHours = " hours";
    //var textMins = " mins";

    creationDates.html(function () {

        //debugger;

        //console.log($(this).html());
        ////console.log(new Date($(this).html()));
        //announceDate = new Date($(this).html());

        // JQuery Note: Here we are breaking a date time and passing it to a new date object
        var DateTimeArr = ($(this).html()).split(" ");
        var DateArr = DateTimeArr[0].split("/");
        var TimeArr = DateTimeArr[1].split(":");
        announceDate = new Date(DateArr[2], DateArr[1] - 1, DateArr[0], TimeArr[0], TimeArr[1]);        

        minutesDiff = (today.getTime() - announceDate.getTime()) / (1000 * 60);

        var result = 0;
        if (minutesDiff <= 60)
            result = minutesDiff + textMins;
        else if (minutesDiff <= (24 * 60)) {
            var r2 = minutesDiff % 60;
            var hrs = minutesDiff - r2;
            var remainder = Math.floor(r2);
            result = (hrs / 60) + textHours;
            if (remainder > 0) {
                result += " " + (remainder) + textMins;
            }
        }
        else if (minutesDiff <= (24 * 60 * 30)) {
            var r2 = minutesDiff % (24 * 60);
            var days = minutesDiff - r2;
            var remainder = Math.floor(r2 / 60);
            result = (days / (24 * 60)) + textDays;
            if (remainder > 0) {
                result += " " + (remainder) + textHours;
            }
        }
        else if (minutesDiff <= (24 * 60 * 30 * 12)) {
            var r2 = minutesDiff % (60 * 24 * 30);
            var a = minutesDiff - r2;

            var numDays = a / (24 * 60);
            var otherDays = Math.floor(r2 / (60 * 24))
            numDays2 = numDays + otherDays;
            if (numDays2 <= 90) {

                result = (numDays2) + textDays;
                r2 -= (otherDays * 60 * 24);
                if (r2 > 0) {
                    result += " " + Math.floor(r2 / (60)) + textHours;
                }
            }
            else {
                result = (numDays / 30) + textMonths;
                var remainder = Math.floor(r2 / (60 * 24));
                result += " " + remainder + textDays;
            }

        }
        else {
            result = "More than a year";
        }
        //$(this).html(result);
        return result;

    });
}
