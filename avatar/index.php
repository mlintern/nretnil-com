<?php
  $path = realpath(".");
  //get the list of all files with .jpg extension in the directory and safe it in an array named $images
  $jpgs = glob( $path . "/*.jpg" );
  //get the list of all files with .png extension in the directory and safe it in an array named $images
  $pngs = glob( $path . "/*.png");
  //get the list of all files with .gif extension in the directory and safe it in an array named $images
  $gifs = glob( $path . "/*.gif");

  $images = array_merge( $jpgs,$pngs,$gifs);
  sort($images);

  $file_path = explode('/',__FILE__);
  $file = array_pop($file_path);
  $location = 'http://' . $_SERVER['HTTP_HOST'] . str_replace($file, "", $_SERVER['PHP_SELF']);
?>

<!DOCTYPE html>
<html>
<head>
  <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
  <script type="text/javascript" src="https://dev.nretnil.com/staging/tools/js/clipboard.min.js"></script>
  <link type="text/css" href="https://dev.nretnil.com/staging/tools/bootstrap3/css/bootstrap.min.css" rel="stylesheet">
  <style>
    img { width: 100%; }
    .img-box { position: relative; width: 23%; float: left; margin: 1%; }
    .img-hover { position: absolute; width: 100%; height: 0%; background-color: rgba(0, 0, 0, 0.7); top: 0; display: none; text-align: center; }
    .img-box:hover > .img-hover { display: block; height: 100%; }
    .img-hover .copy-btn { margin-top: 10%; }
    .img-hover h4 { color: #fff; }
    .img-hover .filename { margin-top: 15%; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Images</h1>
    <div class="images">
      <?php
      foreach( $images as $image ):
        $image_size = getimagesize($image);
        $src = str_replace($path."/", "", $image);
        echo "<div class='img-box'><img src='" . $src . "'><div class='img-hover'><h4 class='filename'>" . str_replace($path."/", "", $image) . "</h4><h4>" . $image_size[0] . " x " . $image_size[1] . "</h4><button class='btn copy-btn btn-success' data-clipboard-text='". $location . str_replace($path."/", "", $image) . "''>copy url</button><div><a href='" . $src . "' class='btn copy-btn btn-success' download>download</a></div></div></div>";
      endforeach;
      ?>
    </div>
  </div>

  <script>
    new Clipboard('.copy-btn');
  </script>
</body>
</html>