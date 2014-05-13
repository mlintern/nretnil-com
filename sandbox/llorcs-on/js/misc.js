jQuery.fn.removeInlineCss = function(property){

    if(property == null)
        return this.removeAttr('style');

    var proporties = property.split(/\s+/);

    return this.each(function(){
        var remover = 
            this.style.removeProperty   // modern browser
            || this.style.removeAttribute   // old browser (ie 6-8)
            || jQuery.noop;  //eventual

        for(var i = 0 ; i < proporties.length ; i++)
            remover.call(this.style,proporties[i]); 

    });
};


$(document).ready(function() {
    $(".item").hover(function(){
        var magnification = $(this).data('magnification-times');
        var cur_width = parseInt($(this).width());
        var cur_height = parseInt($(this).height());
        var window_width = parseInt($(window).width());
        var window_height = parseInt($(window).height());
        var cur_left = parseInt($(this).css("left"));
        var cur_top = parseInt($(this).css("top"));
        var factor = .75; // Figure out how to calculate the factor
        var new_top = ( ((cur_top/window_height)*100) * factor ) + "%";
        var new_left = ( ((cur_left/window_width)*100) * factor )+ "%";
        var styles = {
            top: new_top,
            left: new_left,
            width: (cur_width*magnification)
        };
        $(this).css( styles );
    },function(){
        $(this).removeInlineCss();
    });
});