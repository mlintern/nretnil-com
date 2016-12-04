<!DOCTYPE html>

<?php
	//=======================================================================
	// A few configuration values.  Change these as you see fit.
	//=======================================================================

	// use_js
	//   If true, does a DHTML thing to cruise the DOM of Apache's
	//   HTML output, injecting useful class names throughout.
	//   This allows for a simple CSS file.
	//     + looks better (directories only bold, no trailing slash on dirs, etc)
	//     + works on IE
	//     - you'll get less styling if you have javascript disabled
	//
	//   If false, uses a more sophisticated CSS (some CSS2 stuff)
	//   to style Apache's output.
	//     + no javascript, which makes it less delicate
	//     - looks a bit worse
	//     - IE6 doesn't do CSS2, so you'll miss out on some styling, in particular
	//       hidden "description" column and "parent directory" row
	$use_js = true;

	// titleformat
	//   How to format the <title> tag.  %DIR is replaced with the directory path.
	// for instance:
	//   $titleformat = "antisleep: %DIR";
	$titleformat = "index of %DIR";

	// logoimageurl, logolink
	//   If these are provided, the provided logo URL will be inserted as an <img> tag
	//   at the top of the directory listing.  If logolink is non-empty, the logo image
	//   will link to the provided URL.
	// for instance:
	//  $logoimageurl = "/images/titlebar-small.gif";
	//  $logolink     = "http://antisleep.com/";
	$logoimageurl = "//dev.nretnil.com/img/sig.png";
	$logolink     = "#";

	//=======================================================================
	// (end of config)
	//=======================================================================

	if ($use_js) {
		$cssfile  = "style-js.css";
		$jstext   = file_get_contents("script.js");
		$pcjstext = "document.getElementById('pagecontainer').style.display = 'none';\n";
	} else {
		$cssfile = "style-nojs.css";
		$jstext  = "";
		$pcjstext = "";
	}
	$csstext = file_get_contents($cssfile);

	$uri = urldecode($_SERVER['REQUEST_URI']);
	$uri = preg_replace("/\/ *$/", "", $uri);
	$uri = preg_replace("/\?.*$/", "", $uri);

	$titletext = str_replace("%DIR", $uri, $titleformat);

	$logohtml = "";
	if ($logoimageurl != "") {
		$logohtml = "<img src='" . $logoimageurl . "' alt=''/>";

		if ($logolink != "") {
			$logohtml = "<a href='" . $logolink . "' onclick='history.go(-1);return false;'>" . $logohtml . "</a>";
		}

		$logohtml = "<div class='logohtml'>$logohtml</div>";
	}
	
	$pathtext = "<div class='path'>$uri</div>";
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta name="host_name" content="http://www.nretnil.com">
<title>Nretnil Tools</title>

<meta name="viewport" content="width=device-width, initial-scale=1">
<link type="text/css" href="//dev.nretnil.com/staging/tools/bootstrap4/css/bootstrap.min.css" rel="stylesheet">
<link type="text/css" href="//dev.nretnil.com/css/style.css" rel="stylesheet">
<link type="text/css" href="//dev.nretnil.com/staging/tools/css/fog/fog.css" rel="stylesheet">
<link type="text/css" href="//dev.nretnil.com/indices/style-js.css" rel="stylesheet">
<link type="text/css" href="//dev.nretnil.com/staging/bluevioletmuleinfluenceplayground/beigedormousemultiplyteeth/fonts/Almost%20Noteworthy/almost_noteworthy/stylesheet.css" rel="stylesheet">
<script type="text/javascript" src="//dev.nretnil.com/indices/script.js"></script>

</head>

<body style="padding-bottom: 50px;" onload="$('table').addClass('table');">

<nav class="navbar navbar-dark bg-danger navbar-fixed-top">
	<a class="navbar-brand text-white pointer" href="/">Nretnil Tools</a>
</nav>

<div class="container">
	<div class="row">
		<div class="page-header">
			<h1 class="text-center">Nretnil Tools</h1>
		</div>
	</div>

	<div class="row">
		<div id="pagecontainer" class="col-md-10 col-md-offset-1">
			<div class='header'>
				<?php print $logohtml; ?>
				<?php print $pathtext; ?>
			</div>
		</div>
	</div>
</div>

</body>
</html>