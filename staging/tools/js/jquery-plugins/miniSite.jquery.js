/*
 * jQuery Mini Site plugin 1.0.0
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: May 05 2014
 */
jQuery.fn.showMiniSite = function(settings) {

    var options = jQuery.extend({
        site_width: '100%',
        site_height: 'auto', // Set height based on width
        disable_interation: true // Can click within the site windows
    }, settings);

    $(this).each(function() {
        var site_url = $(this).data('site-url');
        var div_width = $(this).width();
        if (options.site_height == 'auto') {
            var div_height = (div_width * 9) / 16;
        }

        $(this).append('<iframe src="'+site_url+'" height="'+div_height+'px" width="'+options.site_width+'"></iframe>');

        if ( options.disable_interation ) {
            $(this).css({'position': 'relative'});
            $(this).append('<a target="_blank" href="'+site_url+'" style="position:absolute;top:0;bottom:0;left:0;right:0;"></a>')
        }
    })

};