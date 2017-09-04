/// <reference path="../Business_Scripts/canvasjs-1.5.7/source/excanvas.js" />
/// <reference path="../Business_Scripts/canvasjs-1.5.7/source/canvasjs.js" />
//function Utilities to Convert the Content of a div tag
// to a pdf documnet. 
//the function take the div id as first parameter,the chart class name and the id
//of the the button

/*
$.getScript("/Scripts/MoreScripts/canvg.js", function (data, textStatus, jqxhr) {
    console.log(data); // Data returned
    console.log(textStatus); // Success
    console.log(jqxhr.status); // 200
    console.log("Load was performed.");
}); */

$.when(
    $.getScript("/Scripts/MoreScripts/Business_Scripts/jsPDF-master/jspdf.js"),
    $.getScript("/Scripts/MoreScripts/Business_Scripts/jsPDF-master/jspdf.plugin.standard_fonts_metrics.js"),
    $.getScript("/Scripts/MoreScripts/Business_Scripts/jsPDF-master/jspdf.plugin.split_text_to_size.js"),
    $.getScript("/Scripts/MoreScripts/Business_Scripts/jsPDF-master/jspdf.plugin.from_html.js"),
    $.getScript("/Scripts/MoreScripts/Business_Scripts/jsPDF-master/libs/FileSaver/FileSaver.js"),
    $.getScript("/Scripts/MoreScripts/Business_Scripts/HighChart/modules/canvas-tools.src.js"),
    $.getScript("/Scripts/MoreScripts/Business_Scripts/HighChart/modules/canvas-tools.js"),
    $.getScript("/Scripts/MoreScripts/Business_Scripts/jsPDF-master/jspdf.plugin.addimage.js"),
    $.Deferred(function (deferred) {
        $(deferred.resolve);
    })
).done(function () {
    ConvertToPdf(chartClassName, buttonElem, ReportTitle, fileName);
});


//function to convert the 

function ConvertToPdf(chartClassName, buttonElem, ReportTitle, fileName) {
    (function (H) {
        H.Chart.prototype.createCanvas = function (divId) {
            var svg = this.getSVG(),
                width = parseInt(svg.match(/width="([0-9]+)"/)[1]),
                height = parseInt(svg.match(/height="([0-9]+)"/)[1]),
                canvas = document.createElement('canvas');

            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);

            if (canvas.getContext && canvas.getContext('2d')) {

                canvg(canvas, svg);

                return canvas.toDataURL("image/jpeg");
            }
            else {
                alert("Your browser doesn't support this feature, please use a modern browser");
                return false;
            }
        }

    }(Highcharts));

    buttonElem.click(function () {
        var doc = new jsPDF();

        // chart height defined here so each chart can be palced
        // in a different position
        var chartHeight = 80;

        // All units are in the set measurement for the document
        // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
        doc.setFontSize(40);
        // ReportTitle.setFontSize(5);
        doc.text(35, 25, ReportTitle);

        //loop through each chart
        chartClassName.each(function (index) {
            var imageData = $(this).highcharts().createCanvas();

            // add image to doc, if you have lots of charts,
            // you will need to check if you have gone bigger 
            // than a page and do doc.addPage() before adding 
            // another image.

            /**
            * addImage(imagedata, type, x, y, width, height)
            */
            doc.addImage(imageData, 'JPEG', 45, (index * chartHeight) + 40, 120, chartHeight);
        });

        //save with name
        doc.save(fileName + '.pdf');
    });
}