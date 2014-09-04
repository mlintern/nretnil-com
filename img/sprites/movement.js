$(document).ready(function(){

	var imageCount=44;
	var start=1;
	var speed=500;
	var i = start;
	var j = 1;
	var k = 2;
	
	var f = function spin(){
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
	
	var g = function shoot(){
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
	
	var h = function walk(){
		var	divClass = 'animal_2';
		if ( k == 4 ){
			$('.'+divClass).removeClass(divClass+'_img_'+k);
			k = 1;
			$('.'+divClass).addClass(divClass+'_img_'+k);
		}else{
			$('.'+divClass).removeClass(divClass+'_img_'+k);
			k++;
			$('.'+divClass).addClass(divClass+'_img_'+k);
		}
	}
	
	var spin = setInterval(f,100);
	var shoot = setInterval(g,150);
	var go = setInterval(h,300);
	
	
});