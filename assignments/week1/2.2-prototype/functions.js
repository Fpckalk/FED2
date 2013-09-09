/*

Voeg de methods 'walk' en 'eat' toe aan
het 'persoon'-object met de prototype function van het object

*/

function Person(name) {

	this.name = name;

}

Person.prototype.walk = function() {
	console.log('And the creator has given me legs! ' + this.name + ' is thankful indeed.');
};

Person.prototype.eat = function() {
	console.log('Wonderful tasty food! Oh bless you kind one, for I - ' + this.name + ' - am hungry no more.');
};

var frank = new Person('Frank');