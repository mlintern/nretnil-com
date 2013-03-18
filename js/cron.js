function generatecron(){
	console.log('A');
	
	var min = $("input[name='minutes']").val();
	var hour = $("input[name='hours']").val();
	var day = $("input[name='days']").val();
	var month = $("input[name='months']").val();
	var weekday = $("input[name='weekdays']").val();
	var command = $("input[name='command']").val();

	var full = min+" "+hour+" "+day+" "+month+" "+weekday+" "+command;
	
	console.log(full);
	
	$("#cron-code").text(full);
}