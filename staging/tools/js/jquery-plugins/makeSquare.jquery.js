/*
 * jQuery Make Square plugin 1.0.1
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: May 16, 2016
 */
jQuery.fn.makeSquare = function(settings) {

	var options = jQuery.extend({
		basedOn: 'width'
	}, settings);

	$(this).each(function() {
		if (options.basedOn == 'height') {
			var height = $(this).height();
			$(this).width(height);
		} else {
			var width = $(this).width();
			$(this).height(width);
		}
	});

};