REQUIREMENTS
  I developed Indices for my web server, which runs Apache 2.0.x and
  PHP 5.1.x.  It'll probably require some tweaking to get it working
  with earlier versions of either, but it's doable.


INSTALLATION
  1. Copy this entire directory into your site's directory tree.
     For instance, if your site's files are in /www/mysite.com,
     place this directory in /www/mysite.com/indices.

  2. Edit indices/header.php and change any configuration options.

  3. Copy main-htaccess to your site's directory root, into a file
     named .htaccess.  NOTE: it helps to know what you're doing before
     doing this.  The supplied htaccess file may end up overriding
     some of your site's configuration and causing weird behavior.
     So understand what you're doing here, and merge your existing
     directory config with the contents of main-htaccess.

  4. Try it out!  Browse to a directory that does not contain an index
     file.