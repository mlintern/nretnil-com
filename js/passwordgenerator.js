function displayPassword() {
	$.ajax({
		url: 'http://app.nretnil.com/api/password?length='+$("#Length").val()+'&symbols='+$("#Symbols").is(':checked'),
		success: function(response) {
			$("#outputPassword").text(response['password']);
			$("#outputPassword").focus();
			$("#outputMnemonic").text(response['phonetic']);
		},
		error: function(response) {
			console.log(response);
		}
	});
}

displayPassword();

$(document).ready(function(){
	$('#btnGenerate').click(function(){displayPassword()});
});