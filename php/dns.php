<?php
if ($_GET['hostname'] != null){
$hostname = $_GET['hostname'];
get_dns_ip($hostname);
}

if ($_GET['ipaddr'] != null){
$ipaddr = $_GET['ipaddr'];
get_dns_hostname($ipaddr);
}

if ($_GET['whois'] != null){
$ip = $_GET['whois'];
echo "Hopefully Coming Soon";
}

if ($_GET['traceroute'] != null){
$target = $_GET['traceroute'];
traceroute($target);
}

function get_dns_ip($hostname){
   $answer = dns_get_record($hostname);
   foreach ($answer as $value){
      foreach ($value as $set){	
        print_r($set);
        echo " ";
      }
      echo "<br>";
   }
}

function get_dns_hostname($ip){
   $host = gethostbyaddr($ip);
   echo $host;
}

function traceroute($target){
$output = shell_exec("/usr/sbin/traceroute $target");
echo "<pre>$output</pre>";
}
?>
