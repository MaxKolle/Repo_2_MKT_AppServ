function CalcConnSpeed(imgUrl, imgSize, callback) {
    //var imageAddr = "/Images/TestImages/Desert.jpg";
    var imageAddr = "/Images/TestImages/DSC00055.jpg";
    if (imgUrl !== undefined && imgUrl !== null && imgUrl !== "")
        imageAddr = imgUrl;
    //var downloadSize = 826000; //bytes
    var downloadSize = 3052000; //bytes
    if (imgSize !== undefined && imgSize !== null && imgSize !== 0)
        downloadSize = imgSize;
    var result = {};

    function MeasureConnectionSpeed() {
        var startTime, endTime;
        var download = new Image();
        download.onload = function () {

            //debugger;

            endTime = (new Date()).getTime();
            ComputeResults();
        }
        download.onerror = function (err, msg) {
            result = null;
        }

        startTime = (new Date()).getTime();
        var cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;

        function ComputeResults() {

            //debugger;

            result.duration = (endTime - startTime) / 1000;
            result.bitsLoaded = downloadSize * 8;
            result.speedBps = (result.bitsLoaded / result.duration).toFixed(2);
            result.speedKbps = (result.speedBps / 1024).toFixed(2);
            result.speedMbps = (result.speedKbps / 1024).toFixed(2);
            callback(result);
        }
    }
    MeasureConnectionSpeed();
    //return result;
}