function generatecron(){
	
	var min = $("input[name='minutes']:checked").val();
	var hour = $("input[name='hours']:checked").val();
	var day = $("input[name='days']:checked").val();
	var month = $("input[name='months']:checked").val();
	var weekday = $("input[name='weekdays']:checked").val();
	var command = $("input[name='command']").val();
	
	if (min == 'custom'){
		mins = $("select[name='custminutes[]']").val();
		console.log(mins);
		min = mins.join(',');
	}
	if (hour == 'custom'){
		hrs = $("select[name='custhours[]']").val();
		console.log(hrs);
		hour = hrs.join(',');
	}
	if (day == 'custom'){
		days = $("select[name='custdays[]']").val();
		console.log(days);
		day = days.join(',');
	}
	if (month == 'custom'){
		mons = $("select[name='custmonths[]']").val();
		console.log(mons);
		month = mons.join(',');
	}
	if (weekday == 'custom'){
		wds = $("select[name='custweekdays[]']").val();
		console.log(wds);
		weekday = wds.join(',');
	}

	var full = min+" "+hour+" "+day+" "+month+" "+weekday+" "+command;
	
	console.log(full);
	
	$("#cron-code").text(full);
}