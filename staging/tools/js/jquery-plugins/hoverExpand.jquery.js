/*
 * jQuery Hover Expand plugin 1.0.0
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: September 10, 2014
 */
jQuery.fn.hoverExpand = function(settings){

    var options = jQuery.extend({
        delay: 500, // in milliseconds
        startHeight: 250, // in px
        slideSpeed: 300, // in milliseconds
        maxHeight: 100 // in %
    }, settings);
    
    $(this).each( function () {

        var divHeight = $(this).height();
        var expandedHeight = divHeight * (options.maxHeight/100);
        
        $(this).css({ 'overflow': "hidden" });
        
        if ( divHeight > options.startHeight ) {
                            
                $(this).hover(function(){
            
                    $(this).stop(true);
                    if ( options.maxHeight < 100 ) {
                        $(this).css({ 'overflow': "scroll" });
                    }
                    $(this).animate({ 'height': expandedHeight },options.slideSpeed);
            
                },function(){
            
                    $(this).stop(true);
                    $(this).animate({ 'height': options.startHeight },2*options.slideSpeed);
                    if ( options.maxHeight < 100 ) {
                        $(this).css({ 'overflow': "hidden" });
                        $(this).scrollTop(0);
                    }
            
                });
        
            $(this).animate({ height: options.startHeight },options.slideSpeed);
        }
    });
};