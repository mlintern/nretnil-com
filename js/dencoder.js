function encode() {
	var text = $("#dencoder").val();
	text = encodeURIComponent(text).replace(/'/g,"%27").replace(/"/g,"%22");
	$('#dencoder-result').text(text);
	$('#dencoder-result').focus();
	$('#dencoder-result').select();
}
function decode() {
	var text = $("#dencoder").val();
	text = decodeURIComponent(text.replace(/\+/g,  " "));
	$('#dencoder-result').text(text);
	$('#dencoder-result').focus();
	$('#dencoder-result').select();
}
