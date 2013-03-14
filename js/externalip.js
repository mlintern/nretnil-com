$.get('/php/ip.php', function(data,status,xhr){
	console.log(data);
	console.log(status);
	console.log(xhr);
	$('#External-IP').html(data);
},"html");

/*$.ajax({
  type:'GET',
  url: "http://icanhazip.com",
  headers: {"Access-Control-Allow-Origin":"http://icanhazip.com"}
}).done(function(data){
    console.log(data);
    $('#External-IP').html(data);
});*/