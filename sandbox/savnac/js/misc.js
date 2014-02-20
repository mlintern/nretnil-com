function writeMessage(message) {
	text.text(message);
	layer.draw();
}
      
var stage = new Kinetic.Stage({
	container: 'canvas-container',
	width: 1000,
	height: 800
});

var layer = new Kinetic.Layer();

var text = new Kinetic.Text({
	x: 10,
	y: 10,
	fontFamily: 'Calibri',
	fontSize: 24,
	text: '',
	fill: 'black'
});

var box = new Kinetic.Rect({
	x: 100,
	y: 40,
	width: 100,
	height: 50,
	fill: '#00D2FF',
	stroke: 'black',
	strokeWidth: 4,
	draggable: true
});

// add cursor styling
box.on('mouseover', function() {
	document.body.style.cursor = 'pointer';
});

box.on('mouseout', function() {
	document.body.style.cursor = 'default';
});

// write out drag and drop events
box.on('dragstart', function() {
	writeMessage('dragstart');
});

box.on('dragend', function() {
	writeMessage('dragend');
});

layer.add(text);
layer.add(box);
stage.add(layer);