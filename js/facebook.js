function updateframe(){

	var user = $("#fb-user").val();
	
	var url = 'http://graph.facebook.com/' + user;
	
	$("#facebook-frame").attr('src',url);
}

function updatefacebook(){

	var user = $("#fb-user").val();
	
	var url = 'http://graph.facebook.com/' + user;
	
	console.log(url);

	$.get(url,function(data,status,xhr){
		$('#facebook-info').html(data);
		console.log(data);
		console.log(status);
		console.log(xhr);
	},"html");
}