var canvas1=document.getElementById("canvas");

var current=[];


function mouseDragged() {
	// next = 0;
	//painting = true;
	current.x = mouseX;
	current.y = mouseY;
	//paths.push(new Path());
	//console.log(previous);
	//console.log("current");
	//console.log(current);
	
	if (current.x!=previous.x){
		
		sliderCamX.value(sliderCamX.value()+previous.x-current.x);
		previous.x=current.x;
	}
	
	if (current.y!=previous.y){
		
		sliderCamY.value(sliderCamY.value()+previous.y-current.y);
		previous.y=current.y;
	}
	
	
}

function mouseReleased(){
	console.log("re");
	previous.x=CANVAS_WIDTH/2;
	previous.y=CANVAS_HEIGHT/2;
}

function mouseWheel(event) {
  println(event.delta);
  //move the square according to the vertical scroll amount
//  pos += event.delta;
  //uncomment to block page scrolling
  sliderCamZ.value(sliderCamZ.value()+event.delta);
  return false;
}












/*function keyPressed() {
	var bouttonAjoute = document.getElementById('bouttonAjoute');
	var inpSujetFoc = document.getElementById('inpSujet');
	if ((keyCode === ENTER) && (document.activeElement == bouttonAjoute)) {
	ajouteTriplet();
	inpSujetFoc.focus();
	}
}*/