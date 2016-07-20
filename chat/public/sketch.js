
cpt=0;
// Keep track of our socket connection
var socket;
var nextRessource;
var leMot="Scanne le QR Code avec ton telephone pour jouer";
var hebergeur;
/*
	var saisieDiv; 
	var curseursDiv;
	var inpSujet;
	var inpProp;
var inpObjet;*/


var level = 0;
var canvas;
var ctx; // 2d drawing context of canvas element
// Physics constants
var PHYS_GRAVITY = 0;
var PHYS_DRAG = 0.01;
// Pause between frames of animation
var FRAME_DELAY = 10;
/*var individuals = [];*/
var statements=[];
var centroid = new Smoother3D(0.8);
var distancemin2noeuds = 80;
var SPRING_STRENGTH = 0.1;
var SPACER_STRENGTH = 30;
var SPRING_DAMPING = 0.1;
var forceRessort = 0.2;
var souplesseRessort = .1; //.2
var longueurRessort = 80;
var centre;
var moyenne=100;
var seuil;

var tCtx;
var taille;
var d = 1;
var z = 1;
var theta = 0;
var img;
var sliderZ, sliderCamZ,sliderCamX,sliderCamY;
var noeud_update = 0;
var afficheTexte = true;
var imag;
var userid;
var userDiv;
var pg;
var previous=[];
var catchClick=true;
var limiteDrag=0;

function setup() {
	frameRate(10);
	canvas = createCanvas(displayWidth, displayHeight-200, WEBGL);
	//canvas = createCanvas(displayWidth-250, 400, WEBGL);
	perspective(60 / 180 * PI, width/height, 0.1, 100);
	pg=createGraphics(10,10,'WEBGL');
	
	canvas.attribute('id', 'canvas');
	//canvas.position("fixed");
	canvas.position(0,0);
	CANVAS_WIDTH = canvas.width;
	CANVAS_HEIGHT = canvas.height;
	
	previous.x=CANVAS_WIDTH/2;
	previous.y=CANVAS_HEIGHT/2;
		limiteDrag=displayHeight-200;
	centroid.setValue(width / 2, height / 2, 0);
	//tCtx = document.getElementById('textCanvas').getContext('2d');
	
	//	ctx = document.getElementById('canvas').getContext('2d');
	/* var canvas1 = document.getElementById('canvas');
	ctx = canvas1.getContext('2d');*/
	// ctx.fillStyle = 'black';
	init();
	//initSession();
	//	initImage();
	
	
	sliderZ = createSlider(0, 255, 200);
	sliderZ.position(10, 500);
	sliderZ.style('width', '80px');
	
	
	sliderCamX = createSlider(-1000, 1000, 0);
	sliderCamX.position(10, 520);
	sliderCamX.style('width', '80px');
	sliderCamY = createSlider(-1000, 1000, 0);
	sliderCamY.position(10, 540);
	sliderCamY.style('width', '80px');
	sliderCamZ = createSlider(-1000, 1000, 0);
	sliderCamZ.position(10, 560);
	sliderCamZ.style('width', '80px');
	buttonResetCam = createButton("Reset Camera");
	buttonResetCam.position(10, 580);
	buttonResetCam.mousePressed(resetCam);
	
		buttontoogleTexte = createButton("Toogle Texte");
	buttontoogleTexte.position(10, 480);
	buttontoogleTexte.mousePressed(toogleTexte);
	

	//socket = io.connect(window.location.href);
	
/*	socket.on('newStatement',	function(data) {
		// Data comes in as whatever was sent, including objects
		console.log("Received: 'newStatement'");
		var statement=data.newStatement;
		console.log(statement);
		var newStatement = new Statement(statement.sujet.texte, statement.propriete, statement.objet.texte); 
		statements.add(statemenent)
		//socket.broadcast.emit(data);
		//var mot=mots[indiceMot];
		//console.log("send"+mot);
});*/
}

function draw() {
	background(255,50);
	fill(255, 255, 255);
	translate(-width / 2, -height / 2);
	var zSlider = (sliderZ.value() - 200) * 10;
	centroid.setZ(zSlider);
	var camSliderZ = sliderCamZ.value();
	var camSliderX = sliderCamX.value();
	var camSliderY = sliderCamY.value();
	camera(camSliderX, camSliderY, camSliderZ);
	physics.tick(); //within physics library, creates a counter to continue to make more nodes
	var canvas1 = document.getElementById('canvas');
	centre.position.x = width / 2;
	centre.position.y = height / 2;
	if (physics.particles.length > 1) {
		updateCentroid();
		centroid.tick();
		centre.position.x = centroid.x();
		centre.position.y = centroid.y();
		centre.position.z = centroid.z();
		push();
		translate(centroid.x(), centroid.y(), centroid.z());
		basicMaterial(250, 0, 0);
		sphere(5);
		pop();
	}
	individuals.forEach(drawElement);
	statements.forEach(drawSpring);
z = z + d;
if ((z > 100) || (z < 1)) {
	d = -d;
	
}

/*
	if (typeof leMot !== "undefined") {
	//	console.log(leMot);
	text(leMot, 200, 200);
}*/
console.log(moyenne+" "+physics.attractions.length);
checkMoyenne();
/*
if (physics.attractions.length>300){
for (j=0;j<physics.attractions.length;j=j+2){
	physics.attractions.remove(j);
}
}
if(physics.attractions.length>1000){
	
	physics.attractions=[];
}*/
document.getElementById("nbAtt").innerHTML=physics.attractions.length;
}


function checkMoyenne(){
	var maxi=0;
	var somme=0;
	var length=0;
	for (j=0;j<physics.attractions.length;j++){
		attraction=physics.attractions[j];
		var a=attraction.a;
		var b=attraction.b;
		var v1 = createVector(a.position.x, a.position.y, a.position.z);
		var v2 = createVector(b.position.x, b.position.y, b.position.z);
		var d = v1.dist(v2);
		somme=somme+d;	
	}
	moyenne=somme/(physics.attractions.length+1);
	//if(moyenne>200){
	for (j=0;j<physics.attractions.length;j++){
		attraction=physics.attractions[j];		
		var a=attraction.a;
		var b=attraction.b;
		var v1 = createVector(a.position.x, a.position.y, a.position.z);
		var v2 = createVector(b.position.x, b.position.y, b.position.z);	
		var d = v1.dist(v2);
		if (((d<500)&&(d>(moyenne+1)))||(d>500)){//||
			physics.attractions.remove(j);
		//}
	}}
}

function drawElement(element, index, array) {
	fill(255);
	element.update();
	element.draw();
}

function drawSpring(element,index,array){
	fill(255);
	element.draw();
}

function init() {
	physics = new ParticleSystem(PHYS_GRAVITY, PHYS_DRAG);
	centre = physics.makeParticle(2.0, width / 2, height / 2, 0.0);
	centre.lock = true;
}

function afficheImage() {
	ambientLight(300);
	pointLight(250, 250, 250, 100, 100, 0);
	translate(-220, 0, 0);
	push();
	rotateZ(theta * mouseX * 0.001);
	rotateX(theta * mouseX * 0.001);
	rotateY(theta * mouseX * 0.001);
	//pass image as texture
	texture(img);
	sphere(150);
	pop();
	translate(440, 0, z);
	push();
	rotateZ(theta * 0.1);
	rotateX(theta * 0.1);
	rotateY(theta * 0.1);
	basicMaterial(100, 100, 200, 20)
	texture(img);
	box(taille, 80, 80);
	pop();
	translate(-220, -50, z);
	push();
	plane(taille * 2, 40);
	pop();
	theta += 0.05;
	z = z + d;
	if ((z > 100) || (z < 1)) {
		d = -d;
	}
}

function chargeDemo() {
	afficheTexte = false;
	chargeData("dc");
}

function resetCam() {	
		catchClick=false;sliderZ.value(200);
	sliderCamX.value(0);
	sliderCamY.value(0);
	sliderCamZ.value(0);
	console.log("resetSlider");
}

function toogleTexte() {
	afficheTexte = !afficheTexte;
}

function addStatement(statement){
	statements.push(statement);
}