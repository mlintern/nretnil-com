// isEmail (STRING s [, BOOLEAN emptyOK])
// whitespace characters
var whitespace = " \t\n\r";

// 
// Email address must be of form a@b.c … in other words:
// * there must be at least one character before the @
// * there must be at least one character before and after the .
// * the characters @ and . are both required
function isValidEmail(s)
{   
	if (isEmpty(s)) return false;
   
	// is s whitespace?
	if (isWhitespace(s)) return false;
	    
	// there must be >= 1 character before @, so we
	// start looking at character position 1 
	// (i.e. second character)
	var i = 1;
	var sLength = s.length;

	// look for @
	while ((i < sLength) && (s.charAt(i) != "@"))
	{ i++
	}

	if ((i >= sLength) || (s.charAt(i) != "@")) return false;
	else i += 2;

	// look for .
	while ((i < sLength) && (s.charAt(i) != "."))
	{ i++
	}

	// there must be at least one character after the .
	if ((i >= sLength - 1) || (s.charAt(i) != ".")) return false;
	else return true;
}

// Check whether string s is empty.
function isEmpty(s)
{   
	return ((s == null) || (s.length == 0))
}

// Returns true if string s is empty or 
// whitespace characters only.
function isWhitespace(s)
{   
	var i;

    // Is s empty?
    if (isEmpty(s)) return true;

    // Search through string's characters one by one
    // until we find a non-whitespace character.
    // When we do, return false; if we don't, return true.
    for (i = 0; i < s.length; i++)
    {   
		// Check that current character isn't whitespace.
		var c = s.charAt(i);

		if (whitespace.indexOf(c) == -1) return false;
    }
    // All characters are whitespace.
    return true;
}

function checkForm() { 
	if (!isValidEmail(document.subscribeForm.elements['Email Address'].value)) {
	document.subscribeForm.elements['Email Address'].style.backgroundColor='yellow';
		alert("Please enter a valid Email Address. (name@host.com)");
		document.subscribeForm.elements['Email Address'].focus();
		return false;
	}
}