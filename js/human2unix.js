function timeToHuman()
  {
    var theDate = new Date($("#timeStamp").val() * 1000);
    dateString = theDate.toGMTString();
	$("#u2h-result").val(dateString);
  }
function humanToTime()
  {
    var humDate = new Date(Date.UTC($("#inYear").val(),
          (stripLeadingZeroes($("#inMon").val())-1),
          stripLeadingZeroes($("#inDay").val()),
          stripLeadingZeroes($("#inHr").val()),
          stripLeadingZeroes($("#inMin").val()),
          stripLeadingZeroes($("#inSec").val())));
    $("#h2u-result").val(humDate.getTime()/1000.0);
  }

function stripLeadingZeroes(input)
  {
    if((input.length > 1) && (input.substr(0,1) == "0"))
      return input.substr(1);
    else
      return input;
  }