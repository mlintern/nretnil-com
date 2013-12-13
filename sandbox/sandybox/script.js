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
	//window['preview'].document.body.innerHTML = editor.getValue();
	
	window['preview'].document.write(editor.getValue());
	window['preview'].document.close();
	
	/*
	
	$('#preview-pane').find('iframe').remove();
	
	var iframe = document.createElement("iframe");
	iframe.id = "preview";
	iframe.src="about:blank"; //or blank.html
	//iframe.onload = function() {
	  // var domdoc = iframe.contentDocument || iframe.contentWindow.document;
	  // domdoc.body.innerHTML = editor.getValue();    
	//}
	//$.parseHTML(editor.getValue())
	
	console.log($.parseHTML(editor.getValue()));
	
	//iframe.appendChild($.parseHTML(editor.getValue()));
	iframe.contentDocument = $.parseHTML(editor.getValue());
	
	document.getElementById("preview-pane").appendChild(iframe);
	
	*/
}