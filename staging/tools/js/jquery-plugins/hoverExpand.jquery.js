/*
 * jQuery Hover Expand plugin 1.1.0
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: September 11, 2014
 */
jQuery.fn.hoverExpand = function(settings){

    var options = jQuery.extend({
        delay: 500, // in milliseconds
        startHeight: 250, // in px
        slideSpeed: 500, // in milliseconds
        maxHeight: 100, // in %
        arrowHeight: 15, // in px
        arrowWidth: 20 // in %
    }, settings);
    
    $(this).each( function () {
        
        var divHeight = $(this).height();
        var expandedHeight = divHeight * (options.maxHeight/100);
        
        $(this).css({ 'overflow': "hidden" });
        
        if ( divHeight > options.startHeight ) {
            
                $(this).wrap( "<div class='arrow-container'></div>" );
                var width = $(this).width();
                var arrowMargin = width * ( ( 50 - ( options.arrowWidth / 2 ) ) / 100 );
                var arrowSideBorder = width * ( ( options.arrowWidth / 2 ) / 100 );
                $(this).parent('.arrow-container').append("<div class='arrow' style='border-top: solid "+options.arrowHeight+"px;border-left: solid "+arrowSideBorder+"px transparent;border-right: solid "+arrowSideBorder+"px transparent;margin: 5px "+arrowMargin+"px;'></div>");
                            
                $(this).hover(function(){
            
                    $(this).stop(true);
                    if ( options.maxHeight < 100 ) {
                        $(this).css({ 'overflow': "scroll" });
                    }
                    $(this).animate({ 'height': expandedHeight },options.slideSpeed, function() { $(this).parent().find('.arrow').css('visibility','hidden'); });
            
                },function(){
            
                    $(this).stop(true);
                    $(this).animate({ 'height': options.startHeight },options.slideSpeed/2, function() { $(this).parent().find('.arrow').css('visibility','visible'); });
                    if ( options.maxHeight < 100 ) {
                        $(this).css({ 'overflow': "hidden" });
                        $(this).scrollTop(0);
                    }
            
                });
        
            $(this).animate({ height: options.startHeight },options.slideSpeed);
        }
    });
};