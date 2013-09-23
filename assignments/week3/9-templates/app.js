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
		description: 'This is the game.',
		gameInfo: [
		    { score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
		    { score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
		    { score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
		    { score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
		    { score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
		    { score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
		    { score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
		    { score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
		    { score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
		    { score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
		    { score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
		    { score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
		    { score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
		    { score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
		    { score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
		    { score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
		    { score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
		    { score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
		    { score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
		    { score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
		    { score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
		    { score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
		    { score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
	    ]
	}

	
	APP.json = {

		getjson: function() {
			var request = new XMLHttpRequest;

			request.open('GET', 'teams.json');
			request.send();
			request.onload = requestLoad;

			function requestLoad() {
				console.log(this.responseText);
			}
		}

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
					APP.page.schedule();
				},

				'/ranking': function() {
					console.log('Ranking called');
					APP.page.ranking();
				},

				'/game': function() {
					console.log('Game called');
					APP.page.game();
				},

				'*': function() {
					console.log('Catch-all called');
					APP.page.schedule();
				}

			});
		},

		change: function () {
            var route = window.location.hash.slice(2),
            	articles = qwery('article[data-route]'),
            	article = qwery('[data-route=' + route + ']')[0];  

            // Show active article, hide all other
            if (article) {
            	for (var i=0; i < articles.length; i++){
            		articles[i].classList.remove('active');
            	}
            	article.classList.add('active');
			}

			// Default route
			if (!route) {
            	articles[0].classList.add('active');
			}

		}

	};


	// Page
	APP.page = {
		schedule: function () {
			Transparency.render(qwery('[data-route=schedule]')[0], APP.schedule);
			APP.router.change();
		},

		ranking: function () {
			Transparency.render(qwery('[data-route=ranking]')[0], APP.ranking);
			APP.router.change();
		},

		game: function () {
			Transparency.render(qwery('[data-route=game]')[0], APP.game);
			APP.router.change();
		}
	}

	////////////////////// This is a well commented line
	domready(function() {
		APP.controller.init();
	});

})();