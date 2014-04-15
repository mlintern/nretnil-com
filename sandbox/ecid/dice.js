var settingsCookie = null;
var SPEED = {ACC:0, HOLD:1, BRAKE: 2};
var customLetters = "";
var die_count = 0;
var dice = [];
var count = 0;
var option = "";

var die = function ( id ) {
	this.id = id;
	this.diceTimer = null;
	this.diceSpeed = 0;
	this.speedMode = SPEED.ACC;
	this.locked = false;
}

die.prototype.roll = function () {
  var self = this;
  if (this.diceTimer) {
    clearTimeout(this.diceTimer);
  }
  var ch = customLetters.charAt(Math.random() * customLetters.length);
  if (option == 'dice') {
  	img = '<span class="die die'+ch+'"></span>';
  	$(".Dice[data-die="+this.id+"]").html(img);
  	$(".Dice[data-die="+this.id+"]").data('value',ch);
  } else {
  	$(".Dice[data-die="+this.id+"]").html(ch);
  	$(".Dice[data-die="+this.id+"]").data('value',ch);
  }
  switch (this.speedMode) {
    case 0:
      this.setDiceSpeed(this.diceSpeed - 25);
      if (this.diceSpeed < 50) {
        this.setDiceSpeed(50);
        this.speedMode = SPEED.HOLD;
      }
      break;
    case 1:
      break;
    case 2:
      this.setDiceSpeed(this.diceSpeed + 10);
      if (this.diceSpeed > 300) {
        this.stopRolling(this.diceTimer);
        return;
      }
      break;
  }  
  this.diceTimer = setTimeout(function(){self.roll()}, this.diceSpeed);
}

die.prototype.startRoll = function () {
  this.roll();
}

die.prototype.setDiceSpeed = function (speed) {
  this.diceSpeed = speed;
}

die.prototype.stopRoll = function () {
  this.speedMode = SPEED.BRAKE;
}

die.prototype.stopRolling = function () {
  if (this.diceTimer) {
    clearTimeout(this.diceTimer);
  }      
  this.setDiceSpeed(300);
  this.speedMode = SPEED.HOLD;
  this.diceTimer = null;
  $(".RollHistory").text($(".RollHistory").text() + $(".Dice[data-die="+this.id+"]").data('value') + " ");
}

function setup() {
	orientationChanged();
	settingsCookie = new Cookie("DiceBox");
	if (settingsCookie.get()) {
		try {
			var settings = eval("new Object({" + settingsCookie.get() + "})");
			$(".CustomCheck").checked = settings.custom;
			$(".CustomLetters").value = settings.letters;
		}
		catch (e) {
			debug("LoadingSettings failed: " + e);
		}  
	}
	customChanged();
	moreDice(1);
}

function moreDice(num) {
	for (i=0;i<num;i++) {
		var name = new die(die_count);
		dice.push(name);
		$('.Content').append('<div class="DiceBox"><div class="Dice" data-die="'+die_count+'">&nbsp;</div></div>');
		$('.Dice[data-die='+die_count+']').parent().on('click',function(){
			if ( $(this).hasClass('lock') ) {
				$(this).find('.upper-left').remove();
				$(this).removeClass('lock');
			}else{
				$(this).append('<i class="upper-left fa fa-lock"></i>');
				$(this).addClass('lock');
			}
		});
		die_count++;
	}
}

function lessDice(num) {
	for (i=0;i<num;i++) {
		dice.pop();
		$('.DiceBox').last().remove();
		die_count--;
	}
}

function go() {
	$(".RollHistory").text($(".RollHistory").text() + "- ");
	for ( i=0; i<die_count; i++ ) {
		curr_die = dice[i];
		curr_die.diceTimer = null;
		curr_die.diceSpeed = 0;
		curr_die.speedMode = SPEED.ACC;
		
		if ( !$('.Dice[data-die='+curr_die.id+']').parent().hasClass('lock') ) {
		curr_die.startRoll();		
		curr_die.stopRoll();
		//setTimeout(function(){curr_die.stopRoll()},1000)
		}
	}
}

function clearHistory() {
  $(".RollHistory").html("&nbsp;");
  $(".RollHistory").text($(".RollHistory").text() + "- ");
}

function showSetup() {
  $(".Setup").show();
  $(".settings-open").hide();
}

function closeSetup() {
  $(".Setup").hide();
  $(".settings-open").show();
}

function customChanged() {
	option = $("input:radio[name=DiceType]:checked").val();
	switch (option) {
		case 'dice':
			customLetters = "123456";
			break;
		case 'num':
			customLetters = "0123456789";
			break;
		case 'alpha':
			customLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			break;
		case 'custom':
			customLetters = $(".CustomLetters").val();
			customLetters = customLetters.replace(/\s/g, "");
			customLetters = customLetters.toUpperCase();
			$(".CustomLetters").value = customLetters;
			break;
	} 
	saveSettings();
}

function saveSettings() {
  var text = "option:" + $("input:radio[name=DiceType]:checked").val();
  text += ",letters:'" + $(".CustomLetters").val().replace(/\'/g, "") + "'";
  settingsCookie.store(text);
}

function orientationChanged() {
  if (window.orientation != undefined) {
    landscape = window.orientation != 0 && window.orientation != 180;
  }
  else {
    landscape = window.innerWidth > window.innerHeight;
  }  
  setTimeout(function() {window.scrollTo(0,1)}, 1);
}

function debug(msg) {
  var e = $("Debug");
  e.innerHTML += msg + "<br>";
}