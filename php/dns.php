<?php
//$ip = gethostbyname("marklintern.com");
//$host = gethostbyaddr("69.174.114.71");
//echo "marklintern.com has the IP $ip, which reverses to $host";

function get_dns_ip (hostname){
   $ip = gethostbyname($hostname);
   return($ip)
}

function get_dns_hostname (ipaddr){
   $host = gethostbyaddr($ipaddr);
   return($host)
}

get_dns_ip("nretnil.com");
get_dns_hostname("69.174.114.71");
?>