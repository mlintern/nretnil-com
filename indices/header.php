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
    $logolink     = "http://www.nretnil.com";

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
            $logohtml = "<a href='" . $logolink . "'>" . $logohtml . "</a>";
        }

        $logohtml = "<div class='logohtml'>$logohtml</div>";
    }
?>

<html>
<head>
    <title><?php print $titletext; ?></title>

    <style type="text/css">
    <!--
        <?php print $csstext; ?>
    -->
    </style>

    <script type="text/javascript">
    <!--
        <?php print $jstext; ?>
    -->
    </script>
</head>

<body>
    <div id="pagecontainer">
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
</body>
</html>