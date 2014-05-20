var offset = 70;

$('.navbar li a.local').click(function(event) {
    event.preventDefault();
    $($(this).attr('href'))[0].scrollIntoView();
    scrollBy(0, -offset);
});


$(document).ready(function() {
    //POPUP Form Code
    var popupgo = function () {
        var Box = '#floyd';
        
        // Add the mask to body
        $('#mask').show();
        //$('#mask').fadeIn(50);
        
        //Fade in the Popup
        setTimeout(function(){$(Box).fadeIn(150);},400);
        
        return false;
    };
        
    // When clicking on the button close or the mask layer the popup closed
    $('#mask, #floyd').click(function() { 
        $('#mask , #floyd').fadeOut(100 , function() {
            $('#mask').hide();  
        });
    });
    
    $('.go').click(function(){
    	popupgo();
    });
    
});