function updateframe(){

	var user = $("#fb-user").val();
	
	var url = 'http://graph.facebook.com/' + user;
	
	$("#facebook-frame").attr('src',url);
}

function updatefacebook(){

	var user = $("#fb-user").val();
	
	var url = 'http://graph.facebook.com/' + user;
	
	console.log(url);

	$.get('http://graph.facebook.com/mark.lintern',function(data){
		console.log(data);
	});
}

$.get('http://graph.facebook.com/mark.lintern',function(data){
	console.log(data);
});

updatefacebook();