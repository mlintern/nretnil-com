function capitalize(s){
	return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};

function passphrase_gen() {
	$.ajax({
		url: 'http://app.nretnil.com/api/password/phrase',
		success: function(response) {
			console.log(response);
			$("#passphrase_result").text(response['phonetic']);
			$("#passphrase_result_nospace").text(response['password']);
			$("#passphrase_result_caps").text(capitalize(response['phonetic']));
		},
		error: function(response) {
			console.log(response);
		}
	});
}

passphrase_gen();