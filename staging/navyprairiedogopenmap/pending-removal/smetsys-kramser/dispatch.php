<?php
$fullPath = $_SERVER['REQUEST_URI'];

$newUrl = "http://www.compendiumblog.com/$fullPath";

/*
$proxy = curl_init($newUrl);
curl_setopt($proxy, CURLOPT_HTTPHEADER, array("X-Compendium-ID: 452d68a0-f919-4479-92ba-38e9b3541970"));
curl_setopt($proxy, CURLOPT_HEADER, TRUE);
//curl_setopt($proxy, CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($proxy, CURLOPT_RETURNTRANSFER, TRUE);
$result = curl_exec($proxy);
curl_close($proxy);

$list = explode("\r\n", $result);
$foundHeader = false;
foreach ($list as $line)
{
	if (!$foundHeader)
	{
		if($line == "")
		{
			$foundHeader = true;
		}
		else if (strpos($line, "Connection:") < 0)
		{
			header($line);
		}
	}
	else
	{
		echo $line;
	}
}
*/


$targetServer = "www.compendiumblog.com";
$fp = fsockopen($targetServer, 80, $errno, $errstr, 30);

$out = "GET $fullPath HTTP/1.0\r\n"
		. "Host: $targetServer\r\n"
		. "X-Compendium-ID: 452d68a0-f919-4479-92ba-38e9b3541970\r\n"
		. "Connection: Close\r\n\r\n";
	$write = fwrite($fp, $out);
	
	$foundHeader = false;
	while (!feof($fp))
	{
		$val = fgets($fp);
		if (!$foundHeader)
		{
			if ($val == "\r\n")
			{
				$foundHeader = true;
			}
			else
			{
				$val = trim($val);
				header($val);
			}
		}
		else
		{
			echo $val;
		}
	}
	
	fclose($fp);
	
?>