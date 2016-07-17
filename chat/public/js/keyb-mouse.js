var canvas1=document.getElementById("canvas");

var current=[];

function mousePressed(){
	previous.x=mouseX;
	previous.y=mouseY;
}

function mouseDragged() {
	
	current.x = mouseX;
	current.y = mouseY;
	
	if((mouseX)>115 && (mouseY<limiteDrag-200)){
		//desactiver drag si changement par slider
		catchClick=true;
	}
	
	if (catchClick){
		if (current.x!=previous.x){
			sliderCamX.value(sliderCamX.value()+(previous.x-current.x));
			//sliderCamX.value(sliderCamX.value()+(previous.x-current.x)*(-sliderCamZ.value()/100)-1);
			previous.x=current.x;
		}
		
		if (current.y!=previous.y){
			sliderCamY.value(sliderCamY.value()+(previous.y-current.y));
			//sliderCamY.value(sliderCamY.value()+(previous.y-current.y)*(-sliderCamZ.value()/100)+1);
			previous.y=current.y;
		}
	}
}

function mouseReleased(){
	catchClick=true;
}


function mouseWheel(event) {
  //println(event.delta);
   sliderCamZ.value(sliderCamZ.value()+event.delta);
  //uncomment to block page scrolling

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