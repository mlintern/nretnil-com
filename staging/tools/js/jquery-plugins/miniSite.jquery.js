/*
 * jQuery Mini Site plugin 1.1.1
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: June 28 2016
 */
jQuery.fn.showMiniSite = function(settings) {

  var options = jQuery.extend({
    siteWidth: '100', // %
    siteHeight: 'auto', // ratio set with :
    disableInteraction: true // Can click within the site windows
  }, settings);

  $(this).each(function() {
    var siteUrl = $(this).data('site-url');
    var divWidth = $(this).width();
    var divHeight = "100";
    var pattern = new RegExp('^[0-9]+:[0-9]+$');
    if (options.siteHeight == 'auto') {
      divHeight = (divWidth * 9) / 16;
    } else if ( pattern.test(options.siteHeight) ) {
      var ratio = options.siteHeight.split(":");
      divHeight = (divWidth * ratio[0]) / ratio[1];
    } else {
      divHeight = "250";
      console.log("siteHeight option not given as ratio a:b");
    }

    $(this).append('<iframe src="'+siteUrl+'" height="' + divHeight + 'px" width="' + options.siteWidth + '%"></iframe>');

    if ( options.disableInteraction ) {
      $(this).css({'position': 'relative'});
      $(this).append('<a target="_blank" href="'+siteUrl+'" style="position:absolute;top:0;bottom:0;left:0;right:0;"></a>');
    }
  });

};