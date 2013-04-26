<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>FeedWriter.php at PHP Universal Feed Generator - Free PHP Code</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="Description" content="View FeedWriter.php source code at PHP Universal Feed Generator online." />
        <meta name="keywords" content="php scripts, php projects, php tips, php web hosting, php software, php source, php code" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <script type="text/javascript" src="/media/js/syntaxhighlighter/scripts/shCore.js"></script>
        <script type="text/javascript" src="/media/js/syntaxhighlighter/scripts/shBrushPhp.js"></script>
        <link type="text/css" rel="stylesheet" href="/media/js/syntaxhighlighter/styles/shCore.css"/>
        <link type="text/css" rel="stylesheet" href="/media/js/syntaxhighlighter/styles/shThemeDefault.css"/>
        <script type="text/javascript">
            SyntaxHighlighter.config.clipboardSwf = '/media/js/syntaxhighlighter/scripts/clipboard.swf';
            SyntaxHighlighter.all();
        </script>
        <style type="text/css">
            * {
                margin: 0;
                padding: 0;
            }
            body {
                color: #2e2e2e;
                font-family: Tahoma, Geneva, sans-serif;
                font-size: 14px;
                line-height: 18px;
                background-color: #FFF;
            }
            #wrapper {
                width: 100%;
                margin: 0 auto;
                background-color: #FFF;
            }
            .source_title {
                font-size: 12px;
                text-indent: 5px;
                border-bottom-width: 2px;
                border-bottom-style: solid;
                border-bottom-color: #CCC;
                height: 22px;
                padding-top: 6px;
                padding-right: 2px;
                padding-left: 2px;
                margin-bottom: 4px;
                background-color: #EEE;
            }
            .status {
                font-size: 12px;
                text-indent: 5px;
                border-top-width: 2px;
                border-top-style: solid;
                border-top-color: #CCC;
                height: 22px;
                padding-top: 6px;
                padding-right: 6px;
                padding-left: 2px;
                margin-top: 4px;
                text-align: right;
                background-color: #EEE;
            }
            .title {
                text-transform: capitalize;
            }
            pre {
                margin: 0px;
                padding: 0px;
            }
            .txtads {
                text-align:left;
                float:left;
                background-image: url(/media/images/icon_ad.gif);
                background-repeat: no-repeat;
                background-position: 2px 5px;
                padding-left: 22px;
            }

        </style>
    </head>
    <body>
        <div id="wrapper">
            <div class="source_title"> Location:  <a href="http://www.phpkode.com/" target="_parent">PHPKode</a> &gt; <a href="http://www.phpkode.com/scripts/" target="_parent" class="title">scripts</a> &gt; <a href="http://www.phpkode.com/scripts/item/php-universal-feed-generator/" target="_parent">PHP Universal Feed Generator</a> &gt; FeedWriter.php</div>
            <div style="height: 530px; overflow: auto;position:relative;"><pre class="brush: php; ">&lt;?php
// RSS 0.90  Officially obsoleted by 1.0
// RSS 0.91, 0.92, 0.93 and 0.94  Officially obsoleted by 2.0
// So, define constants for RSS 1.0, RSS 2.0 and ATOM 	

	define(&#39;RSS1&#39;, &#39;RSS 1.0&#39;, true);
	define(&#39;RSS2&#39;, &#39;RSS 2.0&#39;, true);
	define(&#39;ATOM&#39;, &#39;ATOM&#39;, true);

 /**
 * Univarsel Feed Writer class
 *
 * Genarate RSS 1.0, RSS2.0 and ATOM Feed
 *                             
 * @package     UnivarselFeedWriter
 * @author      Anis uddin Ahmad &lt;hide@address.com&gt;
 * @link        http://www.ajaxray.com/projects/rss
 */
 class FeedWriter
 {
	 private $channels      = array();  // Collection of channel elements
	 private $items         = array();  // Collection of items as object of FeedItem class.
	 private $data          = array();  // Store some other version wise data
	 private $CDATAEncoding = array();  // The tag names which have to encoded as CDATA
	 
	 private $version   = null; 
	
	/**
	* Constructor
	* 
	* @param    constant    the version constant (RSS1/RSS2/ATOM).       
	*/ 
	function __construct($version = RSS2)
	{	
		$this-&gt;version = $version;
			
		// Setting default value for assential channel elements
		$this-&gt;channels[&#39;title&#39;]        = $version . &#39; Feed&#39;;
		$this-&gt;channels[&#39;link&#39;]         = &#39;http://www.ajaxray.com/blog&#39;;
				
		//Tag names to encode in CDATA
		$this-&gt;CDATAEncoding = array(&#39;description&#39;, &#39;content:encoded&#39;, &#39;summary&#39;);
	}

	// Start # public functions ---------------------------------------------
	
	/**
	* Set a channel element
	* @access   public
	* @param    srting  name of the channel tag
	* @param    string  content of the channel tag
	* @return   void
	*/
	public function setChannelElement($elementName, $content)
	{
		$this-&gt;channels[$elementName] = $content ;
	}
	
	/**
	* Set multiple channel elements from an array. Array elements 
	* should be &#39;channelName&#39; =&gt; &#39;channelContent&#39; format.
	* 
	* @access   public
	* @param    array   array of channels
	* @return   void
	*/
	public function setChannelElementsFromArray($elementArray)
	{
		if(! is_array($elementArray)) return;
		foreach ($elementArray as $elementName =&gt; $content) 
		{
			$this-&gt;setChannelElement($elementName, $content);
		}
	}
	
	/**
	* Genarate the actual RSS/ATOM file
	* 
	* @access   public
	* @return   void
	*/ 
	public function genarateFeed()
	{
		header(&quot;Content-type: text/xml&quot;);
		
		$this-&gt;printHead();
		$this-&gt;printChannels();
		$this-&gt;printItems();
		$this-&gt;printTale();
	}
	
	/**
	* Create a new FeedItem.
	* 
	* @access   public
	* @return   object  instance of FeedItem class
	*/
	public function createNewItem()
	{
		$Item = new FeedItem($this-&gt;version);
		return $Item;
	}
	
	/**
	* Add a FeedItem to the main class
	* 
	* @access   public
	* @param    object  instance of FeedItem class
	* @return   void
	*/
	public function addItem($feedItem)
	{
		$this-&gt;items[] = $feedItem;    
	}
	
	
	// Wrapper functions -------------------------------------------------------------------
	
	/**
	* Set the &#39;title&#39; channel element
	* 
	* @access   public
	* @param    srting  value of &#39;title&#39; channel tag
	* @return   void
	*/
	public function setTitle($title)
	{
		$this-&gt;setChannelElement(&#39;title&#39;, $title);
	}
	
	/**
	* Set the &#39;description&#39; channel element
	* 
	* @access   public
	* @param    srting  value of &#39;description&#39; channel tag
	* @return   void
	*/
	public function setDescription($desciption)
	{
		$this-&gt;setChannelElement(&#39;description&#39;, $desciption);
	}
	
	/**
	* Set the &#39;link&#39; channel element
	* 
	* @access   public
	* @param    srting  value of &#39;link&#39; channel tag
	* @return   void
	*/
	public function setLink($link)
	{
		$this-&gt;setChannelElement(&#39;link&#39;, $link);
	}
	
	/**
	* Set the &#39;image&#39; channel element
	* 
	* @access   public
	* @param    srting  title of image
	* @param    srting  link url of the imahe
	* @param    srting  path url of the image
	* @return   void
	*/
	public function setImage($title, $link, $url)
	{
		$this-&gt;setChannelElement(&#39;image&#39;, array(&#39;title&#39;=&gt;$title, &#39;link&#39;=&gt;$link, &#39;url&#39;=&gt;$url));
	}
	
	/**
	* Set the &#39;about&#39; channel element. Only for RSS 1.0
	* 
	* @access   public
	* @param    srting  value of &#39;about&#39; channel tag
	* @return   void
	*/
	public function setChannelAbout($url)
	{
		$this-&gt;data[&#39;ChannelAbout&#39;] = $url;    
	}
	
  /**
  * Genarates an UUID
  * @author     Anis uddin Ahmad &lt;hide@address.com&gt;
  * @param      string  an optional prefix
  * @return     string  the formated uuid
  */
  public function uuid($key = null, $prefix = &#39;&#39;) 
  {
	$key = ($key == null)? uniqid(rand()) : $key;
	$chars = md5($key);
	$uuid  = substr($chars,0,8) . &#39;-&#39;;
	$uuid .= substr($chars,8,4) . &#39;-&#39;;
	$uuid .= substr($chars,12,4) . &#39;-&#39;;
	$uuid .= substr($chars,16,4) . &#39;-&#39;;
	$uuid .= substr($chars,20,12);

	return $prefix . $uuid;
  }
	// End # public functions ----------------------------------------------
	
	// Start # private functions ----------------------------------------------
	
	/**
	* Prints the xml and rss namespace
	* 
	* @access   private
	* @return   void
	*/
	private function printHead()
	{
		$out  = &#39;&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;&#39; . &quot;\n&quot;;
		
		if($this-&gt;version == RSS2)
		{
			$out .= &#39;&lt;rss version=&quot;2.0&quot;
					xmlns:content=&quot;http://purl.org/rss/1.0/modules/content/&quot;
					xmlns:wfw=&quot;http://wellformedweb.org/CommentAPI/&quot;
				  &gt;&#39; . PHP_EOL;
		}    
		elseif($this-&gt;version == RSS1)
		{
			$out .= &#39;&lt;rdf:RDF 
					 xmlns:rdf=&quot;http://www.w3.org/1999/02/22-rdf-syntax-ns#&quot;
					 xmlns=&quot;http://purl.org/rss/1.0/&quot;
					 xmlns:dc=&quot;http://purl.org/dc/elements/1.1/&quot;
					&gt;&#39; . PHP_EOL;;
		}
		else if($this-&gt;version == ATOM)
		{
			$out .= &#39;&lt;feed xmlns=&quot;http://www.w3.org/2005/Atom&quot;&gt;&#39; . PHP_EOL;;
		}
		echo $out;
	}
	
	/**
	* Closes the open tags at the end of file
	* 
	* @access   private
	* @return   void
	*/
	private function printTale()
	{
		if($this-&gt;version == RSS2)
		{
			echo &#39;&lt;/channel&gt;&#39; . PHP_EOL . &#39;&lt;/rss&gt;&#39;; 
		}    
		elseif($this-&gt;version == RSS1)
		{
			echo &#39;&lt;/rdf:RDF&gt;&#39;;
		}
		else if($this-&gt;version == ATOM)
		{
			echo &#39;&lt;/feed&gt;&#39;;
		}
	  
	}

	/**
	* Creates a single node as xml format
	* 
	* @access   private
	* @param    srting  name of the tag
	* @param    mixed   tag value as string or array of nested tags in &#39;tagName&#39; =&gt; &#39;tagValue&#39; format
	* @param    array   Attributes(if any) in &#39;attrName&#39; =&gt; &#39;attrValue&#39; format
	* @return   string  formatted xml tag
	*/
	private function makeNode($tagName, $tagContent, $attributes = null)
	{        
		$nodeText = &#39;&#39;;
		$attrText = &#39;&#39;;

		if(is_array($attributes))
		{
			foreach ($attributes as $key =&gt; $value) 
			{
				$attrText .= &quot; $key=\&quot;$value\&quot; &quot;;
			}
		}
		
		if(is_array($tagContent) &amp;&amp; $this-&gt;version == RSS1)
		{
			$attrText = &#39; rdf:parseType=&quot;Resource&quot;&#39;;
		}
		
		
		$attrText .= (in_array($tagName, $this-&gt;CDATAEncoding) &amp;&amp; $this-&gt;version == ATOM)? &#39; type=&quot;html&quot; &#39; : &#39;&#39;;
		$nodeText .= (in_array($tagName, $this-&gt;CDATAEncoding))? &quot;&lt;{$tagName}{$attrText}&gt;&lt;![CDATA[&quot; : &quot;&lt;{$tagName}{$attrText}&gt;&quot;;
		 
		if(is_array($tagContent))
		{ 
			foreach ($tagContent as $key =&gt; $value) 
			{
				$nodeText .= $this-&gt;makeNode($key, $value);
			}
		}
		else
		{
			$nodeText .= (in_array($tagName, $this-&gt;CDATAEncoding))? $tagContent : htmlentities($tagContent);
		}           
			
		$nodeText .= (in_array($tagName, $this-&gt;CDATAEncoding))? &quot;]]&gt;&lt;/$tagName&gt;&quot; : &quot;&lt;/$tagName&gt;&quot;;

		return $nodeText . PHP_EOL;
	}
	
	/**
	* @desc     Print channels
	* @access   private
	* @return   void
	*/
	private function printChannels()
	{
		//Start channel tag
		switch ($this-&gt;version) 
		{
		   case RSS2: 
				echo &#39;&lt;channel&gt;&#39; . PHP_EOL;        
				break;
		   case RSS1: 
				echo (isset($this-&gt;data[&#39;ChannelAbout&#39;]))? &quot;&lt;channel rdf:about=\&quot;{$this-&gt;data[&#39;ChannelAbout&#39;]}\&quot;&gt;&quot; : &quot;&lt;channel rdf:about=\&quot;{$this-&gt;channels[&#39;link&#39;]}\&quot;&gt;&quot;;
				break;
		}
		
		//Print Items of channel
		foreach ($this-&gt;channels as $key =&gt; $value) 
		{
			if($this-&gt;version == ATOM &amp;&amp; $key == &#39;link&#39;) 
			{
				// ATOM prints link element as href attribute
				echo $this-&gt;makeNode($key,&#39;&#39;,array(&#39;href&#39;=&gt;$value));
				//Add the id for ATOM
				echo $this-&gt;makeNode(&#39;id&#39;,$this-&gt;uuid($value,&#39;urn:uuid:&#39;));
			}
			else
			{
				echo $this-&gt;makeNode($key, $value);
			}    
			
		}
		
		//RSS 1.0 have special tag &lt;rdf:Seq&gt; with channel 
		if($this-&gt;version == RSS1)
		{
			echo &quot;&lt;items&gt;&quot; . PHP_EOL . &quot;&lt;rdf:Seq&gt;&quot; . PHP_EOL;
			foreach ($this-&gt;items as $item) 
			{
				$thisItems = $item-&gt;getElements();
				echo &quot;&lt;rdf:li resource=\&quot;{$thisItems[&#39;link&#39;][&#39;content&#39;]}\&quot;/&gt;&quot; . PHP_EOL;
			}
			echo &quot;&lt;/rdf:Seq&gt;&quot; . PHP_EOL . &quot;&lt;/items&gt;&quot; . PHP_EOL . &quot;&lt;/channel&gt;&quot; . PHP_EOL;
		}
	}
	
	/**
	* Prints formatted feed items
	* 
	* @access   private
	* @return   void
	*/
	private function printItems()
	{    
		foreach ($this-&gt;items as $item) 
		{
			$thisItems = $item-&gt;getElements();
			
			//the argument is printed as rdf:about attribute of item in rss 1.0 
			echo $this-&gt;startItem($thisItems[&#39;link&#39;][&#39;content&#39;]);
			
			foreach ($thisItems as $feedItem ) 
			{
				echo $this-&gt;makeNode($feedItem[&#39;name&#39;], $feedItem[&#39;content&#39;], $feedItem[&#39;attributes&#39;]); 
			}
			echo $this-&gt;endItem();
		}
	}
	
	/**
	* Make the starting tag of channels
	* 
	* @access   private
	* @param    srting  The vale of about tag which is used for only RSS 1.0
	* @return   void
	*/
	private function startItem($about = false)
	{
		if($this-&gt;version == RSS2)
		{
			echo &#39;&lt;item&gt;&#39; . PHP_EOL; 
		}    
		elseif($this-&gt;version == RSS1)
		{
			if($about)
			{
				echo &quot;&lt;item rdf:about=\&quot;$about\&quot;&gt;&quot; . PHP_EOL;
			}
			else
			{
				die(&#39;link element is not set .\n It\&#39;s required for RSS 1.0 to be used as about attribute of item&#39;);
			}
		}
		else if($this-&gt;version == ATOM)
		{
			echo &quot;&lt;entry&gt;&quot; . PHP_EOL;
		}    
	}
	
	/**
	* Closes feed item tag
	* 
	* @access   private
	* @return   void
	*/
	private function endItem()
	{
		if($this-&gt;version == RSS2 || $this-&gt;version == RSS1)
		{
			echo &#39;&lt;/item&gt;&#39; . PHP_EOL; 
		}    
		else if($this-&gt;version == ATOM)
		{
			echo &quot;&lt;/entry&gt;&quot; . PHP_EOL;
		}
	}
	

	
	// End # private functions ----------------------------------------------
	
 } // end of class FeedWriter
 
// autoload classes
function __autoload($class_name) 
{
	require_once $class_name . &#39;.php&#39;;
}</pre></div>
            <div class="status"><div class="txtads"><a href="http://phpnewsletter.org/download.html" target="_blank">100% Free PHP Newsletter Script! Download now!</a></div><div style="float:right;">Return current item: <a href="http://www.phpkode.com/scripts/item/php-universal-feed-generator/" target="_parent">PHP Universal Feed Generator</a></div></div>
        </div>
        <script type="text/javascript">
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-18505574-1']);
            _gaq.push(['_setDomainName', '.phpkode.com']);
            _gaq.push(['_trackPageview']);
            (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();
        </script>
    </body>
</html>
