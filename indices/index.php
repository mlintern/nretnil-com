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
    $logoimageurl = "http://dev.nretnil.com/img/sig.png";
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

<html>
<head>
    <title><?php print $titletext; ?></title>
    
	<link rel="shortcut icon" href="http://www.nretnil.com/favicon.ico" />

    <link type="text/css" href="http://dev.nretnil.com/css/bootstrap.css" rel="stylesheet">
	<link type="text/css" href="http://dev.nretnil.com/css/responsive.css" rel="stylesheet">
	
    <link type="text/css" href="http://dev.nretnil.com/indices/style-js.css" rel="stylesheet">
	<script type="text/javascript" src="http://dev.nretnil.com/indices/script.js"></script>

</head>

<body>

<div class="container">

<div class="row-fluid">
	<div class="span12 page-header">
		<h1 class="text-center">Nretnil Tools</h1>
	</div>
</div>

<div class="row-fluid">
	<div class="navbar span12">
		<div class="navbar-inner">
			<a class="brand" href="/">Tools</a>
			<ul class="nav">
				<li class="divider-vertical"></li>
				<li><a href="http://www.nretnil.com/map/index.html">Maps</a></li>
				<li class="divider-vertical"></li>
				<li><a href="http://www.nretnil.com/jsb/index.html">JS Beautify</a></li>
				<li class="divider-vertical"></li>
				<li><a href="http://dev.nretnil.com/staging">Staging</a></li>
				<li class="divider-vertical"></li>
				<li><a href="http://beer.nretnil.com">Beer O'Clock</a></li>
				<li class="divider-vertical"></li>
				<li><a href="http://dev.nretnil.com/img/sprites/index.html">Sprites</a></li>
				<li class="divider-vertical"></li>
			</ul>
		</div>
	</div>
</div>
<div class="row-fluid">
	<div id="pagecontainer" class="span10 offset1">
	    <script>
	    <!--
	    <?php print $pcjstext; ?>
	    -->
	    </script>
	
	    <div class='header'>
	        <?php print $logohtml; ?>
	        <?php print $pathtext; ?>
	    </div>
	</div>
</div>
	
</div>
<script type="text/javascript" src="http://dev.nretnil.com/js/bootstrap.js"></script>
</body>
</html>