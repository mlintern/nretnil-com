/* Used for ScrollSpy
var offset = 70;

$('.navbar li a.local').click(function(event) {
    event.preventDefault();
    $($(this).attr('href'))[0].scrollIntoView();
    scrollBy(0, -offset);
});
*/



$(document).ready(function() {

	$('.minusOne').click(function(){
		$(this).parents('.thumbnail').find('.rank').remove();
		$(this).parents('.thumbnail').append('<div class="rank"><i class="fa fa-ban text-danger"></i></div>');
	});
	
	$('.plusOne').click(function(){
		$(this).parents('.thumbnail').find('.rank').remove();
		$(this).parents('.thumbnail').append('<div class="rank"><i class="fa fa-check text-success"></i></div>')
	});
	
	$('a[data-toggle="collapse"]').click(function(){
		var nav = $(this).data('nav-active');
		$('.navbar-nav li').removeClass("active");
		$('#'+nav).addClass("active");
	});

});

function progressUp(id,amount) {
	var current = parseInt($(id).attr('aria-valuenow'));
	var max = parseInt($(id).attr('aria-valuemax'));
	var min = parseInt($(id).attr('aria-valuemin'));
	var full = parseInt($(id).attr('aria-valuefull')); 
	var newval = current + amount;
	var percent = (newval / full)*100;

	if ( newval > max ){
		$(id).attr('aria-valuenow', max);
		percent = (((max) / full)*100);
		$(id).css('width', percent+'%');
	}else{
		$(id).attr('aria-valuenow', newval );
		$(id).css('width', percent+'%');
	}
}

function progressDown(id,amount) {
	var current = parseInt($(id).attr('aria-valuenow'));
	var max = parseInt($(id).attr('aria-valuemax'));
	var min = parseInt($(id).attr('aria-valuemin'));
	var full = parseInt($(id).attr('aria-valuefull')); 
	var newval = current - amount;
	var percent = (newval / full)*100;

	if ( newval < min ){
		$(id).attr('aria-valuenow', min);
		percent = ((min / full)*100);
		$(id).css('width', percent+'%');
	}else{
		$(id).attr('aria-valuenow', newval );
		$(id).css('width', percent+'%');
	}
}