$(document).ready(function() {
	
	$('#run').bind('click', function() {
		runCode();
	});

	setTimeout(function(){$('#run').click();},1000)
	
});

function runCode() {
	window['preview'].document.body.innerHTML = editor.getValue();
}