/*

Maak het GEO script compleet door de objecten
te vullen met de code uit het originele script
en alle verwijzingen kloppend te maken.
Kijk ook nog even kritisch waar het script niet
voldoet aan de hieronder genoemde best practices
en corrigeer waar nodig.

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