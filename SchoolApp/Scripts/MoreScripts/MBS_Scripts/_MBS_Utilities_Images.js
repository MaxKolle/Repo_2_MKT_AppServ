
function Util_DisplayImageInDiv(img, div, centerHorizontal) {
    img.alt = "Image";
    var scale = img.height / div.height();
    if (img.width / scale > div.width()) {
        if (centerHorizontal !== undefined && centerHorizontal !== null && centerHorizontal == true) {
            var initialWidth = img.width;

            img.width = div.width();

            scale = initialWidth / img.width;
            var newHeight = img.height / scale;
            var shiftDown = Math.round((div.height() - newHeight) / 2);
            
            img.style.marginTop = shiftDown + "px";
        }
        else {
            img.width = div.width();
        }
    }
    else {
        img.height = div.height();
    }
    img.className = "clsCenterElement";

    //debugger;

    div.html(img);
}

function Util_DisplayImageSrcInDiv(src, div, centerHorizontal, AfterLoadFunct, ErrorFunct) {
    var img = new Image();
    img.onload = function () {
        Util_DisplayImageInDiv(this, div, centerHorizontal);
        if (AfterLoadFunct !== undefined && AfterLoadFunct !== null && AfterLoadFunct !== "") {
            AfterLoadFunct();
        }
    }
    img.onerror = function () {
        if (ErrorFunct !== undefined && ErrorFunct !== null && ErrorFunct !== "") {
            ErrorFunct();
        }
    }
    img.src = src;
}
function Util_DisplayImageSrcInDiv_2(src, divID, centerHorizontal, AfterLoadFunct, ErrorFunct) {
    var img = new Image();
    var div = $("#" + divID);
    img.onload = function () {
        Util_DisplayImageInDiv(this, div, centerHorizontal);
        if (AfterLoadFunct !== undefined && AfterLoadFunct !== null && AfterLoadFunct !== "") {
            AfterLoadFunct(divID);
        }
    }
    img.onerror = function () {
        if (ErrorFunct !== undefined && ErrorFunct !== null && ErrorFunct !== "") {
            ErrorFunct(divID);
        }
    }
    img.src = src;
}