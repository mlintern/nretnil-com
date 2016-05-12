function generateUUID() {
	$.ajax({
		url: 'https://app.nretnil.com/api/uuid',
		success: function(response) {
			$(".uuid-view").text(response);
		},
		error: function(response) {
			console.log(response);
		}
	});
}

generateUUID();