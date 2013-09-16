/*

Description about the template app

*/

var APP = APP || {};

(function() {

	APP.controller = {

		init: function() {
			APP.schedule.init();
			APP.ranking.init();
			APP.game.init();
		}

	}

	APP.schedule = {

		init: function() {
			console.log('Schedule\'s up');
		}

	},

	APP.ranking = {

		init: function() {
			console.log('Ranking\'s up');
		}

	},

	APP.game = {
		init: function() {
			console.log('Game\'s up');
		}
	}

	domready(function() {
		APP.controller.init();
	});

})();