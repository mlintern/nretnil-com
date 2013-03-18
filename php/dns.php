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
 
$whois = get_whois($ip);
 
echo $whois;
 
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

/**
    Get the whois content of an ip by selecting the correct server
*/
function get_whois($ip) 
{
    $w = get_whois_from_server('whois.iana.org' , $ip);
     
    preg_match('@whois.[w.]*@si' , $w , $data);
 
    $whois_server = $data[0];
     
    //echo $whois_server;
 
    //now get actual whois data
    $whois_data = get_whois_from_server($whois_server , $ip);
     
    return $whois_data;
}
 
/**
    Get the whois result from a whois server
    return text
*/
function get_whois_from_server($server , $ip) 
{
    $data = '';
     
    #Before connecting lets check whether server alive or not
     
    #Create the socket and connect
    $f = fsockopen($server, 43, $errno, $errstr, 3);    //Open a new connection
    if(!$f)
    {
        return '';
    }
     
    #Set the timeout limit for read
    if(!stream_set_timeout($f , 3))
    {
        die('Unable to set set_timeout');   #Did this solve the problem ?
    }
     
    #Send the IP to the whois server    
    if($f)
    {
        fputs($f, "$iprn");
    }
     
    /*
        Theory : stream_set_timeout must be set after a write and before a read for it to take effect on the read operation
        If it is set before the write then it will have no effect : http://in.php.net/stream_set_timeout
    */
     
    //Set the timeout limit for read
    if(!stream_set_timeout($f , 3))
    {
        die('Unable to stream_set_timeout');    #Did this solve the problem ?
    }
     
    //Set socket in non-blocking mode
    stream_set_blocking ($f, 0 );
     
    //If connection still valid
    if($f) 
    {
        while (!feof($f)) 
        {
            $data .= fread($f , 128);
        }
    }
     
    //Now return the data
    return $data;
} 
?>
