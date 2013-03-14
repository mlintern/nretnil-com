<?php
//$ip = gethostbyname("marklintern.com");
//$host = gethostbyaddr("69.174.114.71");
//echo "marklintern.com has the IP $ip, which reverses to $host";

$ipaddr = $_GET['ipaddr'];
$hostname = $_GET['hostname'];

function get_dns_ip($hostname){
   $ip = gethostbyname($hostname);
   echo $ip;
   //return($ip);
}

function get_dns_hostname($ipaddr){
   $host = gethostbyaddr($ipaddr);
   echo $host;
   //return($host);
}

//echo get_dns_ip("nretnil.com");
//echo get_dns_hostname("192.81.212.27");
?>
