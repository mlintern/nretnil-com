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
$target = $_GET['whois'];
whois($target);
}

if ($_GET['traceroute'] != null){
$target = $_GET['traceroute'];
traceroute($target);
}

function get_dns_ip($hostname){
   $answer = dns_get_record($hostname);
   echo "<pre>";
   foreach ($answer as $value){
      foreach ($value as $set){	
        print_r($set);
        echo " ";
      }
      echo "\n";
   }
   echo "</pre>";
}

function get_dns_hostname($ip){
   $host = gethostbyaddr($ip);
   echo "<pre>$host</pre>";
}

function traceroute($target){
$output = shell_exec("/bin/traceroute $target");
echo "<pre>$output</pre>";
}

function whois($target){
$output = shell_exec("/usr/bin/whois $target");
echo "<pre>$output</pre>";
}
?>
