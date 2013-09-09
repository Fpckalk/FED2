/*

Maak met een object constructor een 'persoon'-object aan met de
property 'name' en de method 'speak'.
En maak een nieuwe instantie aan van dit object waarbij je de
naam 'Bob' meegeeft als parameter van het object

*/

function Person(name) {

	this.name = name;
	this.speak = function() {
		console.log('Hi, my name is ' + this.name);
	}

}

var frank = new Person('Frank');