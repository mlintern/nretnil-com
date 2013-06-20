/**
 * jQuery plugin for posting form including file inputs.
 * 
 * Copyright (c) 2010 - 2011 Ewen Elder
 *
 * Licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @author: Ewen Elder <ewen at jainaewen dot com> <glomainn at yahoo dot co dot uk>
 * @version: 1.1.1 (2011-07-29)
**/
(function ($)
{
	$.fn.iframePostForm = function (options)
	{
		var response,
			returnReponse,
			element,
			status = true,
			iframe;
		
		options = $.extend({}, $.fn.iframePostForm.defaults, options);
		
		
		// Add the iframe.
		if (!$('#' + options.iframeID).length)
		{
			$('body').append('<iframe id="' + options.iframeID + '" name="' + options.iframeID + '" style="display:none" />');
		}
		
		
		return $(this).each(function ()
		{
			element = $(this);
			
			
			// Target the iframe.
			element.attr('target', options.iframeID);
			
			
			// Submit listener.
			element.submit(function ()
			{
				// If status is false then abort.
				status = options.post.apply(this);
				
				if (status === false)
				{
					return status;
				}
				
				
				iframe = $('#' + options.iframeID).load(function ()
				{
					response = iframe.contents().find('body');
					
					
					if (options.json)
					{
						returnReponse = $.parseJSON(response.text());
					}
					
					else
					{
						returnReponse = response.html();
					}
					
					
					options.complete.apply(this, [returnReponse]);
					
					iframe.unbind('load');
					
					
					setTimeout(function ()
					{
						response.html('');
					}, 1);
				});
			});
		});
	};
	
	
	$.fn.iframePostForm.defaults =
	{
		iframeID : 'iframe-post-form',       // Iframe ID.
		json : false,                        // Parse server response as a json object.
		post : function () {},               // Form onsubmit.
		complete : function (response) {}    // After response from the server has been received.
	};
})(jQuery);


$(function ()
{
	$('form').iframePostForm
	({
		json : true,
		post : function ()
		{
			var message;
			
			if (!$('.message').length)
			{
				$('#demonstrations').after('<div class="message" style="display:none; padding:10px; text-align:center" />');
			}
			
			
			if ($('input[type=file]').val().length)
			{
				$('.message')
					.html('Uploading file&hellip;')
					.css({
						color : '#006100',
						background : '#c6efce',
						border : '2px solid #006100'
					})
					.slideDown();
			}
			
			else
			{
				$('.message')
					.html('Please select an image for uploading.')
					.css({
						color : '#9c0006',
						background : '#ffc7ce',
						border : '2px solid #9c0006'
					})
					.slideDown();
				
				return false;
			}
		},
		complete : function (response)
		{
			var style,
				width,
				html = '';
			
			
			if (!response.success)
			{
				$('.message').slideUp(function ()
				{
					$(this)
						.html('There was a problem with the image you uploaded')
						.css({
							color : '#9c0006',
							background : '#ffc7ce',
							borderColor : '#9c0006'
						})
						.slideDown();
				});
			}
			
			else
			{
				html += '<p>Below is the uploaded image and the values that were posted when you submitted the demonstration form.</p>';
				
				
				if (response.postedValues)
				{
					for (title in response.postedValues)
					{
						html += '<strong>' + title + ':</strong> ' + response.postedValues[title] + '<br />';
					}
				}
				
				
				if (response.imageSize)
				{
					width = response.imageSize[0] > 500 ? 500 : response.imageSize[0];
				}
				
				
				if (response.imageSource)
				{
					html += '<img src="' + response.imageSource + '" width="' + width + '" alt="Your uploaded image" />';
				}
				
				
				$('.message').slideUp(function ()
				{
					$(this)
						.html(html)
						.css({
							color : '#006100',
							background : '#c6efce',
							borderColor : '#006100'
						})
						.slideDown();
				});
			}
		}
	});
});