function Statement(sujetTemp, propriete, objetTemp) {
  var sujet = this.checkExist(sujetTemp);
  var objet = this.checkExist(objetTemp);
  this.sujet = sujet;
  this.propriete = propriete;
  this.objet = objet;
  // console.log("PROPRIETE "+this.propriete);
  /* TODO : s'il n'existe pas de spring avec ces deux neuds et cette propriete, le créer */
 //  var spring = physics.makeSpring(sujet.particle, objet.particle, SPRING_STRENGTH/15, SPRING_DAMPING, 100, this.propriete);
 // var spring = physics.makeSpring(sujet.particle, objet.particle,  forceRessort, souplesseRessort, longueurRessort, this.propriete);
  // console.log(spring);
  var prop = {
    'propriete': propriete,
    'objet': objet
  };
  this.sujet.proprietes.push(prop);

  this.texte=propriete;
//  this.img = loadImage("");
//		var imageConst;
	// if(this.texte.length>20){
		// var littleText=this.texte.slice(0,20).concat("...");
		// imageConst = constructImage(littleText);
	// }else{
	// imageConst = constructImage(this.texte);
	// }
		// this.img = imageConst[0];
	// this.IMGtaille = imageConst[1];

  var enregistrements = document.getElementById('enregistrements');
  var enregDivdocument = document.createElement("DIV");
  var s = document.createTextNode(this.sujet.texte);
  var p = document.createTextNode(this.propriete);
  var o = document.createTextNode(this.objet.texte); // Create a text node
  var sep1 = document.createTextNode(", ");
  var sep2 = document.createTextNode(", ");
  //  s.attribute('id', 'sujet');
  //  p.attribute('id', 'propriete');
  //  o.attribute('id', 'objet');
  enregDivdocument.appendChild(s);
  enregDivdocument.appendChild(sep1);
  enregDivdocument.appendChild(p);
  enregDivdocument.appendChild(sep2);
  enregDivdocument.appendChild(o);
  enregDivdocument.onclick = function(e) {
    console.log(e);
    modif(this);
  };
//  var canvas = document.getElementById('canvas');
 // canvas.parentNode.insertBefore(enregDivdocument, canvas.nextSibling);
 //updateLevel();
}

Statement.prototype.checkExist = function(texte) {
  var trouve = false;
  	if (texte.includes("#")) {
		var texteTemp = texte.split("#");
		texte = texteTemp[1];
		prefix = texteTemp[0];
	} 
  for (var indice in individuals) {
    var individual = individuals[indice];
    if (individual.texte == texte) {
      // console.log("trouve " + texte);
      trouve = individual;
      break;
    }
  }
  if (trouve === false) {
    trouve = new Noeud(texte);
    individuals.push(trouve);
    //console.log("pas trouve");
  }
  return trouve;
}
Statement.prototype.log = function() {
  // console.log(this.sujet);
}
/*
Statement.prototype.draw=function(){
		fill(125, 125, 125);
	//		push();
	//translate(this.particle.position.x, this.particle.position.y, this.particle.position.z);
//	console.log(this.sujet);
	line(this.sujet.particle.position.x, this.sujet.particle.position.y, this.sujet.particle.position.z, this.objet.particle.position.x, this.objet.particle.position.y, this.objet.particle.position.z);
		
		var milieuSens = createVector((this.sujet.particle.position.x * 3 + this.objet.particle.position.x) / 4, (this.sujet.particle.position.y * 3 + this.objet.particle.position.y) / 4, (this.sujet.particle.position.z * 3 + this.objet.particle.position.z) / 4);
		push();
		translate(milieuSens.x, milieuSens.y, milieuSens.z);
	//normalMaterial();
	//sphere(6);
	if (afficheTexte) {
		translate(10, 10, -10);


		texture(this.img);
		//	box(80, 80, 80);
		plane(this.IMGtaille, 6);
		//	plane(8, 4);
	}
	pop();
	
}*/


Statement.prototype.add2Statements=function(){
	addStatement(this);
}

Statement.prototype.add2StatementsThree=function(){
	console.log("add");
}