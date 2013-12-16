$(document).ready(function() {
	
	$('#run').bind('click', function() {
		runCode();
	});

	setTimeout(function(){runCode();},1000)
	
	editor.getSession().on('change', function(e) {
    	runCode();
	});
	
	$('.all-code').bind('click', function() {
		$('.preview-pane').css('width','0%');
		$('.content').css('width','100%');
	});
	
	$('.split').bind('click', function() {
		$('.preview-pane').css('width','60%');
		$('.preview-pane').css('margin-left','40%');
		$('.content').css('width','40%');
	});
	
	$('.all-display').bind('click', function() {
		$('.preview-pane').css('width','100%');
		$('.preview-pane').css('margin-left','0%');
		$('.content').css('width','0%');
	});
	
});

function runCode() {
	window['preview'].document.write(editor.getValue());
	window['preview'].document.close();
}