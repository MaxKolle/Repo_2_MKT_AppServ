
//debugger;

if (uiDemoMinParamsSettings.fixedHeader) $('input[type="checkbox"]#smart-fixed-header').click();
if (uiDemoMinParamsSettings.fixedNavigation) $('input[type="checkbox"]#smart-fixed-navigation').click();
if (uiDemoMinParamsSettings.fixedRibbon) $('input[type="checkbox"]#smart-fixed-ribbon').click();
if (uiDemoMinParamsSettings.fixedFooter) $('input[type="checkbox"]#smart-fixed-footer').click();
if (uiDemoMinParamsSettings.rightToLeft) $('input[type="checkbox"]#smart-rtl').click();

if (uiDemoMinParamsSettings.changeTopMenu) {
    $("#smart-topmenu").change();
    $('input[type="checkbox"]#colorblind-friendly').click();
}

if (uiDemoMinParamsSettings.fixedContainer) {
    $('input[type="checkbox"]#smart-fixed-container').click();
    $("#smart-bgimages img:nth-child(" + uiDemoMinParamsSettings.backGroundNum + ")").click()   // nth-child ranges from 2 to 6 inclusive
}

$('#smart-style-' + uiDemoMinParamsSettings.layoutStyle).click();    // smart-style-n: with the value of n ranging from 0 to 5 inclusive
