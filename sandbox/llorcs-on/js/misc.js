$(document).ready(function() {
    $(".item").hover(function(){
        var magnification = $(this).data('magnification-times');
        var cur_width = $(this).width();
        var cur_height = $(this).height();
        var window_width = $(window).width();
        var window_height = $(window).height();
        var cur_left = $(this).offset().left;
        var cur_top = $(this).offset().top;
        var new_top = (((cur_top - (cur_height/magnification))/window_height) * 100).toFixed(2) + "%";
        var new_left = (((cur_left - (cur_width/magnification))/window_width) * 100).toFixed(2) + "%";
        var styles = {
            top: new_top,
            left: new_left
        };
        $(this).width(cur_width*magnification);
        $( this ).css( styles );
    },function(){
        var magnification = $(this).data('magnification-times');
        var cur_width = $(this).width();
        var cur_height = $(this).height();
        $(this).width(cur_width/magnification);

        var window_width = $(window).width();
        var window_height = $(window).height();
        var cur_left = $(this).offset().left;
        var cur_top = $(this).offset().top;
        var new_top = (((cur_top + (cur_height/(2*magnification)))/window_height) * 100).toFixed(2) + "%";
        var new_left = (((cur_left +(cur_width/(2*magnification)))/window_width) * 100).toFixed(2) + "%";
        var styles = {
            top: new_top,
            left: new_left
        };
        $(this).width(cur_width/magnification);
        $( this ).css( styles );
    });
});