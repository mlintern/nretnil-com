function getEvents(map) {

	var url = 'http://api.nytimes.com/svc/events/v2/listings.json'
	var key = 'ca4c9f9366bec636a98ef71d8b8e6df7:19:69565207'
	var radius = '1000'
	var latlng = '40.7127,-74.0059'
	var ne = ''
	var sw = ''
	//var request = url + 'll=' + latlng + '&radius=' + radius +'&api-key=' + key
	//console.log(request)

	$.ajax({
		type: 'GET',
		url: url,
		data: { 'll':latlng, 'radius':radius,'api-key':key },
		dataType: 'json',
		success: function (data){
			console.log('here');
			console.log(data['results']);
		}
	});

	resetMarkers(map, siteMarkers);
}

function initializeMap() {
	var mapOptions = {
		zoom: 11,
		//center: new google.maps.LatLng(-33.9, 151.2)
		center: new google.maps.LatLng(40.71, -74.00)
	}
	var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
	google.maps.event.addListener(map, 'dragend', function() {
			//alert('map dragged'); 
			getEvents(map);
		}
	);
	getEvents(map);
}

/**
* Data for the markers
* [name,lat,lng,zindex,description]
*/

//var markers = getEvents();

var siteMarkers = [
	['Bondi Beach', -33.890542, 151.274856, 4,'Sed viverra augue tellus nulla sollicitudin scelerisque, scelerisque rutrum mauris pharetra tempor donec arcu, ante nunc ipsum donec nec dis vitae, ipsum tempor. Vel volutpat, sed vel imperdiet, vehicula auctor purus in, eu non tempor amet euismod ligula dictumst, massa orci posuere cras varius suscipit ac. Erat dui. Vitae purus suspendisse facilisi vivamus, ligula placerat pede lorem amet, sociosqu mauris, hendrerit mollis nulla in, sed at ante imperdiet. Nulla nonummy, purus pede at id sem morbi, pariatur aliquet massa donec suspendisse mi, integer malesuada velit aenean.'],
	['Coogee Beach', -33.923036, 151.259052, 5,'Sed viverra augue tellus nulla sollicitudin scelerisque, scelerisque rutrum mauris pharetra tempor donec arcu, ante nunc ipsum donec nec dis vitae, ipsum tempor. Vel volutpat, sed vel imperdiet, vehicula auctor purus in, eu non tempor amet euismod ligula dictumst, massa orci posuere cras varius suscipit ac. Erat dui. Vitae purus suspendisse facilisi vivamus, ligula placerat pede lorem amet, sociosqu mauris, hendrerit mollis nulla in, sed at ante imperdiet. Nulla nonummy, purus pede at id sem morbi, pariatur aliquet massa donec suspendisse mi, integer malesuada velit aenean.'],
	['Cronulla Beach', -34.028249, 151.157507, 3,'Sed viverra augue tellus nulla sollicitudin scelerisque, scelerisque rutrum mauris pharetra tempor donec arcu, ante nunc ipsum donec nec dis vitae, ipsum tempor. Vel volutpat, sed vel imperdiet, vehicula auctor purus in, eu non tempor amet euismod ligula dictumst, massa orci posuere cras varius suscipit ac. Erat dui. Vitae purus suspendisse facilisi vivamus, ligula placerat pede lorem amet, sociosqu mauris, hendrerit mollis nulla in, sed at ante imperdiet. Nulla nonummy, purus pede at id sem morbi, pariatur aliquet massa donec suspendisse mi, integer malesuada velit aenean.'],
	['Manly Beach', -33.80010128657071, 151.28747820854187, 2,'Sed viverra augue tellus nulla sollicitudin scelerisque, scelerisque rutrum mauris pharetra tempor donec arcu, ante nunc ipsum donec nec dis vitae, ipsum tempor. Vel volutpat, sed vel imperdiet, vehicula auctor purus in, eu non tempor amet euismod ligula dictumst, massa orci posuere cras varius suscipit ac. Erat dui. Vitae purus suspendisse facilisi vivamus, ligula placerat pede lorem amet, sociosqu mauris, hendrerit mollis nulla in, sed at ante imperdiet. Nulla nonummy, purus pede at id sem morbi, pariatur aliquet massa donec suspendisse mi, integer malesuada velit aenean.'],
	['Maroubra Beach', -33.950198, 151.259302, 1,'Sed viverra augue tellus nulla sollicitudin scelerisque, scelerisque rutrum mauris pharetra tempor donec arcu, ante nunc ipsum donec nec dis vitae, ipsum tempor. Vel volutpat, sed vel imperdiet, vehicula auctor purus in, eu non tempor amet euismod ligula dictumst, massa orci posuere cras varius suscipit ac. Erat dui. Vitae purus suspendisse facilisi vivamus, ligula placerat pede lorem amet, sociosqu mauris, hendrerit mollis nulla in, sed at ante imperdiet. Nulla nonummy, purus pede at id sem morbi, pariatur aliquet massa donec suspendisse mi, integer malesuada velit aenean.']
];

function resetMarkers(map, locations) {
	// Add markers to the map
	var image = {
	url: 'img/beachflag.png',
	size: new google.maps.Size(31, 31),
	origin: new google.maps.Point(0,0),
	anchor: new google.maps.Point(0, 31)
	};
	// Shapes define the clickable region of the icon.
	var shape = {
	coords: [1, 1, 1, 19, 20, 19, 20 , 1],
	type: 'poly'
	};

	var infoWindow = new google.maps.InfoWindow({content: '',maxWidth: '400'});

	for (var i = 0; i < locations.length; i++) {
		var location = locations[i];
		var myLatLng = new google.maps.LatLng(location[1], location[2]);
		var marker = new google.maps.Marker({
			position: myLatLng,
			clickable: true,
			map: map,
			icon: image,
			shape: shape,
			title: location[0],
			zIndex: location[3]
		});
		marker.text = '<div><h1>'+location[0]+'</h1><div>'+location[4]+'</div></div>'
		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.content = this.text;
			infoWindow.open(this.getMap(),this)
		});
	}
}

google.maps.event.addDomListener(window, 'load', initializeMap);


