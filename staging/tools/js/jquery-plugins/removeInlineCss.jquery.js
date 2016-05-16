/*
 * jQuery Remove Inline CSS plugin 1.0.1
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: May 16 2016
 */
jQuery.fn.removeInlineCss = function(property){

  if(property === null)
    return this.removeAttr('style');

  var proporties = property.split(/\s+/);

  return this.each(function(){
    var remover = 
      this.style.removeProperty   // modern browser
      || this.style.removeAttribute   // old browser (ie 6-8)
      || jQuery.noop;  //eventual

    for(var i = 0 ; i < proporties.length ; i++)
      remover.call(this.style,proporties[i]); 

  });
};