/*

Description about the template app

*/

var APP = APP || {};

(function() {

	APP.controller = {

		init: function() {
			APP.router.init();
		}

	}

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


	domready(function() {
		APP.controller.init();
	});

})();