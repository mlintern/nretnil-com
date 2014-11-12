/*
 * Nintendo Buttons 1.0.0
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: November 6 2014
 *
 * Example: 
 *   var sequence = [up,up,down,down,left,right,left,right,b,a];
 *   var go = function () { $('#secret-modal').modal('show'); }
 *
 *   secret(sequence, go, '.current-btn', '.num')
 */

var up = {code:38,show:'<span class="fa-stack fa-lg"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-arrow-up fa-stack-1x"></i></span>'};
var down = {code:40,show:'<span class="fa-stack fa-lg"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-arrow-down fa-stack-1x"></i></span>'};
var right = {code:39,show:'<span class="fa-stack fa-lg"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-arrow-right fa-stack-1x"></i></span>'};
var left = {code:37,show:'<span class="fa-stack fa-lg"><i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-arrow-left fa-stack-1x"></i></span>'};
var a = {code:65,show:'<span class="fa-stack fa-lg"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-stack-1x"><strong>a</strong></i></span>'};
var b = {code:66,show:'<span class="fa-stack fa-lg"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-stack-1x"><strong>b</strong></i></span>'};
var success = '<span class="fa-stack fa-lg"><i class="fa fa-stack-2x"></i><i class="fa fa-stack-1x fa-thumbs-o-up"></i></span>';

var current = 0;

function ninReset () {
  current = 0;
  $('.nin-current').html( sequence[0].show );
  $('.nin-number').html( 1 );
  $('.nin-completed').html( '' );
}

function ninSecret (sequence,executeFunction,timeout) {

  $('.nin-current').html( sequence[0].show );
  $('.nin-number').html( 1 );
  $('.nin-completed').html( '' );

  $(document).keydown(function(e) {
    if ( e.keyCode == sequence[current].code ) {
      current++;
      if ( current == sequence.length ) {
        $('.nin-current').html( success );
        $('.nin-completed').append( '<div>' + sequence[current - 1].show + '</div>' );
        executeFunction(); 
        setTimeout(function() {
          ninReset();
        },timeout);
      } else {
        $('.nin-current').html( sequence[current].show );
        $('.nin-number').html( current + 1 );
        $('.nin-completed').append( '<div>' + sequence[current - 1].show + '</div>' );
      }
    } else {
      ninReset();
    }
  });

}