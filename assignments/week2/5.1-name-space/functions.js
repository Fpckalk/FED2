/*

Maak een namespace aan voor het GEO script en koppel de objecten aan deze namespace

*/

var Geo = Geo || {};


// GPS
Geo.gps = {

	init: function() {
		console.log('The namespace is working');
	},

	startInterval: function() {

	},

	updatePosition: function() {

	},

	setPosition: function() {

	},

	checkLocations: function(event) {

	},

	calculateDistance: function(p1, p2) {

	}

}


// Google Maps
Geo.gmap = {

	generateMap: function(myOptions, canvasID) {

	},

	isNumber: function(n) {

	},

	updatePosition: function(event) {

	}

}


// Debugging functions
Geo.debug = {

	geoErrorHandler: function(code, message) {

	},

	debugMessage: function(message) {

	},

	setCustomMessage: function(debugID) {

	}

}