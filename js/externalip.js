$.get('http://icanhazip.com', function(data,status,xhr){
	$('#External-IP').html(data);
	console.log(data);
	console.log(status);
	console.log(xhr);
});