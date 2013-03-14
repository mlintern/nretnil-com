$.get('http://icanhazip.com', function(data,status,xhr){
	console.log(data);
	console.log(status);
	console.log(xhr);
	$('#External-IP').html(data);
},"html");