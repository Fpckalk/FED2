/*

Maak nu hetzelfde object, met dezelfde properties en methods
aan met een object literal

*/

var person = {

	name: 'Frank',
	walk: function() {
		console.log('And the creator has given me legs! ' + this.name + ' is thankful indeed.');
	},
	eat: function() {
		console.log('Wonderful tasty food! Oh bless you kind one, for I - ' + this.name + ' - am hungry no more.');
	}

}