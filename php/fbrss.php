<?php

require('lib/facebook.php'); // require your facebook php sdk
include("lib/FeedWriter.php"); // include the feed generator feedwriter file

$fb = new facebook(array(
    'appId' =>  '356195464482194', // get this info from the facebook developers page
    'secret'=>  '8e2b8bc15c0a5e7b0c92255ba90235c2' // by registering an app
));

$facebook_id = $_GET["id"];
$page_name = $_GET["name"];
if ( !empty($facebook_id){
$response = $fb->api("/$facebook_id/feed",'GET'); // replace "spreetable" with your fb page name or username
}else{
$response = $fb->api("/$page_name/feed",'GET'); // replace "spreetable" with your fb page name or username
}
// create the feedwriter object (we're using ATOM but there're other options like rss, etc)
$feed = new FeedWriter(ATOM);

$feed->setTitle("$page_name"); // set your title
$feed->setLink('http://spreetable.com/facebook/feed.php'); // set the url to the feed page you're generating

$feed->setChannelElement('updated', date(DATE_ATOM , time()));
$feed->setChannelElement('author', array('name'=>"$page_name")); // set the author name

// iterate through the facebook response to add items to the feed
foreach($response['data'] as $entry){
        if(isset($entry["message"])){
            $item = $feed->createNewItem();
            $item->setTitle($entry["from"]["name"]);
            $item->setDate($entry["updated_time"]);
            $item->setDescription($entry["message"]);
            if(isset($entry["link"]))
                $item->setLink(htmlentities($entry["link"]));

            $feed->addItem($item);
        }
}

// that's it... don't echo anything else, just call this method
$feed->genarateFeed();

?>