<?php


$text = $_GET["text"];

$reverse_text = strrev($text);

?>

<html>
<head>
<title>Reverse</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
<body>
<?php print $reverse_text; ?>
</body>
</html>