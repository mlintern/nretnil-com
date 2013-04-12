<?php
 
$errorcode = $_GET["errorcode"];
$errorcontrol = $_GET["errorcontrol"];
 
switch($errorcode) {
 
case "1" : $strError = "An error has occurred while attempting to save your subscriber information."; break;
case "2" : $strError = "The list provided does not exist."; break;
case "3" : $strError = "Information was not provided for a mandatory field. (".$errorcontrol.")"; break;
case "4" : $strError = "Invalid information was provided. (".$errorcontrol.")"; break;
case "5" : $strError = "Information provided is not unique. (".$errorcontrol.")"; break;
case "6" : $strError = "An error has occurred while attempting to save your subscriber information."; break;
case "7" : $strError = "An error has occurred while attempting to save your subscriber information."; break;
case "8" : $strError = "Subscriber already exists."; break;
case "9" : $strError = "An error has occurred while attempting to save your subscriber information."; break;
case "10" : $strError = "An error has occurred while attempting to save your subscriber information."; break;
case "12" : $strError = "The subscriber you are attempting to insert is on the master unsubscribe list or the global unsubscribe list."; break;
case "13" : $strError = "Check that the list ID and/or MID specified in your code is correct."; break;
case "14" : $strError = "The ET Subscriber key is not enabled."; break;
default : $strError = "Other"; break;
}
 
?>
<HTML><HEAD>
</HEAD>
<BODY>
<?php echo 'Error: ('.$errorcode.') '.$strError; ?>
<div>For More Information: <a href="http://help.exacttarget.com/en/documentation/exacttarget/subscribers/web_collect/">http://help.exacttarget.com/en/documentation/exacttarget/subscribers/web_collect/</a></div>
</BODY>
</HTML>
