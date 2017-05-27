var canvasWidth = 600;
var canvasHeight = canvasWidth;
var isMouseDown = false;
var lastLoc = {x:0, y:0};
var color = 'black';

var can = document.getElementById('can');
var cantx = can.getContext('2d');
var btn = document.getElementById('btn1');
var radios = document.getElementsByName('color');

can.width = canvasWidth;
can.height = canvasHeight;

drawGrid();

radios.forEach(function(radio, index){
    var value = radio.value;
    radio.onclick = function(e){
        switch(value){
            case "black":
            {
                color = "black";
                break;
            }
            case "blue":
            {
                color = "blue";
                break;
            }
            case "pink":
            {
                color = "pink";
                break;
            }
            case "red":
            {
                color = "red";
                break;
            }
            case "yellow":
            {
                color = "yellow";
                break;
            }
        }
    }
})




btn.onclick = function(e){
    cantx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawGrid();
}

can.onmousedown = function(e){
    e.preventDefault();
    //console.log("Mouse Down!");
    isMouseDown = true;
    lastLoc = windowToCanvas(e.clientX, e.clientY);
    // console.log(curLoc.x + ',' + curLoc.y);
}


can.onmouseup = function(e){
    e.preventDefault();
    //console.log("Mouse Up!");
    isMouseDown = false;
}


can.onmouseout = function(e){
    e.preventDefault();
    //console.log("Mouse Out!");
    isMouseDown = false;

}


can.onmousemove = function(e){
    e.preventDefault();
    if( isMouseDown ){
        //console.log("Mouse Move!");
        //draw
        var curLoc = windowToCanvas(e.clientX, e.clientY);
        cantx.beginPath()
        cantx.moveTo(lastLoc.x, lastLoc.y);
        cantx.lineTo(curLoc.x, curLoc.y);
        cantx.strokeStyle = color;
        cantx.stroke();

        lastLoc = curLoc;
    }

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

/* 画实线 */
// cantx.moveTo(3, 3);
// cantx.lineTo(canvasWidth-3, canvasWidth-3);

// cantx.moveTo(canvasWidth-3, 3);
// cantx.lineTo(3, canvasWidth-3);

// cantx.moveTo(3, canvasWidth/2);
// cantx.lineTo(canvasWidth-3, canvasWidth/2);

// cantx.moveTo(canvasWidth/2, 3);
// cantx.lineTo(canvasWidth/2, canvasWidth-3);


