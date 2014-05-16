/*
 * jQuery Zoom In plugin 1.0.1
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
            var top_margin = ((cur_height*magnification)/2)-(cur_height/2);
            var left_margin = ((cur_width*magnification)/2)-(cur_width/2);
            console.log(cur_width*magnification);
            var styles = {
                "margin-left": "-"+left_margin+"px",
                "margin-top": "-"+top_margin+"px",
                "width": (cur_width*magnification)+"px"
            };
            
            $(this).css( styles );

        },function(){

            $(this).removeAttr('style');

        });

    }

};