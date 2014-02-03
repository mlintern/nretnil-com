var offset = 70;

$('.navbar li a.local').click(function(event) {
    event.preventDefault();
    $($(this).attr('href'))[0].scrollIntoView();
    scrollBy(0, -offset);
});


$(document).ready(function() {
    var i = setInterval(function(){
        if($("#twitter-widget-0").length) {
        	setTimeout(function(){ 
        		$("#twitter-widget-0").width('100%');
        		$("#twitter-widget-0").height('350');
        		$("#twitter-widget-0").contents().find("body").append("<style type='text/css'> html, .p-author .profile .p-name, .cards-base p, .cards-base p a, .timeline-header .summary, .timeline-header .summary a:link, .timeline-header .summary a:visited, .p-author a.profile:hover .p-name, .p-author a.profile:focus .p-name {color: #cfcfcf;} .header .avatar {float:left;position:relative;left:0;margin-right: 5px;} .var-chromeless .tweet {padding:12px 2px 10px 2px;float:left;width:200px;margin-right:10px;color: #cfcfcf;} .var-static .stream {height: 100%;} .var-chromeless span.p-geo {padding: 0;} .tweet .e-entry-title {margin: 0;overflow: visible;} a:link, a:visited, .stats span, .byline, .retweet-credit, .no-more-pane, .no-tweets-pane p, .p-geo, .cards-base .byline-user {color: #aaaaaa;}</style>");
            	clearInterval(i);
            }, 500);
        }
    }, 500)
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