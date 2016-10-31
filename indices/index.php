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
	<a class="navbar-brand drop-down-toggle text-white pointer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Nretnil Tools</a>
	<div class="dropdown-menu">
		<a class="dropdown-item" target="_blank" href="http://beer.nretnil.com">Beer O'Clock</a>
		<a class="dropdown-item" target="_blank" href="http://sandybox.nretnil.com">HTML SandyBox</a>
		<a class="dropdown-item" target="_blank" href="http://dev.nretnil.com/jsb/index.html">JS Beautify</a>
		<a class="dropdown-item" target="_blank" href="http://dev.nretnil.com/map/index.html">Maps</a>
		<a class="dropdown-item" target="_blank" href="http://dev.nretnil.com/img/sprites/index.html">Sprites</a>
	</div>
	<ul class="nav navbar-nav">
		<li class="nav-item dropdown float-xs-right">
			<a class="nav-link dropdown-toggle pointer text-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Projects</a>
			<div class="dropdown-menu dropdown-menu-right">
				<a class="dropdown-item" target="_blank" href="http://app.nretnil.com">App</a>
				<a class="dropdown-item" target="_blank" href="http://abc.nretnil.com">Boot Straps</a>
				<a class="dropdown-item" target="_blank" href="http://dice.nretnil.com">Dice</a>
				<a class="dropdown-item" target="_blank" href="http://sites.nretnil.com">Mini Site Display</a>
				<a class="dropdown-item" target="_blank" href="http://dev.nretnil.com/sandbox/dyolf/">Floyd</a>
				<a class="dropdown-item" target="_blank" href="http://dev.nretnil.com/sandbox/ydnittiw/">#WittIndy</a>
				<a class="dropdown-item" target="_blank" href="http://dev.nretnil.com/sandbox/llorcs-on/">Zoom In / AutoHide</a>
			</div>
		</li>
	</ul>
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

<a href="javascript:void(0);" onclick="$('#secret-modal').modal('show')" class="secret-button"></a>

<div id="secret-modal" class="modal fade">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Secret Area</h4>
			</div>
			<div class="modal-body">
				<a target="_blank" href="//dev.nretnil.com/staging" class="btn btn-secondary btn-lg btn-block">Staging</a>
				<div style="height: 5px;"></div>  
				<div class="row">
					<div class="col-sm-6">
						<a target="_blank" href="//dev.nretnil.com/staging/bluevioletmuleinfluenceplayground/beigedormousemultiplyteeth" class="btn btn-success btn-block">Fonts</a>
						<a target="_blank" href="//dev.nretnil.com/staging/bluevioletmuleinfluenceplayground/beigedormousemultiplyteeth/font-awesome-4" class="btn btn-info btn-sm btn-block">Font Awesome 4.7.0</a>
						<a target="_blank" href="//dev.nretnil.com/staging/bluevioletmuleinfluenceplayground/beigedormousemultiplyteeth/Fonts.html" class="btn btn-info btn-sm btn-block">Fonts Example</a>
						<a target="_blank" href="//dev.nretnil.com/staging/bluevioletmuleinfluenceplayground/beigedormousemultiplyteeth/fonts/" class="btn btn-info btn-sm btn-block">Font Directories</a>
					</div>
					<div class="col-sm-6">
						<a target="_blank" href="//dev.nretnil.com/staging/tools" class="btn btn-danger btn-block">Tools</a>
						<a target="_blank" href="//dev.nretnil.com/staging/tools/bootstrap3" class="btn btn-warning btn-sm btn-block">Bootstrap 3.3.7</a>
						<a target="_blank" href="//dev.nretnil.com/staging/tools/foundation6" class="btn btn-warning btn-sm btn-block">Foundation 6.2.1</a>
						<a target="_blank" href="//dev.nretnil.com/staging/tools/css" class="btn btn-warning btn-sm btn-block">CSS</a>
						<a target="_blank" href="//dev.nretnil.com/staging/tools/js" class="btn btn-warning btn-sm btn-block">Javascript</a>
						<a target="_blank" href="//dev.nretnil.com/staging/tools/img" class="btn btn-warning btn-sm btn-block">Images</a>
					</div>
				</div>
				<div style="height: 5px;"></div>
				<div class="row">
					<div class="col-sm-6">
						<a target="_blank" href="//dev.nretnil.com/sandbox" class="btn btn-danger btn-block">Sandbox</a>
						<a target="_blank" href="http://dice.nretnil.com" class="btn btn-warning btn-sm btn-block">Dice</a>
						<a target="_blank" href="//dev.nretnil.com/sandbox/dyolf/index.html" class="btn btn-warning btn-sm btn-block">Floyd</a>
						<a target="_blank" href="http://sandybox.nretnil.com" class="btn btn-warning btn-sm btn-block">SandyBox</a>
						<a target="_blank" href="//dev.nretnil.com/sandbox/ydnittiw/index.html" class="btn btn-warning btn-sm btn-block">WittIndy</a>
					</div>
					<div class="col-sm-6">
						<a target="_blank" href="//dev.nretnil.com/avatar/" class="btn btn-secondary btn-block">Avatars</a>
						<a target="_blank" href="//dev.nretnil.com/celebrate/" class="btn btn-secondary btn-block">Celebrate</a>
						<a target="_blank" href="//dev.nretnil.com/gif/" class="btn btn-secondary btn-block">GIF</a>
						<a target="_blank" href="//dev.nretnil.com/logo/" class="btn btn-secondary btn-block">Logos</a>
					</div>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/javascript" src="//dev.nretnil.com/js/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="//dev.nretnil.com/js/secret.js"></script>
<script type="text/javascript" src="//dev.nretnil.com/staging/tools/bootstrap4/js/bootstrap.min.js"></script>
</body>
</html>