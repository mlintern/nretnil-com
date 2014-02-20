/* Tic Tac Toe */

function reset () {
	var stage = new Kinetic.Stage({
		container: 'canvas-container',
		width: 1140,
		height: 400
	});
	
	var layer1 = new Kinetic.Layer();
	var layer2 = new Kinetic.Layer();
	
	var line1 = new Kinetic.Line({
	    points: [450, 0, 450, 500],
	    stroke: "black",
	    strokeWidth: 10
	});
	var line2 = new Kinetic.Line({
	    points: [650, 0, 650, 500],
	    stroke: "black",
	    strokeWidth: 10
	});
	var line3 = new Kinetic.Line({
	    points: [250, 125, 850, 125],
	    stroke: "black",
	    strokeWidth: 10
	});
	var line4 = new Kinetic.Line({
	    points: [250, 275, 850, 275],
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
		y: 20,
		width: 100,
		height:100,
		fill: 'red',
		stroke: 'black',
		strokeWidth: 1,
		draggable: true
	});
	var red3 = new Kinetic.Rect({
		x: 10,
		y: 30,
		width: 100,
		height:100,
		fill: 'red',
		stroke: 'black',
		strokeWidth: 1,
		draggable: true
	});
	var red4 = new Kinetic.Rect({
		x: 10,
		y: 40,
		width: 100,
		height:100,
		fill: 'red',
		stroke: 'black',
		strokeWidth: 1,
		draggable: true
	});
	var red5 = new Kinetic.Rect({
		x: 10,
		y: 50,
		width: 100,
		height:100,
		fill: 'red',
		stroke: 'black',
		strokeWidth: 1,
		draggable: true
	});
	var red6 = new Kinetic.Rect({
		x: 10,
		y: 60,
		width: 100,
		height:100,
		fill: 'red',
		stroke: 'black',
		strokeWidth: 1,
		draggable: true
	});
	var red7 = new Kinetic.Rect({
		x: 10,
		y: 70,
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
		y: 70,
		radius: 50,
		fill: 'blue',
		stroke: 'black',
		strokeWidth: 2,
		draggable: true
	});
	var blue3 = new Kinetic.Circle({
		x: 1070,
		y: 80,
		radius: 50,
		fill: 'blue',
		stroke: 'black',
		strokeWidth: 2,
		draggable: true
	});
	var blue4 = new Kinetic.Circle({
		x: 1070,
		y: 90,
		radius: 50,
		fill: 'blue',
		stroke: 'black',
		strokeWidth: 2,
		draggable: true
	});
	var blue5 = new Kinetic.Circle({
		x: 1070,
		y: 100,
		radius: 50,
		fill: 'blue',
		stroke: 'black',
		strokeWidth: 2,
		draggable: true
	});
	var blue6 = new Kinetic.Circle({
		x: 1070,
		y: 110,
		radius: 50,
		fill: 'blue',
		stroke: 'black',
		strokeWidth: 2,
		draggable: true
	});
	var blue7 = new Kinetic.Circle({
		x: 1070,
		y: 120,
		radius: 50,
		fill: 'blue',
		stroke: 'black',
		strokeWidth: 2,
		draggable: true
	});
	
	layer2.add(text);
	layer2.add(red1);
	layer2.add(red2);
	layer2.add(red3);
	layer2.add(red4);
	layer2.add(red5);
	layer2.add(red6);
	layer2.add(red7);
	
	layer2.add(blue1);
	layer2.add(blue2);
	layer2.add(blue3);
	layer2.add(blue4);
	layer2.add(blue5);
	layer2.add(blue6);
	layer2.add(blue7);
	
	layer1.add(line1);
	layer1.add(line2);
	layer1.add(line3);
	layer1.add(line4);
	
	stage.add(layer1);
	stage.add(layer2);
	
	document.getElementById('canvas-container').style.background = '#fff';
}

reset();


/* Draw Something */
var canvas, ctx, 
	flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black",
    y = 5;

function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function color(obj) {
    switch (obj.id) {
        case "green":
            x = "green";
            break;
        case "blue":
            x = "blue";
            break;
        case "red":
            x = "red";
            break;
        case "yellow":
            x = "yellow";
            break;
        case "orange":
            x = "orange";
            break;
        case "black":
            x = "black";
            break;
        case "white":
            x = "white";
            break;
    }
    if (x == "white") y = 14;
    else y = 5;

}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

init();