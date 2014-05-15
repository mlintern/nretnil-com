/*
 * jQuery Auto Hide plugin 1.0.0
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: May 05 2014
 */
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