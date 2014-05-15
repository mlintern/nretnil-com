/*
 * jQuery Zoom In plugin 1.0.0
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: May 05 2014
 */
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