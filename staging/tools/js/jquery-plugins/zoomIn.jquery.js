/*
 * jQuery Zoom In plugin 1.1.0
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: May 22 2014
 */
jQuery.fn.zoomIn = function(settings){

    var options = jQuery.extend({
        magnification: 2,
        min_width: 768,
        direction: 'middle' // up, down, left, right, middle
    }, settings);

    if ($(window).width() >= options.min_width) {

        $(this).hover(function(){

            var magnification = options.magnification;
            var direction = options.direction;

            if ($(this).data('magnification-times') != null){
                magnification = $(this).data('magnification-times');
            }
            if ($(this).data('magnification-direction') != null){
                direction = $(this).data('magnification-direction');
            }

            var cur_width = parseInt($(this).width());
            var cur_height = parseInt($(this).height());
            var top_margin = ((cur_height*magnification)/2)-(cur_height/2);
            var left_margin = ((cur_width*magnification)/2)-(cur_width/2);
            var styles = {
                "width": (cur_width*magnification)+"px"
            }

            switch (direction) {
                case 'up':
                    styles['margin-left'] = '-'+left_margin+'px';
                    styles['margin-top'] = '-'+(2*top_margin)+'px';
                    break;
                case 'down':
                    styles['margin-left'] = '-'+left_margin+'px';
                    styles['margin-bottom'] = '-'+(2*top_margin)+'px';
                    break;
                case 'left':
                    styles['margin-left'] = '-'+(2*left_margin)+'px';
                    styles['margin-top'] = '-'+top_margin+'px';
                    break;
                case 'right':
                    styles['margin-right'] = '-'+(2*left_margin)+'px';
                    styles['margin-top'] = '-'+top_margin+'px';
                    break;
                default:
                    styles['margin-left'] = '-'+left_margin+'px';
                    styles['margin-top'] = '-'+top_margin+'px';
                    break;
            }
            
            $(this).css( styles );

        },function(){

            $(this).removeAttr('style');

        });

    }

};