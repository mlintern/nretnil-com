function generatecron(){
	
	var min = $("input[name='minutes']:checked").val();
	var hour = $("input[name='hours']:checked").val();
	var day = $("input[name='days']:checked").val();
	var month = $("input[name='months']:checked").val();
	var weekday = $("input[name='weekdays']:checked").val();
	var command = $("input[name='command']").val();
	
	if (min == 'custom'){
		mins = $("select[name='custminutes[]']").val();
		min = mins.join(',');
	}
	if (hour == 'custom'){
		hrs = $("select[name='custhours[]']").val();
		hour = hrs.join(',');
	}
	if (day == 'custom'){
		days = $("select[name='custdays[]']").val();
		day = days.join(',');
	}
	if (month == 'custom'){
		mons = $("select[name='custmonths[]']").val();
		month = mons.join(',');
	}
	if (weekday == 'custom'){
		wds = $("select[name='custweekdays[]']").val();
		weekday = wds.join(',');
	}

	var full = min+" "+hour+" "+day+" "+month+" "+weekday+" "+command;
	$("#cron-code").text(full);
	window.alert(full);
}