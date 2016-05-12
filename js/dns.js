$.get('https://ip.nretnil.com', function(data,status,xhr){
	$('#External-IP').html(data);
},"html");

function iplookup(){
	var ipaddr = $("#ip-info").val();
	var url = '/php/dns.php?ipaddr=' + ipaddr;
	
	$.get(url, function(data,status,xhr){
		$('#ip-info-div').html(data);
	},"html");
}

function hostnamelookup(){
	var hostname = $("#hostname-info").val();
	var url = '/php/dns.php?hostname=' + hostname;
	
	$.get(url, function(data,status,xhr){
		$('#hostname-info-div').html(data);
	},"html");
}

function whoislookup(){
	var target = $("#whois-info").val();
	var url = '/php/dns.php?whois=' + target;
	
	$.get(url, function(data,status,xhr){
		$('#whois-info-div').html(data);
	},"html");
}

function traceroute(){
	$('#tr-btn').button('loading');
	var target = $("#traceroute-info").val();
	var url = '/php/dns.php?traceroute=' + target;
	
	$.get(url, function(data,status,xhr){
		$('#traceroute-info-div').html(data);
		$('#tr-btn').button('reset');
	},"html");
}