function Noeud(texte) {
	if (texte.includes("#")) {
		var texteTemp = texte.split("#");
		this.texte = texteTemp[1];
		this.prefix = texteTemp[0];
		} else {
		this.texte = texte;
	}
//	this.img = loadImage("");
	
	this.proprietes = [];
	this.nbAtt=0
	
	//this.particle = physics.makeParticle(10.0, 0, 0, 0, 10.0);
	//this.particle.position = new Vector(centroid.x()+random(-1000,1000), centroid.y()+random(-1000,1000) , centroid.z()+random(-1000,1000));
	//var imageConst;
	/*if(this.texte.length>20){
		var littleText=this.texte.slice(0,20).concat("...");
		imageConst = constructImage(littleText);
		}else{
		imageConst = constructImage(this.texte);
	}*/
	
//	this.img = imageConst[0];
//	this.IMGtaille = imageConst[1];
//	physics.makeAttraction(centre, this.particle, 100, 1000);
	
}

Noeud.prototype.update = function() {
	//console.log(physics.attractions[0].a);
	/*for (j=0;j<physics.attractions.length;j++){
		attraction=physics.attractions[j];
		var attA=attraction.a;
		var attB=attraction.b;
		if((attA==this.particle)||(attB==this.particle)){
		
		physics.attractions.remove(j);
		console.log(physics.attractions.length);
		}
		
	}*/
	
/*	for (i = 0; i < physics.particles.length; i++) {
		var b = physics.particles[i];
		var v1 = createVector(this.particle.position.x, this.particle.position.y, this.particle.position.z);
		var v2 = createVector(b.position.x, b.position.y, b.position.z);
		
		var d = v1.dist(v2);
		
if ((b != this.particle) && (b != centre)) {*/
	//		console.log(d);
			//if (d < 100){
			//recherche de l'existance d'une attraction
		//	console.log(physics.attractions.length);
		/*	if (physics.attractions.length>0){
				for(j=0;j<physics.attractions.length;j++){
					var att =physics.attractions[j];
					//console.log(att);
					var att1=att.a;
					var att2=att.b;
					if (cpt<physics.particles.length){
						if((att1!=centre)&&(att2!=centre)){
							console.log ("b, this.particle,centre");
							console.log(b);
							console.log(this.particle);
							console.log(centre);
							
							console.log(att1);
							cpt++;
						}
		}*/
					
					/*if((att1!=centre)&&(att2!=centre)&&((att1!=b)&&(att2!=this.particle))&&((att1!=this.particle)&&(att2!=b))){
						//console.log(att1);
						physics.makeAttraction(this.particle, b, -10, 200);
						
						console.log(physics.attractions.length);
					}*/
					
					
			//	}	
				
			//}
			
			
			
			
			//	physics.makeAttraction(this.particle, b, -500, 200);
		//	}	//console.log("d " +d);
			/*	if (d <= 0) {
			
			b.position.add(p5.Vector.random3D().mult(2));
			}else		
			if ((d < 190)&&(physics.attractions.length<300)) {
			physics.makeAttraction(this.particle, b, -100, 200);
			}else if(d<500&&(physics.attractions.length<300)){
			physics.makeAttraction(this.particle, b, -50, 500);
		} */
		//	for (j=0;j<physics.attractions.length;j++){
		//attraction=physics.attractions[j];
		//var length=attraction.length;
		//console.log("l "+length);
		
		// var attA=attraction.a;
		// var attB=attraction.b;
		// if((attA != centre) && (attB != centre)){
		// console.log(attA);
		// if((((attA==this.particle)&&(attB==b))||((attA==b)&&(attB==this.particle)))) {
		// console.log("exist");
		// }else{
		// console.log("don't exist");
		// physics.makeAttraction(this.particle, b, -50, 120);
		// }
		// }
		// }
		//	console.log("add " +physics.attractions.length);
		//	}
		//			else
		/*if (d < distancemin2noeuds*2) {
			physics.makeAttraction(this.particle, b, -5, longueurRessort/2);
			console.log("2 " +physics.attractions.length);
		}else*/
		//	if(d>distancemin2noeuds*2){
		
	//}
//	}
//}

}

Noeud.prototype.draw = function() {
	//fill(255, 0, 255);
	
	
	
	
	// push();
	// translate(this.particle.position.x, this.particle.position.y, this.particle.position.z);
	// normalMaterial();
	// sphere(16);
	// if (afficheTexte) {
		// translate(20, 20, 20);
		
		
		// texture(this.img);
	////	box(80, 80, 80);
	// plane(this.IMGtaille, 10);
	////	plane(8, 4);
	// }
	////sphere(16);
	// pop();
	
	
	}			