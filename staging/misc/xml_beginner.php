<?php
// The XML file that you wish to be parsed
$file = "xml_beginner.xml";

// This function tells the parser what to do with the data once it reaches the contents
// that appear between tags.
function contents($parser, $data){
	echo $data;
}

// This function tells the parser to place a <b> where it finds a start tag.
function startTag($parser, $data){
	echo "<b>";
}

// And this function tells the parser to replace the end tags with "<b><br />"
function endTag($parser, $data){
	echo "</b><br />";
}

// These lines create the parser and then set the functions for the parser to use when
// reading the document.
$xml_parser = xml_parser_create();

// Sets the functions for start and end tags
xml_set_element_handler($xml_parser, "startTag", "endTag");
// Sets the function for the contents/data
xml_set_character_data_handler($xml_parser, "contents");

// Opens the file for reading
$fp = fopen($file, "r");

// Read the file and save its contents as the variable "data"
$data = fread($fp, 80000);

// This if statement does two things. 1) it parses the document according to our 
// functions created above. 2) If the parse fails for some reason it returns an
// error message and also tells us which line the error occured at.
if(!(xml_parse($xml_parser, $data, feof($fp)))){
	die("Error on line " . xml_get_current_line_number($xml_parser));
}

// Free the memory used to create the parser
xml_parser_free($xml_parser);

// Close the file when you're done reading it
fclose($fp);
?>