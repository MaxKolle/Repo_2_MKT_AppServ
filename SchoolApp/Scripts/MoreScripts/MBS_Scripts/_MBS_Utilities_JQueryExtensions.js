
//JQuery HTML5 Text Input Selectors
(function ($) {

    //debugger;

    var types = 'text search number email datetime datetime-local date '
          + 'month week time tel url color range'.split(' '),
        len = types.length;
    $.expr[':']['textall'] = function (elem) {
        var type = elem.getAttribute('type');
        for (var i = 0; i < len; i++) {
            if (type === types[i]) {
                return true;
            }
        }
        return false;
    };
})(jQuery);


String.prototype.fileExists = function () {
    filename = this.trim();

    var response = jQuery.ajax({
        url: filename,
        type: 'HEAD',
        async: false
    }).status;

    return (response != "200") ? false : true;
}


// Scrolling in  the html page
$.fn.ScrollTo = function (target, options, callback) {

    //debugger;

    if (typeof options == 'function' && arguments.length == 2) { callback = options; options = target; }

    var settings = $.extend({
        scrollTarget: target,
        offsetTop: 50,
        duration: 500,
        easing: 'swing'
    }, options);

    return this.each(function () {
        var scrollPane = $(this);
        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
        scrollPane.animate({ scrollTop: scrollY }, parseInt(settings.duration), settings.easing, function () {
            if (typeof callback == 'function') { callback.call(this); }
        });
    });
}