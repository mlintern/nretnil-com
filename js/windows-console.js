var browserName=navigator.appName; 
if (browserName=="Microsoft Internet Explorer"){
	window.console = ({log:function(){}});
}