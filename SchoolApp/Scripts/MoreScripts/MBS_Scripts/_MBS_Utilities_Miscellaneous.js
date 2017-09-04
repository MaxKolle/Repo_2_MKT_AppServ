
// Function used to get the background-color of an element
function Utility_GetBackgroundColor($dom) {
    var bgColor = "";
    while ($dom[0].tagName.toLowerCase() != "html") {
        bgColor = $dom.css("background-color");
        if (bgColor != "rgba(0, 0, 0, 0)" && bgColor != "transparent") {
            break;
        }
        $dom = $dom.parent();
    }
    return bgColor;
}

// Function used to find an element with the specific attribute
function Utility_FindElementWithAttr(ElemArr, attribute, attrValue){
    
    var tempElem;
    var seachedElem = null;
    $.each(ElemArr, function (index, value) {
        tempElem = $(value);
        if (seachedElem === null && tempElem.attr(attribute) /* value.getAttribute("data-val") */ === attrValue) {
            seachedElem = tempElem;
        }
    });
    return seachedElem;
}

// Function used to find an array of elements with the specific attribute
function Utility_FindArrElementWithAttr(ElemArr, attribute, attrValue){
    
    var tempElem;
    var seachedElemArr = null;
    $.each(ElemArr, function (index, value) {
        tempElem = $(value);
        if (tempElem.attr(attribute) /* value.getAttribute("data-val") */ === attrValue) {
            seachedElemArr.push(tempElem);
        }
    });
    return seachedElemArr;
}