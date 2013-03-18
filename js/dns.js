$.get('/php/ip.php', function(data,status,xhr){
	console.log(data);
	console.log(status);
	console.log(xhr);
	$('#External-IP').html(data);
},"html");

function iplookup(){
	var ipaddr = $("#ip-info").val();
	
	var url = '/php/dns.php?ipaddr=' + ipaddr;
	
	$.get(url, function(data,status,xhr){
		console.log(data);
		$('#ip-info-div').html(data);
	},"html");
}

function hostnamelookup(){
	var hostname = $("#hostname-info").val();
	
	var url = '/php/dns.php?hostname=' + hostname;
	
	$.get(url, function(data,status,xhr){
		console.log(data);
		$('#hostname-info-div').html(data);
	},"html");
}

function whoislookup(){
	var hostname = $("#whois-info").val();
	
	var url = '/php/dns.php?whois=' + hostname;
	
	$.get(url, function(data,status,xhr){
		console.log(data);
		$('#hostname-info-div').html(data);
	},"html");
}

/*$.ajax({
  type:'GET',
  url: "http://icanhazip.com",
  headers: {"Access-Control-Allow-Origin":"http://icanhazip.com"}
}).done(function(data){
    console.log(data);
    $('#External-IP').html(data);
});*/