function ajouteTriplet() {
	// TODO : verifier si les valeurs sont vides
	var statement = new Statement(inpSujet.value(), inpProp.value(), inpObjet.value());
			statements.add(statement);
	var testjson = {
		type: "nouvelleInfo",
		sujet: inpSujet.value(),
		propriete: inpProp.value(),
		objet: inpObjet.value()
	};
	var dataToSend = JSON.stringify(testjson);
	websocketDreamCatcher.send(dataToSend);
}

function updateCentroid() // whenever system is reorganized or scaled, node positions have to be updated
{
	var xMin = 999999.9, //Float.POSITIVE_INFINITY,
		xMax = -999999.9, //Float.NEGATIVE_INFINITY,
		yMin = 999999.9, //Float.POSITIVE_INFINITY,
		yMax = -999999.9; //Float.NEGATIVE_INFINITY;

	for (i = 0; i < physics.particles.length; ++i) {
		var p = physics.particles[i];
		xMax = max(xMax, p.position.x);
		xMin = min(xMin, p.position.x);
		yMin = min(yMin, p.position.y);
		yMax = max(yMax, p.position.y);

	}

	var deltaX = xMax - xMin;
	var deltaY = yMax - yMin;
	if (deltaY > deltaX) {
		centroid.setTarget(xMin + 0.5 * deltaX, yMin + 0.5 * deltaY, height / (deltaY + 50));
	} else {
		centroid.setTarget(xMin + 0.5 * deltaX, yMin + 0.5 * deltaY, width / (deltaX + 50));
	}
	// console.log(xMax + " " + xMin + " " + yMin + " " + yMax);
	// console.log(centroid.x(), centroid.y(), centroid.z());
};

function constructImage(texte) {
	tCtx.canvas.width = tCtx.measureText(texte).width;
	//	tCtx.canvas.style('display','none');
	IMGtaille = tCtx.canvas.width / 2;
	//	console.log(taille);
	tCtx.font = "20px verdana"; // verdana, serif, Arial
	//voir http://jsfiddle.net/AbdiasSoftware/2JGHs/
	tCtx.fillText(texte, 0, tCtx.canvas.height * 4 / 5);
	//	imageElem.src = tCtx.canvas.toDataURL();
	//	console.log(imageElem.src);
	//	image1.src = tCtx.canvas.toDataURL();
	img = loadImage(tCtx.canvas.toDataURL());
	//console.log(texte);
	var imgConst=[img,IMGtaille];
	return imgConst;

}