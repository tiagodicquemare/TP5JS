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
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  context.strokeStyle = rgbToHex(document.getElementById('palette').contentWindow.document.getElementById('resultat').name);
	console.log(document.getElementById('palette').contentWindow.document.getElementById('resultat').name);
	console.log(rgbToHex(document.getElementById('palette').contentWindow.document.getElementById('resultat').name));
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

function rgbToHex(rgb) {
		var r ='', g='', b='';
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

		r = parseInt(r);
		g = parseInt(g);
		b = parseInt(b);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
});
