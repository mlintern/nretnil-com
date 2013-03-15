<?php
//$ip = gethostbyname("marklintern.com");
//$host = gethostbyaddr("69.174.114.71");
//echo "marklintern.com has the IP $ip, which reverses to $host";

//$ipaddr = $_GET['ipaddr'];

if ($_GET['hostname'] != null){
$hostname = $_GET['hostname'];
get_dns_ip($hostname);
}

if ($_GET['ipaddr'] != null){
$ipaddr = $_GET['ipaddr'];
get_dns_hostname($ipaddr);
}

function get_dns_ip($hostname){
   //$ip = gethostbyname($hostname);
   //return($ip);
   $ips = gethostbynamel($hostname);
   foreach ($ips as $ip => $value){
      echo $value . "<br>";
   }
}

function get_dns_hostname($ip){
   $host = gethostbyaddr($ip);
   //return($host);
   echo $host;
}
?>
