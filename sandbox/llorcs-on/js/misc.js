jQuery.fn.zoomIn = function(settings){

    var options = jQuery.extend({
        magnification: 2,
        min_width: 768
    }, settings);

    if ($(window).width() >= options.min_width) {

        $(this).hover(function(){

            var magnification = options.magnification;

            if ($(this).data('magnification-times') != null){
                magnification = $(this).data('magnification-times');
            }

            var cur_width = parseInt($(this).width());
            var cur_height = parseInt($(this).height());
            var topbottom_margin = "-" + ((cur_height*magnification)/4) + "px";
            var rightleft_margin = "-" + ((cur_width*magnification)/4) + "px";
            var styles = {
                "margin-left": rightleft_margin,
                "margin-right": rightleft_margin,
                "margin-top": topbottom_margin,
                "margin-bottom": topbottom_margin,
                "width": (cur_width*magnification)
            };
            
            $(this).css( styles );

        },function(){

            $(this).removeAttr('style');

        });

    }

};

jQuery.fn.autoHide = function(settings){

    var options = jQuery.extend({
        delay: 1000, // in milliseconds
        min_width: 768, // in px
        slide_speed: 300, // in milliseconds
        show_height: 2 // in px
    }, settings);

    var cur_height = $(this).height();

    if ($(window).width() >= options.min_width) {

        $(this).hover(function(){

            $(this).stop(true);
            $(this).animate({top: 0},options.slide_speed);

        },function(){

            $(this).stop(true);
            $(this).animate({ top: -(cur_height - options.show_height) },2*options.slide_speed);

        });

        $(this).animate({top: -(cur_height - options.show_height)},options.slide_speed);
    }

};

$(document).ready(function() {
    $('.item').zoomIn();
    $(".navbar-auto-hide").autoHide();
});