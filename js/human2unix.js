function timeToHuman()
  {
    var theDate = new Date($("#timeStamp").val() * 1000);
    dateString = theDate.toGMTString();
	$("#u2h-result").val(dateString);
  }
function humanToTime()
  {
    var humDate = new Date(Date.UTC($("#inYear").val(),
          (stripZeros($("#inMon").val())-1),
          stripZeros($("#inDay").val()),
          stripZeros($("#inHr").val()),
          stripZeros($("#inMin").val()),
          stripZeros($("#inSec").val())));
    $("#h2u-result").val(humDate.getTime()/1000.0);
  }

function stripZeros(input)
  {
    if((input.length > 1) && (input.substr(0,1) == "0"))
      return input.substr(1);
    else
      return input;
  }