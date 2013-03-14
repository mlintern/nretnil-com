<?php

$headers = apache_request_headers(); 
$real_client_ip = $headers["X-Forwarded-For"];
return $real_client_ip;

?>

<!DOCTYPE HTML>

<html>
<head>
<title>IP</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
<body>
<?php print $real_client_ip; ?>
</body>
</html>