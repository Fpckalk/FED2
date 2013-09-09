/*

Leg uit wat een closure is en maak een code voorbeeld

A: Een closure is een functie die toegang heeft tot de gegevens van de parent functie

*/

function parentFunction (name) {
	this.name = name;

	/* Deze functie kan de waarde 'name' overnemen van 'parentFunction' */
	function childFunction() {
		console.log('My father\'s name is ' + name);
	}
}

example = new parentFunction('Frank');