$(document).ready(function(){

	var imageCount=44;
	var start=1;
	var speed=500;
	var i = start;
	var j = 1;
	
	var f = function(){
		if ( i == imageCount ){
			$('.globe').removeClass('globe_img_'+i);
			i = 1;
			$('.globe').addClass('globe_img_'+i);		
		}else{
			$('.globe').removeClass('globe_img_'+i);
			i++;
			$('.globe').addClass('globe_img_'+i);
		}
	}
	
	var g = function(){
		if ( j == 4 ){
			$('.pistol').removeClass('pistol_img_'+j);
			j = 1;
			$('.pistol').addClass('pistol_img_'+j);		
		}else{
			$('.pistol').removeClass('pistol_img_'+j);
			j++;
			$('.pistol').addClass('pistol_img_'+j);
		}
	}
	
	var spin = setInterval(f,100);
	//var shoot = setInterval(g,150);
	
	
});