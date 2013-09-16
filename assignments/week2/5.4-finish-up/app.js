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

	// Variable declaration
	var LINEAIR = "LINEAIR";
	var GPS_AVAILABLE = 'GPS_AVAILABLE';
	var GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
	var POSITION_UPDATED = 'POSITION_UPDATED';
	var REFRESH_RATE = 1000;
	var currentPosition = currentPositionMarker = customDebugging = debugId = map = interval = intervalCounter = updateMap = false;

	// App
	Geo.app = {

		// Start all the main functions
		init: function () {
			Geo.gps.init();
		}

	};
	
	// GPS
	Geo.gps = {

		// Test if GPS is available (via geo.js) and fire off an event
		init: function() {
			Geo.debug.debugMessage("Check if GPS is available");

		    ET.addListener(GPS_AVAILABLE, this.startInterval);
		    ET.addListener(GPS_UNAVAILABLE, function() {
		    	debugMessage('GPS is not available.');
		    });

		    (geo_position_js.init())?ET.fire(GPS_AVAILABLE):ET.fire(GPS_UNAVAILABLE);
		},

		// Start an interval based on REFRESH_RATE which updates the location
		startInterval: function(event) {
			debugMessage("GPS is available, ask position.");
			this.updatePosition();
			interval = self.setInterval(this.updatePosition, REFRESH_RATE);
			ET.addListener(POSITION_UPDATED, this.checkLocations);
		},

		// Get the current position from geo.js. Define a callback for the result.
		updatePosition: function() {
			intervalCounter++;
			geo_position_js.getCurrentPosition(this.setPosition, Geo.debug.geoErrorHandler, {enableHighAccuracy:true});
		},

		// Callback function for defining the current position. Fires an event.
		setPosition: function() {
			currentPosition = position;
			ET.fire("POSITION_UPDATED");
			debugMessage(intervalCounter+" position lat:"+position.coords.latitude+" long:"+position.coords.longitude);
		},

		// Check the locations and direct to another page if we are on a location
		checkLocations: function(event) {
		    for (var i = 0; i < locations.length; i++) {
		        var locatie = {coords:{latitude: locations[i][3],longitude: locations[i][4]}};

		        if(this.calculateDistance(locatie, currentPosition)<locations[i][2]){

		            // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
		            if(window.location!=locations[i][1] && localStorage[locations[i][0]]=="false"){
		                // Probeer local storage, als die bestaat incrementeer de locatie
		                try {
		                    (localStorage[locations[i][0]]=="false")?localStorage[locations[i][0]]=1:localStorage[locations[i][0]]++;
		                } catch(error) {
		                    debugMessage("Localstorage cannot be called: "+error);
		                }

						// TODO: Animeer de betreffende marker

		                window.location = locations[i][1];
		                Geo.debug.debugMessage("Player is within a radius of "+ locations[i][2] +" meters from "+locations[i][0]);
		            }
		        }
		    }
		},

		// Calculate the distance in meters between two points
		calculateDistance: function(p1, p2) {
			var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
			var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
			return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
		}

	};


	// Google Maps
	Geo.gmap = {

		// Refer to the Google Maps API for more details
		generateMap: function(myOptions, canvasID) {
		    Geo.debug.debugMessage("Generate Google map and show this in #"+canvasId);
		    map = new google.maps.Map(document.getElementById(canvasId), myOptions);

		    var routeList = [];
		    // Add markers to map depending on the tourtype
		    Geo.debug.debugMessage("Drawing locations, tourtype is: "+tourType);
		    for (var i = 0; i < locations.length; i++) {

		        // With kudos to Tomas Harkema. Try local storage, add locations if it exists
		        try {
		            (localStorage.visited==undefined||isNumber(localStorage.visited))?localStorage[locations[i][0]]=false:null;
		        } catch (error) {
		            Geo.debug.debugMessage("Localstorage cannot be called: "+error);
		        }

		        var markerLatLng = new google.maps.LatLng(locations[i][3], locations[i][4]);
		        routeList.push(markerLatLng);

		        markerRij[i] = {};
		        for (var attr in locatieMarker) {
		            markerRij[i][attr] = locatieMarker[attr];
		        }
		        markerRij[i].scale = locations[i][2]/3;

		        var marker = new google.maps.Marker({
		            position: markerLatLng,
		            map: map,
		            icon: markerRij[i],
		            title: locations[i][0]
		        });
		    }

			// TODO: Adjust color to current point in the tour
		    if(tourType == LINEAIR){
		        // Draw lines between points
		        Geo.debug.debugMessage("Drawing route");
		        var route = new google.maps.Polyline({
		            clickable: false,
		            map: map,
		            path: routeList,
		            strokeColor: 'Black',
		            strokeOpacity: 0.6,
		            strokeWeight: 3
		        });

		    }

		    // Add person's location
		    currentPositionMarker = new google.maps.Marker({
		        position: kaartOpties.center,
		        map: map,
		        icon: positieMarker,
		        title: 'You are here'
		    });

		    // Update the map when the POSITION_UPDATED event has started
		    ET.addListener(POSITION_UPDATED, this.updatePosition);
		},

		isNumber: function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		},

		// Updates user's location
		updatePosition: function(event) {
			// use currentPosition to center the map
			var newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
			map.setCenter(newPos);
			currentPositionMarker.setPosition(newPos);
		}

	};


	// Debugging functions
	Geo.debug = {

		geoErrorHandler: function(code, message) {
			debugMessage('geo.js error '+code+': '+message);
		},

		debugMessage: function(message) {
			(customDebugging && debugId)?document.getElementById(debugId).innerHTML:console.log(message);
		},

		setCustomMessage: function(debugID) {
			debugId = this.debugId;
			customDebugging = true;
		}

	};

	Geo.app.init()

})();