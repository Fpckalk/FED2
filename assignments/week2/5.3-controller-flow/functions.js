/*

Voeg een 'controller' object toe aan
je script van waaruit je de flow van je applicatie start.

*/


var Geo = Geo || {};

// Self invoking anonymous function
(function() {

	// App
	Geo.app = {

		init: function () {
			Geo.gps.init()
		}

	}
	
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

	Geo.app.init()

})();