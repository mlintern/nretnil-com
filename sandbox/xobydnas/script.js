$(document).ready(function() {
	
	$('#run').bind('click', function() {
		runCode();
		$('.preview-pane').css('width','100%');
		$('.preview-pane').css('margin-left','0%');
		$('.content').css('width','0%');
		$('.btn-default').removeClass('btn-warning');
		$('.all-display').addClass('btn-warning');
	});

	setTimeout(function(){runCode();},1000)
	
	editor.getSession().on('change', function(e) {
    	runCode();
	});
	
	$('.all-code').bind('click', function() {
		$('.preview-pane').css('width','0%');
		$('.content').css('width','100%');
		$('.btn-default').removeClass('btn-warning');
		$(this).addClass('btn-warning');
	});
	
	$('.split').bind('click', function() {
		$('.preview-pane').css('width','60%');
		$('.preview-pane').css('margin-left','40%');
		$('.content').css('width','40%');
		$('.btn-default').removeClass('btn-warning');
		$(this).addClass('btn-warning');
	});
	
	$('.all-display').bind('click', function() {
		$('.preview-pane').css('width','100%');
		$('.preview-pane').css('margin-left','0%');
		$('.content').css('width','0%');
		$('.btn-default').removeClass('btn-warning');
		$(this).addClass('btn-warning');
	});
	
	$(".theme-change").submit(function(event){
		event.preventDefault();
	});
	
});

function runCode() {
	window['preview'].document.write(editor.getValue());
	window['preview'].document.close();
}

function themeUpdate() {
	var theme = $("select[name=theme] option:selected").val();
	console.log(theme);
	
	editor.setTheme("ace/theme/"+theme);
	
	return false;
}