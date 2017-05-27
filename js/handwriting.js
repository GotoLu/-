var canvasWidth = 600;
var canvasHeight = canvasWidth;

var can = document.getElementById('can');
var cantx = can.getContext('2d');
can.width = canvasWidth;
can.height = canvasHeight;


cantx.strokeStyle = 'red';
cantx.beginPath();
cantx.moveTo(3, 3);
cantx.lineTo(canvasWidth-3, 3);
cantx.lineTo(canvasWidth-3, canvasWidth-3);
cantx.lineTo(3, canvasWidth-3);
cantx.closePath();

cantx.lineWidth = 6;
cantx.stroke();

cantx.beginPath();
cantx.moveTo(3, 3);
cantx.lineTo(canvasWidth-3, canvasWidth-3);

cantx.moveTo(canvasWidth-3, 3);
cantx.lineTo(3, canvasWidth-3);

cantx.moveTo(3, canvasWidth/2);
cantx.lineTo(canvasWidth-3, canvasWidth/2);

cantx.moveTo(canvasWidth/2, 3);
cantx.lineTo(canvasWidth/2, canvasWidth-3);

cantx.strokeStyle = 'pink'
cantx.lineWidth = 3;
cantx.stroke();

