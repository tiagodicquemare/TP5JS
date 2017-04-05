

window.addEventListener("load",function(){
	context = document.getElementById('myCanvas').getContext("2d");
	div = document.getElementById('CanvasBox');
	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

	
document.addEventListener("mousedown", function(e){
  var mouseX = e.pageX - div.offsetLeft;
  var mouseY = e.pageY - div.offsetTop;
  paint = true;
  addClick(e.pageX - div.offsetLeft, e.pageY - div.offsetTop, false);
  redraw();
});

document.addEventListener("mousemove", function(e){
 if(paint){
    addClick(e.pageX - div.offsetLeft, e.pageY - div.offsetTop, true);
    redraw();
  }
});

document.addEventListener("mouseup", function(e){
	paint = false;
});

document.addEventListener("mouseleave", function(e){
	paint = false;
});

document.getElementById("clearCanvas").addEventListener("click", clear);
function clear(){
	window.location.replace(window.location.pathname + window.location.search + window.location.hash);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.strokeStyle = "#000000";
  context.lineJoin = "round";
  context.lineWidth = 5;
			
  for(var i=0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i]){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}

});



