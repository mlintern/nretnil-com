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
echo "Hopefully Coming Soon"
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

?>
