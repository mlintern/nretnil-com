function updateframe(){

	var user = $("#fb-user").val();
	
	var url = 'http://graph.facebook.com/' + user;
	
	$("#facebook-frame").attr('src',url);
	
	var newheight = '200px';
		
	console.log(newheight);
	$("#facebook-frame").height(newheight);
}