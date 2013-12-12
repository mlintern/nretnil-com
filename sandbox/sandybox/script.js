$(document).ready(function() {
	
	$('#run').bind('click', function() {
		runCode();
	});

	setTimeout(function(){runCode();},1000)
	
	editor.getSession().on('change', function(e) {
    	runCode();
	});
	
});

function runCode() {
	window['preview'].document.body.innerHTML = editor.getValue();
}