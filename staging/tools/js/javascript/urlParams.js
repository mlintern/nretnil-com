/*
 * Get and Check Url Parameters 1.0.0
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: August 13 2014
 */

var paramExists = function(p){
  return window.location.href.search("[?&]" + p + "=") != -1;
}

var paramValue = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null){
    return null;
  }else{
    return results[1] || '';
  }
}

var getURLParams = function(){
  var result = {};
  var url = window.location.href
  var searchIndex = url.indexOf("?");
  if (searchIndex == -1 ) { 
    return result; 
  }
  var sPageURL = url.substring(searchIndex +1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    result[sParameterName[0]] = sParameterName[1];
  }
  return result;
}