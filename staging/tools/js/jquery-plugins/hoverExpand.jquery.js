/*
 * jQuery Hover Expand plugin 1.2.1
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: May 16, 2016
 */
jQuery.fn.hoverExpand = function(settings){

  var options = jQuery.extend({
    delay: 200, // in milliseconds
    startHeight: 250, // in px
    slideSpeed: 250, // in milliseconds
    maxHeight: 0, // in px
    arrowHeight: 15, // in px
    arrowWidth: 20 // in %
  }, settings);
  
  $(this).each( function () {

    $(this).css({ 'overflow': "hidden" });

    var divHeight = $(this).height();

    if ( divHeight > options.startHeight ) {
      
      $(this).wrap( "<div class='arrow-container'></div>" );
      var width = $(this).width();
      var arrowMargin = width * ( ( 50 - ( options.arrowWidth / 2 ) ) / 100 );
      var arrowSideBorder = width * ( ( options.arrowWidth / 2 ) / 100 );
      $(this).parent('.arrow-container').append("<div class='arrow' style='border-top: solid "+options.arrowHeight+"px;border-left: solid "+arrowSideBorder+"px transparent;border-right: solid "+arrowSideBorder+"px transparent;margin: 5px "+arrowMargin+"px;'></div>");

      $(this).hover(function(){
        $(this).stop(true);
        var newHeight = '100%';
        if ( options.maxHeight > 0 ) {
          newHeight = options.maxHeight + "px";
          $(this).css({ 'overflow': "scroll" });
        }
        $(this).css({ height: 'auto' });
        var autoHeight = $(this).height();
        $(this).css({ height: options.startHeight });
        $(this).parent().find('.arrow').css('visibility', 'hidden');
        $(this).delay(options.delay).animate({ 'height': autoHeight }, options.slideSpeed);
      },function(){
        $(this).stop(true);
        $(this).delay(options.delay).animate({ 'height': options.startHeight }, options.slideSpeed);
        $(this).parent().find('.arrow').css('visibility', 'visible');
        if ( options.maxHeight < 100 ) {
          $(this).css({ 'overflow': "hidden" });
          $(this).scrollTop(0);
        }
      });

      $(this).css({ height: options.startHeight });
    }
  });
};