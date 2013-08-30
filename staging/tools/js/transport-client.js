(function($) {
	"use strict";
	
	$("#videoform").on('submit',function(){
		$('.message').slideUp(function (){
			$(this)
				.html('Success')
				.css({
					color : '#006100',
					background : '#c6efce',
					border : '#006100 2px solid',
					padding : '3px 10px'
				})
				.slideDown();
		});
	});
})(jQuery);