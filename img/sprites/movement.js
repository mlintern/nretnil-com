$(document).ready(function(){

	var imageCount=44;
	var start=1;
	var speed=500;
	var i = start;
	
	var f = function(){
		//console.log(i);
		if ( i == imageCount ){
			$('.globe').removeClass('globe_img_'+i);
			i = 1;
			$('.globe').addClass('globe_img_'+i);		
		}else{
			$('.globe').removeClass('globe_img_'+(i));
			i++;
			$('.globe').addClass('globe_img_'+i);
		}
	}
	
	var spin = setInterval(f,100);
	
	
});