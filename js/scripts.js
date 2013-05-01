function reverse_text(){
	var text = $("#reverse_text").val();
	
	var url = '/php/reverse.php?text=' + text;
	
	$.get(url, function(data,status,xhr){
		//console.log(data);
		$('#reverse_result').text(data);
	},"html");
}