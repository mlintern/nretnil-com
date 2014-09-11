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
        minWidth: 768, // in px
        slideSpeed: 300, // in milliseconds
        showHeight: 2 // in px
    }, settings);

    var currHeight = $(this).height();

    if ($(window).width() >= options.minWidth) {

        $(this).hover(function(){

            $(this).stop(true);
            $(this).animate({top: 0},options.slideSpeed);

        },function(){

            $(this).stop(true);
            $(this).animate({ top: -(currHeight - options.showHeight) },2*options.slideSpeed);

        });

        $(this).animate({top: -(currHeight - options.showHeight)},options.slideSpeed);
    }

};