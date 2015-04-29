function passphrase_gen() {
	$.ajax({
		url: 'http://app.nretnil.com/api/password/phrase',
		success: function(response) {
			console.log(response);
			$("#passphrase_result").text(response['phonetic']);
			$("#passphrase_result_nospace").text(response['password']);
		},
		error: function(response) {
			console.log(response);
		}
	});
}

passphrase_gen();