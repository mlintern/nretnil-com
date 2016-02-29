<?php
  $path = realpath(".");
  $images = glob( $path . "/*.gif" );

  $file = array_pop(explode('/',__FILE__));
  $location = 'http://' . $_SERVER['HTTP_HOST'] . str_replace($file, "", $_SERVER['PHP_SELF']);
?>

<!DOCTYPE html>
<html>
<head>
  <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
  <script type="text/javascript" src="http://dev.nretnil.com/staging/tools/js/clipboard.min.js"></script>
  <link type="text/css" href="http://dev.nretnil.com/staging/tools/bootstrap3/css/bootstrap.min.css" rel="stylesheet">
  <style>
    img { width: 100%; }
    .img-box { position: relative; width: 23%; float: left; margin: 1%; }
    .img-hover { position: absolute; width: 100%; height: 0%; background-color: rgba(0, 0, 0, 0.7); top: 0; display: none; text-align: center; }
    .img-box:hover > .img-hover { display: block; height: 100%; }
    .img-hover .copy-btn { margin-top: 15%; }
    .img-hover h4 { color: #fff; margin-top: 20%; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Images</h1>
    <div class="images">
      <?php
      foreach( $images as $image ):
        echo "<div class='img-box'><img src='" . str_replace($path."/", "", $image) . "'><div class='img-hover'><h4>" . str_replace($path."/", "", $image) . "</h4><button class='btn copy-btn btn-lg btn-success' data-clipboard-text='". $location . str_replace($path."/", "", $image) . "''>copy url</button></div></div>";
      endforeach;
      ?>
    </div>
  </div>

  <script>
    new Clipboard('.copy-btn');
  </script>
</body>
</html>