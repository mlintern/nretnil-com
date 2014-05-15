<?php

if (isset($_GET["url"])) {
    $url = $_GET["url"];
    $xml = simplexml_load_file('http://news.stanford.edu/rss/index.xml');
} else {
    $xml = 'Please send rss url with request!  http://www.this.com/here.php?url=http://www.example.com/rss';
}

?>

<?php print $xml;?>