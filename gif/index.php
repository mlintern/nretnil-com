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

  function filesize_formatted($path) {
    $size = filesize($path);
    $units = array( 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');
    $power = $size > 0 ? floor(log($size, 1024)) : 0;
    return number_format($size / pow(1024, $power), 2, '.', ',') . ' ' . $units[$power];
  }
?>

<!DOCTYPE html>
<html>
<head>
  <title>Gifs</title>
  <link type="text/css" href="https://dev.nretnil.com/staging/tools/fontstrap/css/fontstrap.min.css" rel="stylesheet">
  <style>
    img { max-width: 100%; }
    .img-hover { position: absolute; height: 0%; left: 15px; right: 15px; background-color: rgba(0, 0, 0, 0.7); top: 0; display: none; }
    .img-box:hover > .img-hover { display: block; height: 100%; }
  </style>
</head>
<body class="bg-dark">
  <div class="container">
    <h1 class="py-3 text-white">Gifs</h1>
    <div class="images row">
      <?php
      foreach( $images as $image ):
        $image_size = getimagesize($image);
        $file_size = filesize_formatted($image);
        $src = str_replace($path."/", "", $image);
        echo "<div class='img-box col-md-6 col-lg-4 col-xl-3 text-center mb-4'>";
        echo "<img src='" . $src . "'>";
        echo "<div class='img-hover'>";
        echo "<div class='filename text-white mt-3'>" . str_replace($path."/", "", $image) . "</div>";
        echo "<div class='text-white mt-2'>" . $image_size[0] . " x " . $image_size[1] . "</div>";
        echo "<div class='text-white mt-2'>" . $file_size . "</div>";
        echo "<div class='mt-3'><button class='btn copy-btn btn-success' data-clipboard-text='". $location . str_replace($path."/", "", $image) . "''>copy url</button></div>";
        echo "<div class='mt-3'><a href='" . $src . "' class='btn copy-btn btn-success' download>download</a></div>";
        echo "</div>";
        echo "</div>";
      endforeach;
      ?>
    </div>
  </div>

  <script type="text/javascript" src="https://dev.nretnil.com/staging/tools/fontstrap/js/jquery.min.js"></script>
  <script type="text/javascript" src="https://dev.nretnil.com/staging/tools/js/clipboard.min.js"></script>
  <script>
    new Clipboard('.copy-btn');
  </script>
</body>
</html>
