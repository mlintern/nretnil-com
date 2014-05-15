<?php
if (isset($_GET["url"])) {
    $url = $_GET["url"];
    $xml = simplexml_load_file($url);
    header('Content-type: application/xml');
    header('Access-Control-Allow-Origin: *');
    $xml = $xml->asXML();
} else {
    $xml = 'Please send XML with request!  http://www.this.com/here.php?url=http://www.example.com/rss';
}
?>
<?php print $xml ?>