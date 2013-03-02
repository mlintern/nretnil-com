function autoResize (id) {
    $(id).height($(id).contents().height());
}

function update_iframe (id) {

	window.alert('Alert');

	var user = $("#fb-user").val();
	
	$(id).attr("src","http://graph.facebook.com/"+user);
	
	autoResize(id);
}