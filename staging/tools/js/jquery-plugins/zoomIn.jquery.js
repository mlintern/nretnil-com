/*
 * jQuery Zoom In plugin 1.1.2
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: May 16 2016
 */
jQuery.fn.zoomIn = function(settings){
  var options = jQuery.extend({
    magnification: 2,
    minWidth: 768,
    direction: 'middle' // up, down, left, right, middle
  }, settings);

  if ($(window).width() >= options.minWidth) {
    $(this).hover(function(){
      var magnification = options.magnification;
      var direction = options.direction;

      if ($(this).data('magnification-times') !== undefined){
        magnification = $(this).data('magnification-times');
      }
      if ($(this).data('magnification-direction') !== undefined){
        direction = $(this).data('magnification-direction');
      }

      var currWidth = parseInt($(this).width());
      var currHeight = parseInt($(this).height());
      var topMargin = ((currHeight * magnification) / 2) - (currHeight / 2);
      var leftMargin = ((currWidth * magnification) / 2) - (currWidth / 2);
      var styles = {
        "width": (currWidth * magnification) + "px"
      };

      switch (direction) {
        case 'up':
          styles['margin-left'] = '-' + leftMargin + 'px';
          styles['margin-top'] = '-' + (2*topMargin) + 'px';
          break;
        case 'down':
          styles['margin-left'] = '-' + leftMargin + 'px';
          styles['margin-bottom'] = '-' + (2*topMargin) + 'px';
          break;
        case 'left':
          styles['margin-left'] = '-' + (2*leftMargin) + 'px';
          styles['margin-top'] = '-' + topMargin + 'px';
          break;
        case 'right':
          styles['margin-right'] = '-' + (2*leftMargin) + 'px';
          styles['margin-top'] = '-' + topMargin + 'px';
          break;
        default:
          styles['margin-left'] = '-' + leftMargin + 'px';
          styles['margin-top'] = '-' + topMargin + 'px';
          break;
      }
      
      $(this).css( styles );
    },function(){
      $(this).removeAttr('style');
    });
  }
};