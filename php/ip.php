<?php
$client_ip = $_SERVER["REMOTE_ADDR"];
?>

<!DOCTYPE HTML>

<html>
<head>
<title>IP</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
<body>
<?php print $client_ip; ?>
</body>
</html>
