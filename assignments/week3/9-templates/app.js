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
		gameInfo: function() {
					var data = APP.json.xmlRequest('GET', 'teams.json');
					data.onload = function() {
						console.log(data.response); // Works
						return data.response; // Doesn't work. What the dick.
					}
				}
	},

	APP.json = {

		xmlRequest: function(method, file) {

			var request = new XMLHttpRequest;

			request.open(method, file);
			request.send(null);

			return request;

		},

		requestLoad: function(data) {

			return(data.response);

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

	APP.directives = {

	}

	////////////////////// This is a well commented line
	domready(function() {
		APP.controller.init();
	});

})();