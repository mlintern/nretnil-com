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

<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta name="host_name" content="http://www.nretnil.com">
<title>Nretnil Tools</title>

<meta name="viewport" content="width=device-width, initial-scale=1">
<link type="text/css" href="http://dev.nretnil.com/staging/tools/bootstrap3/css/bootstrap.min.css" rel="stylesheet">
<link type="text/css" href="http://dev.nretnil.com/css/style.css" rel="stylesheet">
<link type="text/css" href="http://dev.nretnil.com/staging/tools/css/fog/fog.css" rel="stylesheet">
<link type="text/css" href="http://dev.nretnil.com/indices/style-js.css" rel="stylesheet">
<link type="text/css" href="http://dev.nretnil.com/staging/bluevioletmuleinfluenceplayground/beigedormousemultiplyteeth/fonts/Almost%20Noteworthy/almost_noteworthy/stylesheet.css" rel="stylesheet">
<script type="text/javascript" src="http://dev.nretnil.com/indices/script.js"></script>

</head>

<body style="padding-bottom: 50px;" onload="$('table').addClass('table');">
<div class="container">
	<div class="row">
		<div class="page-header">
			<h1 class="text-center">Nretnil Tools</h1>
		</div>
	</div>
	<div class="row">
		<nav id="main-navbar" class="navbar navbar-default navbar-fixed-top r-fog80" role="navigation">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			<a class="navbar-brand" href="/">Tools</a>
			</div>
			
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse navbar-collapse">
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">Sandbox <b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a target="_blank" href="http://dev.nretnil.com/sandbox/ydnittiw/index.html">#WittIndy</a></li>
							<li><a target="_blank" href="http://dev.nretnil.com/sandbox/dyolf/index.html">Floyd</a></li>
							<li><a target="_blank" href="http://dev.nretnil.com/sandbox/trats-hserf/index.html">Boot Straps</a></li>
						</ul>
					</li>
				</ul>
			</div><!-- /.navbar-collapse -->
		</nav>
	</div>
	
	<div class="row">
		<div id="pagecontainer" class="col-md-10 col-md-offset-1">
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

<div id="secret-modal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Secret Area</h4>
			</div>
			<div class="modal-body">
				<a target="_blank" href="http://dev.nretnil.com/staging" class="btn btn-default btn-lg btn-block">Staging</a>
				<div style="height: 5px;"></div>	
				<div class="row">
					<div class="col-sm-6">
						<a target="_blank" href="http://dev.nretnil.com/staging/bluevioletmuleinfluenceplayground/beigedormousemultiplyteeth" class="btn btn-success btn-block">Fonts</a>
						<a target="_blank" href="http://dev.nretnil.com/staging/bluevioletmuleinfluenceplayground/beigedormousemultiplyteeth/font-awesome-4" class="btn btn-info btn-sm btn-block">Font Awesome 4.5.0</a>
						<a target="_blank" href="http://dev.nretnil.com/staging/bluevioletmuleinfluenceplayground/beigedormousemultiplyteeth/Fonts.html" class="btn btn-info btn-sm btn-block">Fonts Example</a>
						<a target="_blank" href="http://dev.nretnil.com/staging/bluevioletmuleinfluenceplayground/beigedormousemultiplyteeth/fonts/" class="btn btn-info btn-sm btn-block">Font Directories</a>
					</div>
					<div class="col-sm-6">
						<a target="_blank" href="http://dev.nretnil.com/staging/tools" class="btn btn-danger btn-block">Tools</a>
						<a target="_blank" href="http://dev.nretnil.com/staging/tools/bootstrap3" class="btn btn-warning btn-sm btn-block">Bootstrap 3.3.5</a>
						<a target="_blank" href="http://dev.nretnil.com/staging/tools/foundation6" class="btn btn-warning btn-sm btn-block">Foundation 6.0.3</a>
						<a target="_blank" href="http://dev.nretnil.com/staging/tools/css" class="btn btn-warning btn-sm btn-block">CSS</a>
						<a target="_blank" href="http://dev.nretnil.com/staging/tools/js" class="btn btn-warning btn-sm btn-block">Javascript</a>
						<a target="_blank" href="http://dev.nretnil.com/staging/tools/img" class="btn btn-warning btn-sm btn-block">Images</a>
					</div>
				</div>
				<div style="height: 5px;"></div>
				<div class="row">
					<div class="col-sm-6">
						<a target="_blank" href="http://dev.nretnil.com/sandbox" class="btn btn-danger btn-block">Sandbox</a>
						<a target="_blank" href="http://dice.nretnil.com" class="btn btn-warning btn-sm btn-block">Dice</a>
						<a target="_blank" href="http://dev.nretnil.com/sandbox/dyolf/index.html" class="btn btn-warning btn-sm btn-block">Floyd</a>
						<a target="_blank" href="http://dev.nretnil.com/sandbox/trats-hserf/index.html" class="btn btn-warning btn-sm btn-block">Fresh Start</a>
						<a target="_blank" href="http://sandybox.nretnil.com" class="btn btn-warning btn-sm btn-block">SandyBox</a>
						<a target="_blank" href="http://dev.nretnil.com/sandbox/ydnittiw/index.html" class="btn btn-warning btn-sm btn-block">WittIndy</a>
					</div>
					<div class="col-sm-6">
						<a target="_blank" href="http://dev.nretnil.com/avatar/" class="btn btn-default btn-block">Avatars</a>
						<a target="_blank" href="http://dev.nretnil.com/logo/" class="btn btn-default btn-block">Logos</a>
					</div>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="http://dev.nretnil.com/js/secret.js"></script>
<script type="text/javascript" src="http://dev.nretnil.com/staging/tools/bootstrap3/js/bootstrap.min.js"></script>
</body>
</html>