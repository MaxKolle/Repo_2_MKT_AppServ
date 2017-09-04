
//var mainImageSize = @ViewBag.mainImageSize;
var mainImageSize = 500;
var imageElement = null;

//var step = 1;

//function slidenext() {
//    document.images.slide.src = eval("image" + step + ".src");
//    if (step < 5) { 
//        step++;
//    } else { 
//        step = 1;
//    }
//}

//function slideprev() {
//    document.images.slide.src = "image" + step + ".png";
//    if (step <= 5 && step > 1) {
//        step--;
//    } else {
//        step = 5;
//    }
//}

//var otherImages ;

$(document).ready(function () {

    $("#divOtherImages").children().click(function () {

        imageElement = $(this).children().clone();
        imageElement.attr("src", imageElement.attr("src").replace("/Thumb_", "/"));

        //Util_DisplayImageInDiv(imageElement, $("#divMainImage"), true);
        Util_DisplayImageSrcInDiv(imageElement.attr("src").replace("/Thumb_", "/"), $("#divMainImage"), true);
    });

    $(".divOtherImages").children().click(function () {
        imageElement = $(this).clone();
        imageElement.attr("src", imageElement.attr("src").replace("/Thumb_", "/"));

        //Util_DisplayImageInDiv(imageElement, $("#divMainImage"), true);
        Util_DisplayImageSrcInDiv(imageElement.attr("src").replace("/Thumb_", "/"), $("#divMainImage"), true);
    });

});