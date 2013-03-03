function updateframe(){

	var user = $("#fb-user").val();
	
	var url = 'http://graph.facebook.com/' + user;
	
	$("#facebook-frame").attr('src',url);
	
	$("#facebook-frame").height($("#facebook-frame").contents().find("html").height());
}