function keyPressed() {
	var bouttonAjoute = document.getElementById('bouttonAjoute');
	var inpSujetFoc = document.getElementById('inpSujet');
	if ((keyCode === ENTER) && (document.activeElement == bouttonAjoute)) {
		ajouteTriplet();
		inpSujetFoc.focus();
	}
}