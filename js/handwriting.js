var canvasWidth = Math.min(600, $(window).width() - 20);
var canvasHeight = canvasWidth;
var isMouseDown = false;
var lastLoc = {x:0, y:0};
var color = 'black';
var lastTime = 0;
var lastLineWidth = -1;

var can = document.getElementById('can');
var cantx = can.getContext('2d');
var btn = document.getElementById('btn1');
var radios = document.getElementsByName('color');
$("#radioColor").css({"width": canvasWidth + "px"});

can.width = canvasWidth;
can.height = canvasHeight;

drawGrid();

radios.forEach(function(radio, index){
    radio.onclick = function(e){
        color = radio.value;
    }
})




btn.onclick = function(e){
    cantx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawGrid();
}


function startStroke(point){
	isMouseDown = true;
    lastLoc = windowToCanvas(point.x, point.y);
    lastTime = new Date().getTime();
    lastLineWidth = -1;
}

function moveStroke(point){
	var curLoc = windowToCanvas(point.x, point.y);
    var s = calcDist(curLoc, lastLoc);
    var curTime = new Date().getTime();
    var t = curTime - lastTime;

    var lineWidth = calcLineWidth(s, t);
    console.log(lineWidth);


    cantx.beginPath()
    cantx.lineCap = 'round';
    cantx.lineJoin = 'round';
    cantx.lineWidth = lineWidth;
    cantx.moveTo(lastLoc.x, lastLoc.y);
    cantx.lineTo(curLoc.x, curLoc.y);
    cantx.strokeStyle = color;
    cantx.stroke();

    lastLoc = curLoc;
    lastTime = curTime;
    lastLineWidth = lineWidth;
}

function endStroke(){
	isMouseDown = false;
}


can.addEventListener("touchstart", function(e){
	e.preventDefault();
	var touch = e.touches[0];
	startStroke({x: touch.pageX, y: touch.pageY});
})

can.addEventListener("touchmove", function(e){
	e.preventDefault();
	var touch = e.touches[0];
	moveStroke({x: touch.pageX, y: touch.pageY});
})

can.addEventListener("touchmove", function(e){
	e.preventDefault();
	endStroke();
})

can.onmousedown = function(e){
    e.preventDefault();
    //console.log("Mouse Down!");
    startStroke({x: e.clientX, y: e.clientY});
    // console.log(curLoc.x + ',' + curLoc.y);
}


can.onmouseup = function(e){
    e.preventDefault();
    //console.log("Mouse Up!");
    endStroke();
}


can.onmouseout = function(e){
    e.preventDefault();
    //console.log("Mouse Out!");
    endStroke();

}


can.onmousemove = function(e){
    e.preventDefault();
    if( isMouseDown ){
        //console.log("Mouse Move!");
        //draw
        moveStroke({x: e.clientX, y: e.clientY});
    }

}

var maxV = 10;
var minV = 0.1;
var maxLineW = 30;
var minLineW = 1;
var numbers = 4;

function calcLineWidth(s, t){
	var v = s / t;
	console.log("v: " + v);
	var resultLineWidth;
	if(v < minV)
		resultLineWidth = maxLineW;
	else if(v > maxV)
		resultLineWidth = minLineW;
	else
		resultLineWidth = maxLineW - (v - minV) * (maxLineW - minLineW) / (maxV - minV);

	if(lastLineWidth === -1)
		return resultLineWidth;

	resultLineWidth = lastLineWidth * (numbers -1) / numbers + resultLineWidth * 1 / numbers;

	return resultLineWidth;
}

function calcDist(loc1, loc2){
	return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y));
}

function windowToCanvas(x,y){
    var scope = can.getBoundingClientRect();
    return {
        x: x - scope.left,
        y: y - scope.top
    }
}

function drawGrid(){
    drawBorder();
    drawDash();
}

/* 画外框 */
function drawBorder(){
    cantx.strokeStyle = 'red';
    cantx.beginPath();
    cantx.moveTo(3, 3);
    cantx.lineTo(canvasWidth-3, 3);
    cantx.lineTo(canvasWidth-3, canvasWidth-3);
    cantx.lineTo(3, canvasWidth-3);
    cantx.closePath();

    cantx.lineWidth = 6;
    cantx.stroke();
}


/* 画米字虚线 */
function drawDash(){
    cantx.beginPath();

    var n = 20; // 虚线分段个数
    for(var i = 0; i <= n; ++i){
        cantx.moveTo(3 + 2*i*(canvasWidth-6)/(2*n+1), 3 + 2*i*(canvasWidth-6)/(2*n+1));
        cantx.lineTo(3 + (2*i+1)*(canvasWidth-6)/(2*n+1), 3 + (2*i+1)*(canvasWidth-6)/(2*n+1));
    }


    for(var i = 0; i <= n; ++i){
        cantx.moveTo(canvasWidth-3 - 2*i*(canvasWidth-6)/(2*n+1), 3 + 2*i*(canvasWidth-6)/(2*n+1));
        cantx.lineTo(canvasWidth-3 - (2*i+1)*(canvasWidth-6)/(2*n+1), 3 + (2*i+1)*(canvasWidth-6)/(2*n+1));
    }

    for(var i = 0; i <= n; ++i){
        cantx.moveTo(3 + 2*i*(canvasWidth-6)/(2*n+1), canvasWidth/2);
        cantx.lineTo(3 + (2*i+1)*(canvasWidth-6)/(2*n+1), canvasWidth/2);
    }

    for(var i = 0; i <= n; ++i){
        cantx.moveTo(canvasWidth/2, 3 + 2*i*(canvasWidth-6)/(2*n+1));
        cantx.lineTo(canvasWidth/2, 3 + (2*i+1)*(canvasWidth-6)/(2*n+1));
    }

    cantx.strokeStyle = 'pink'
    cantx.lineWidth = 3;
    cantx.stroke();
}



