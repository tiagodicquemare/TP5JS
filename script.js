window.addEventListener("load",function(){
	document.getElementById("clearCanvas").addEventListener("click", clear);
	var tool = document.getElementById('Option');
	var context = document.getElementById('myCanvas').getContext("2d");
	var div = document.getElementById('CanvasBox');
	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var clickColor = new Array();
	var paint;

function clear(){
	 context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	  clickX = new Array();
	  clickY = new Array();
    clickDrag = new Array();
		clickColor = new Array();
}


function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
	clickColor.push(rgbToHex(document.getElementById('palette').contentWindow.document.getElementById('resultat').name));
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
  		context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  		context.lineWidth = 5;
		  context.lineJoin = "round";
		  context.lineWidth = 5;

		  for(var i=0; i < clickX.length; i++){
				context.beginPath();
				context.strokeStyle = clickColor[i];
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

function rgbToHex(rgb) {
		var r ='', g='', b='';
		if(rgb!=''){
			for(var i = 0; rgb[i]!=',';i++){
				r += rgb[i];
			}
			console.log("r = " + r);
			for(var j = i+1; rgb[j]!=',';j++){
				g += rgb[j];
			}
			console.log("g = " + g);

			for(var k = j+1; k<rgb.length; k++){
				b += rgb[k];
			}
			console.log("b = " + b);
		}
		r = parseInt(r);
		g = parseInt(g);
		b = parseInt(b);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
});
