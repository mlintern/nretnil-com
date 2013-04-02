<?php


$xml = simplexml_load_file("xml_beginner.xml");
/*
echo $xml->getName() . "\n";

foreach($xml->children() as $child)
  {
  echo $child->getName() . ": " . $child->name . "\n";
  }


include 'example.php';
*/
$data = new SimpleXMLElement($xml);

echo $data->asXML();


/* For each <character> node, we echo a separate <name>. */
/*foreach ($movies->movie->characters->character as $character) {
   echo $character->name, ' played by ', $character->actor, PHP_EOL;
}
*/

?> 
