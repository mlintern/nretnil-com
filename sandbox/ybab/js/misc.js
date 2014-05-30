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

var endDate = new Date(2014,12,18,18,00,00,00,00);
$('.countdown-div').countdown({until: endDate, pause: false});

$(document).ready(function(){
    $('#nav').localScroll(800);
    
    //.parallax(xPosition, speedFactor, outerHeight) options:
    //xPosition - Horizontal position of the element
    //inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
    //outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
    $('.first').parallax("50%", 0.1);
    $('.second').parallax("50%", 0.2);
    $('.third').parallax("50%", 0.2);
    $('.first .bg').parallax("50%", 0.6);
    $('.second .bg').parallax("50%", 0.5);
    $('.third .bg').parallax("50%", 0.4);
})