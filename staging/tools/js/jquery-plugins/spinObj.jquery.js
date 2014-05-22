/*
 * jQuery Spin Object plugin 1.0.0
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: May 22 2014
 */
jQuery.fn.spinObj = function(settings){

  var options = jQuery.extend({
    delta_degrees: 3,
    rotations: 1,
    direction: 'clockwise' // clockwise, counter
  }, settings);

  var interval = null;
  var counter = 0;
  var $self = $(this);
  var goal = 360*options.rotations;
  clearInterval(interval);
  
  interval = setInterval(function(){
    console.log(counter);
    if (counter < goal) {
      counter += options.delta_degrees;
      if (counter > goal) {
        counter = goal;
      }
      switch(options.direction) {
        case 'counter':
          $self.css({
            MozTransform: 'rotate(-' + -counter + 'deg)',
            WebkitTransform: 'rotate(' + -counter + 'deg)',
            transform: 'rotate(' + -counter + 'deg)'
          });
          break;
        default:
          $self.css({
            MozTransform: 'rotate(-' + counter + 'deg)',
            WebkitTransform: 'rotate(' + counter + 'deg)',
            transform: 'rotate(' + counter + 'deg)'
          });
          break;
      }
    }else{
    clearInterval(interval);
    }
  }, 10);
        
};