function updatefacebook(){

	var user = $("#fb-user").val();
	
	var url = 'http://graph.facebook.com/' + user;
	
	$.get(url,function(data,status,xhr){
		$('#facebook-info').html(data);
	},"html");
}

updatefacebook();