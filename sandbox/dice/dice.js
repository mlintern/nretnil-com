var settingsCookie = null;
var SPEED = {ACC:0, HOLD:1, BRAKE: 2};
var customLetters = "";
var die_count = 0
var dice = []
var count = 0

var die = function ( id ) {
  this.id = id;
  this.diceTimer = null;
  this.diceSpeed = 0;
  this.speedMode = SPEED.ACC;
}

die.prototype.roll = function () {
  var self = this;
  if (this.diceTimer) {
    clearTimeout(this.diceTimer);
  }
  var ch = String.fromCharCode(65 + Math.random() * 26);
  if (customLetters.length > 0 && $(".CustomCheck").is(':checked')) {
    ch = customLetters.charAt(Math.random() * customLetters.length);
  }
  $(".Dice[data-die="+this.id+"]").text(ch);
  switch (this.speedMode) {
    case 0:
      this.setDiceSpeed(this.diceSpeed - 25);
      if (this.diceSpeed < 50) {
        this.setDiceSpeed(50);
        this.speedMode = SPEED.HOLD;
      }
      break;
    case 1:
      setTimeout(function(){}, 100);
      break;
    case 2:
      this.setDiceSpeed(this.diceSpeed + 25);
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
  $(".RollHistory").text($(".RollHistory").text() + $(".Dice[data-die="+this.id+"]").text() + " ");
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
  plusOne()
}

function plusOne() {
  var name = new die(die_count);
  dice.push(name);
  $('.Content').append('<div class="DiceBox"><div class="Dice" data-die="'+die_count+'">&nbsp;</div></div>');
  die_count++;
}

function minusOne() {
  dice.pop();
  $('.DiceSection').last().remove();
  die_count--;
}

function go() {
  for ( i=0; i<die_count; i++ ) {
    curr_die = dice[i];
    curr_die.diceTimer = null;
    curr_die.diceSpeed = 0;
    curr_die.speedMode = SPEED.ACC;
    console.log(curr_die);
    curr_die.startRoll();
    curr_die.stopRoll();
    //setTimeout(function(){curr_die.stopRoll()},1000)
  }
}

function clearHistory() {
  $(".RollHistory").html("&nbsp;");
}

function showSetup() {
  $(".Setup").show();
  $(".ShowSetup").hide();
}

function closeSetup() {
  $(".Setup").hide();
  $(".ShowSetup").show();
}

function customChanged() {
  var custom = $(".CustomCheck").checked;
  if (custom) {
    $(".CustomHint").innerHTML = "Roll these letter:";
    $(".CustomLetters").disabled = false;
  }
  else {
    $(".CustomHint").innerHTML = "Roll A...Z";
    $(".CustomLetters").disabled = true;
  }
  changeLetters();
}

function changeLetters() {
  customLetters = $(".CustomLetters").val();
  customLetters = customLetters.replace(/\s/g, "");
  customLetters = customLetters.toUpperCase();
  $(".CustomLetters").value = customLetters;
  saveSettings();
}

function saveSettings() {
  var text = "custom:" + $(".CustomCheck").is(':checked');
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