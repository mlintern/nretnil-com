function codify_text(){
	var text = $("#code_text").val();

	text = text.replaceAll("<", "&lt;");
	text = text.replaceAll(">", "&gt;");
	if ($('#usebreaks').is(':checked')){
		text = text.replaceAll("\n", "<br> \n");
	}

	var lines = text.split("\n");
	var linecount = lines.length < 20 ? lines.length : 20;

	$('#codified_result').attr('rows', linecount);
	$('#codified_result').text(text);
	$('#codified_result').removeClass('hidden-xs-up');
	$('#codified_result').focus();
  	$('#codified_result').select();
}

/**
 * ReplaceAll by Fagner Brack (MIT Licensed)
 * Replaces all occurrences of a substring in a string
 */
String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
    var _token;
    var str = this + "";
    var i = -1;

    if ( typeof token === "string" ) {
        if ( ignoreCase ) {
            _token = token.toLowerCase();
            while( (
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
            ) {
                str = str.substring( 0, i ) +
                    newToken +
                    str.substring( i + token.length );
            }
        } else {
            return this.split( token ).join( newToken );
        }
    }
return str;
};
