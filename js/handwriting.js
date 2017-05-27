var canvasWidth = 600;
var canvasHeight = canvasWidth;

var can = document.getElementById('can');
var cantx = can.getContext('2d');
can.width = canvasWidth;
can.height = canvasHeight;


drawGrid();


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


