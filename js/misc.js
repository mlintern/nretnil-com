var keyone=false;var keytwo=false;var keythree=false;var keyfour=false;var keyfive=false;var keysix=false;var keyseven=false;var keyeight=false;

// Konami Code
var press_1_one=false;var press_1_two=false;var press_1_three=false;var press_1_four=false;var press_1_five=false;var press_1_six=false;var press_1_seven=false;var press_1_eight=false;var press_1_nine=false;var press_1_ten=false;

$(document).keydown(function(e){
		if ( !press_1_one && e.keyCode == 38 ) { //Up Arrow
			press_1_one = true;
		} else if (press_1_one && !press_1_two && e.keyCode == 38) { //Up Arrow
			press_1_two = true;
		} else if (press_1_one && press_1_two && !press_1_three && e.keyCode == 40) { //Down Arrow
			press_1_three = true;
		} else if (press_1_one && press_1_two && press_1_three && !press_1_four && e.keyCode == 40) { //Down Arrow
			press_1_four = true;
		} else if (press_1_one && press_1_two && press_1_three && press_1_four && !press_1_five && e.keyCode == 37) { //Left Arrow
			press_1_five = true;
		} else if (press_1_one && press_1_two && press_1_three && press_1_four && press_1_five && !press_1_six && e.keyCode == 39) { //Right Arrow
			press_1_six = true;
		} else if (press_1_one && press_1_two && press_1_three && press_1_four && press_1_five && press_1_six && !press_1_seven && e.keyCode == 37) { //Left Arrow
			press_1_seven = true;
		} else if (press_1_one && press_1_two && press_1_three && press_1_four && press_1_five && press_1_six && press_1_seven && !press_1_eight && e.keyCode == 39) { //Right Arrow
			press_1_eight = true;
		} else if (press_1_one && press_1_two && press_1_three && press_1_four && press_1_five && press_1_six && press_1_seven && press_1_eight && !press_1_nine && e.keyCode == 66) { //B Key
			press_1_nine = true;
		} else if (press_1_one && press_1_two && press_1_three && press_1_four && press_1_five && press_1_six && press_1_seven && press_1_eight && press_1_nine && !press_1_ten && e.keyCode == 65) { //A Key
			 press_1_ten = true;
			 $('#secret-modal').modal('show');
			 //console.log('code2: ' + press_1_one+' '+press_1_two+' '+press_1_three+' '+press_1_four+' '+press_1_five+' '+press_1_six+' '+press_1_seven+' '+press_1_eight+' '+press_1_nine+' '+press_1_ten);
			 press_1_one=false;press_1_two=false;press_1_three=false;press_1_four=false;press_1_five=false;press_1_six=false;press_1_seven=false;press_1_eight=false;press_1_nine=false;press_1_ten=false;
		} else {
				press_1_one=false;press_1_two=false;press_1_three=false;press_1_four=false;press_1_five=false;press_1_six=false;press_1_seven=false;press_1_eight=false;press_1_nine=false;press_1_ten=false;
		}
		//console.log(e.press_1_Code);
		//console.log('code2: ' + press_1_one+' '+press_1_two+' '+press_1_three+' '+press_1_four+' '+press_1_five+' '+press_1_six+' '+press_1_seven+' '+press_1_eight+' '+press_1_nine+' '+press_1_ten);
});

$(document).ready(function () {
	SIZES = ['','btn-lg','btn-xl','btn-xxl','btn-sm','','btn-lg','btn-xl','','btn-lg','btn-xl','btn-xxl','btn-lg','btn-xxxl'];
	COLORS = ['btn-danger','btn-success','btn-primary','btn-info','btn-warning','btn-success','btn-secondary','btn-primary','btn-info','btn-warning'];
	$('.tools .btn').each(function( index, value ) {
		$(this).addClass(SIZES[Math.floor(Math.random() * SIZES.length)]);
		$(this).addClass(COLORS[Math.floor(Math.random() * COLORS.length)]);
	});
});