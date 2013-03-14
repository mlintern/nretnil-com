function updatefacebook(){

	var user = $("#fb-user").val();
	
	var url = 'http://graph.facebook.com/' + user;
	
	console.log(url);

	$.get(url,function(data,status,xhr){
		console.log(data);
		console.log(status);
		console.log(xhr);
		$('#facebook-info').html(data);
	},"html");
}

updatefacebook();