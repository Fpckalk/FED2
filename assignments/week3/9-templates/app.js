/*

A basic framework skeleton

*/

var APP = APP || {};

(function() {

	/* Initiate all the functions you want to start when
	 * everything has finished loading.
	*/
	APP.controller = {

		init: function() {
			APP.router.init();
		}

	}

	// Apply data to the different 'pages'

	APP.schedule = {
		title: 'Schedule',
		description: 'This is the schedule.'
	},

	APP.ranking = {

		title: 'Ranking',
		description: 'This is the ranking.'

	},

	APP.game = {
		title: 'Game',
		description: 'This is the game.'
	}


	// ROUTIE
	APP.router = {

		/* The functionality of Routie lies in that it can differentiate links
		 * and add functions to the links called.
		 * Thus you can 'switch' pages without using another request.
		*/
		init: function() {
			routie({

				'/schedule': function() {
					console.log('Schedule called');
				},

				'/ranking': function() {
					console.log('Ranking called');
				},

				'/game': function() {
					console.log('Game called');
				},

				'*': function() {
					console.log('Catch-all called');
				}

			});
		}

	};

	////////////////////// This is a well commented line
	domready(function() {
		APP.controller.init();
	});

})();