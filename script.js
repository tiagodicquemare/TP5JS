window.addEventListener("load",function(){
	document.getElementById("clearCanvas").addEventListener("click", clear);
	var tool = document.getElementById('Option');
	var context = document.getElementById('myCanvas').getContext("2d");
	var div = document.getElementById('CanvasBox');
	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var paint;

function clear(){
	 context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	  clickX = new Array();
	  clickY = new Array();
      clickDrag = new Array();
	
}

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




		function redraw(){
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
