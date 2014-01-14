keyone=false;keytwo=false;keythree=false;keyfour=false;keyfive=false;keysix=false;keyseven=false;keyeight=false;
        
$(document).keydown(function(e){
    if ( !keyone && e.keyCode == 37 ) { //Left Arrow
           keyone = true;
    } else if (keyone && !keytwo && e.keyCode == 37) { //Left Arrow
           keytwo = true;
    } else if (keyone && keytwo && !keythree && e.keyCode == 39) { //Right Arrow
           keythree = true;
    } else if (keyone && keytwo && keythree && !keyfour && e.keyCode == 39) { //Right Arrow
           keyfour = true;
    } else if (keyone && keytwo && keythree && keyfour && !keyfive && e.keyCode == 38) { //Up Arrow
           keyfive = true;
    } else if (keyone && keytwo && keythree && keyfour && keyfive && !keysix && e.keyCode == 40) { //Down Arrow
           keysix = true;
    } else if (keyone && keytwo && keythree && keyfour && keyfive && keysix && !keyseven && e.keyCode == 65) { //A Key
           keyseven = true;
    } else if (keyone && keytwo && keythree && keyfour && keyfive && keysix && keyseven && !keyeight && e.keyCode == 66) { //B Key
           keyeight = true;
           $('#secret-modal').modal('show');
           //window.alert('Secret Area');
    } else {
        keyone=false;keytwo=false;keythree=false;keyfour=false;keyfive=false;keysix=false;keyseven=false;keyeight=false;
    }
    //console.log(e.keyCode);
    //console.log(keyone+' '+keytwo+' '+keythree+' '+keyfour+' '+keyfive+' '+keysix+' '+keyseven+' '+keyeight+' ');
});