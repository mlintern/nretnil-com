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
        siteWidth: '100%',
        siteHeight: 'auto', // Set height based on width
        disableInteration: true // Can click within the site windows
    }, settings);

    $(this).each(function() {
        var siteUrl = $(this).data('site-url');
        var divWidth = $(this).width();
        if (options.siteHeight == 'auto') {
            var divHeight = (divWidth * 9) / 16;
        }

        $(this).append('<iframe src="'+siteUrl+'" height="'+divHeight+'px" width="'+options.siteWidth+'"></iframe>');

        if ( options.disableInteration ) {
            $(this).css({'position': 'relative'});
            $(this).append('<a target="_blank" href="'+siteUrl+'" style="position:absolute;top:0;bottom:0;left:0;right:0;"></a>')
        }
    })

};