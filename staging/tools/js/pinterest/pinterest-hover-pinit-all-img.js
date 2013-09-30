$(function(){
    var img = "http://dev.nretnil.com/staging/tools/img/pinit.png";
    var img_w = 46;
    var img_h = 26;
    var distance_from_corner = 10;
    var button = $("<img>").attr( { src: img, id: "cp-pin-it" }).css({ position: "absolute", display: "none", cursor: "pointer" }).appendTo("body");
    var current_img = "";
    var pinterest_url = "http://pinterest.com/pin/create/button/";
    var page_url = document.location;
    var page_title = document.title;
    var page_domain = location.host;
    var page_protocol = location.protocol;
    $("img").not("#cp-pin-it").hover(function(){
        var offset = $(this).offset();
        var left = offset.left + $(this).innerWidth() - img_w - distance_from_corner;
        var top = offset.top + distance_from_corner;
        if ($(this).attr("alt")) {
            page_title = $(this).attr("alt");
        } else {
            page_title = document.title;
        }
        if ( $(this).attr('src').toLowerCase().indexOf("http") >= 0 ){
        	current_img = $(this).attr('src');
        }else{
        	if ( $(this).attr('src').toLowerCase().indexOf("//") >= 0 ){
        	current_img = location.protocol + $(this).attr('src');
        	}else{
        	current_img = page_protocol + "//" + page_domain + "/" + $(this).attr('src');
        	}
        }
        button.css({top: top, left: left, display: "block"});
    }, function() {
        button.css({ display: "none" });
    });
    
    button.hover(function(){
        button.css({ display: "block"});
    }).click(function(){
        var url = pinterest_url;
        url += "?url=" + encodeURIComponent(page_url);
        url += "&description=" + encodeURIComponent(page_title);
        url += "&media=" + encodeURIComponent(current_img);
        window.open(url,'Pinterest','screenX=100,screenY=100,height=580,width=730');
    });
});