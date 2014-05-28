/*
 * jQuery Count Down plugin 1.0.0
 *
 * Mark Lintern
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: May 28 2014
 */
jQuery.fn.countdown = function(settings){

  var options = jQuery.extend({
    until: null,
    noYears: false,
    noDays: false,
    compactLabel: false
  }, settings);

  var year = 31556926;
  var month = year / 12;
  var week = 604800;
  var day =  week / 7;
  var hour =  day / 24;
  var minute =  hour / 60;
  var second =  minute / 60;

  var yearLabel = 'Years';
  var monthLabel = 'Months';
  var weekLabel = 'Weeks';
  var dayLabel = 'Days';
  var hourLabel = 'Hours';
  var minuteLabel = 'Minutes';
  var secondLabel = 'Seconds';

  if (options.compactLabel){
    var yearLabel = 'Yrs';
    var monthLabel = 'Mos';
    var weekLabel = 'Wks';
    var dayLabel = 'Days';
    var hourLabel = 'Hrs';
    var minuteLabel = 'Mins';
    var secondLabel = 'Secs';
  }

  var $self = $(this);

  var updateCountdown = function (endDate) {

    var now = new Date();
    var end_date = endDate;

    var diff = Math.round((end_date - now)/1000); // remove milliseconds and round off
    
    if (diff < 0){ // This fixed past Dates
      diff = 0 - diff;
    }
    
    if (diff > year) {
      var y = Math.floor(diff/year);
      diff = diff-(y*year);
    }

    if (diff > month) {
      var m = Math.floor(diff/month);
      diff = diff-Math.round((m*month));
    }

    if (diff > day) {
      var d = Math.floor(diff/day);
      diff = diff-(d*day);
    }

    if (diff > hour) {
      var h = Math.floor(diff/hour);
      diff = diff-(h*hour);
    }

    if (diff > minute) {
      var mn = Math.floor(diff/minute);
      diff = diff-(mn*minute);
    }

    var div = $("<div>").attr('class','countDownInternal').append(
        $("<div>").attr('class','years timeframe').append($('<h4>').html(yearLabel),$('<div>').attr('class','timeValue').html(y)),
        $("<div>").attr('class','months timeframe').append($('<h4>').html(monthLabel),$('<div>').attr('class','timeValue').html(m)),
        $("<div>").attr('class','days timeframe').append($('<h4>').html(dayLabel),$('<div>').attr('class','timeValue').html(d)),
        $("<div>").attr('class','hours timeframe').append($('<h4>').html(hourLabel),$('<div>').attr('class','timeValue').html(h)),
        $("<div>").attr('class','minutes timeframe').append($('<h4>').html(minuteLabel),$('<div>').attr('class','timeValue').html(mn)),
        $("<div>").attr('class','seconds timeframe').append($('<h4>').html(secondLabel),$('<div>').attr('class','timeValue').html(diff))
      );

    //console.log(y+' '+m+' '+d+' '+h+' '+mn+' '+diff);
    $self.find('.countDownInternal').remove();
    $self.append(div);
  }

  setInterval(function(){updateCountdown(options.until)},1000);

};