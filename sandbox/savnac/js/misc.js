function writeMessage(message) {
	text.text(message);
	layer.draw();
}
      
var stage = new Kinetic.Stage({
	container: 'canvas-container',
	width: 1140,
	height: 400
});

var layer1 = new Kinetic.Layer();
var layer2 = new Kinetic.Layer();

var line1 = new Kinetic.Line({
    points: [400, 0, 400, 500],
    stroke: "black",
    strokeWidth: 10
});
var line2 = new Kinetic.Line({
    points: [600, 0, 600, 500],
    stroke: "black",
    strokeWidth: 10
});
var line3 = new Kinetic.Line({
    points: [200, 125, 800, 125],
    stroke: "black",
    strokeWidth: 10
});
var line4 = new Kinetic.Line({
    points: [200, 275, 800, 275],
    stroke: "black",
    strokeWidth: 10
});

var text = new Kinetic.Text({
	x: 10,
	y: 10,
	fontFamily: 'Calibri',
	fontSize: 24,
	text: '',
	fill: 'black'
});

var red1 = new Kinetic.Rect({
	x: 10,
	y: 10,
	width: 100,
	height:100,
	fill: 'red',
	stroke: 'black',
	strokeWidth: 1,
	draggable: true
});
var red2 = new Kinetic.Rect({
	x: 10,
	y: 10,
	width: 100,
	height:100,
	fill: 'red',
	stroke: 'black',
	strokeWidth: 1,
	draggable: true
});
var red3 = new Kinetic.Rect({
	x: 10,
	y: 10,
	width: 100,
	height:100,
	fill: 'red',
	stroke: 'black',
	strokeWidth: 1,
	draggable: true
});
var red4 = new Kinetic.Rect({
	x: 10,
	y: 10,
	width: 100,
	height:100,
	fill: 'red',
	stroke: 'black',
	strokeWidth: 1,
	draggable: true
});
var red5 = new Kinetic.Rect({
	x: 10,
	y: 10,
	width: 100,
	height:100,
	fill: 'red',
	stroke: 'black',
	strokeWidth: 1,
	draggable: true
});

var blue1 = new Kinetic.Circle({
	x: 1070,
	y: 60,
	radius: 50,
	fill: 'blue',
	stroke: 'black',
	strokeWidth: 2,
	draggable: true
});
var blue2 = new Kinetic.Circle({
	x: 1070,
	y: 60,
	radius: 50,
	fill: 'blue',
	stroke: 'black',
	strokeWidth: 2,
	draggable: true
});
var blue3 = new Kinetic.Circle({
	x: 1070,
	y: 60,
	radius: 50,
	fill: 'blue',
	stroke: 'black',
	strokeWidth: 2,
	draggable: true
});
var blue4 = new Kinetic.Circle({
	x: 1070,
	y: 60,
	radius: 50,
	fill: 'blue',
	stroke: 'black',
	strokeWidth: 2,
	draggable: true
});
var blue5 = new Kinetic.Circle({
	x: 1070,
	y: 60,
	radius: 50,
	fill: 'blue',
	stroke: 'black',
	strokeWidth: 2,
	draggable: true
});

/*
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
*/

layer2.add(text);
layer2.add(red1);
layer2.add(red2);
layer2.add(red3);
layer2.add(red4);
layer2.add(red5);

layer2.add(blue1);
layer2.add(blue2);
layer2.add(blue3);
layer2.add(blue4);
layer2.add(blue5);

layer1.add(line1);
layer1.add(line2);
layer1.add(line3);
layer1.add(line4);

stage.add(layer1);
stage.add(layer2);

document.getElementById('canvas-container').style.background = '#0f0';