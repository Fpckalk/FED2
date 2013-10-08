/*

A basic framework skeleton

Leaguevine access token: 82996312dc
Tournament ID: 19389

Using own made XHR with callbacks

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

	};


	APP.request = {

		// Request any xml type file by passing up the method and file you're looking for
		xmlRequest: function(method, file, success) {

			var request = new XMLHttpRequest;

			request.open(method, file);
			request.send(null);

			request.onreadystatechange = function() {
				if (request.readyState == 4) {
					if (request.status == 200) {
						success(request);
					}
				}
			}

		}

	};


	// Apply data to the different 'pages'

	APP.schedule = {

		title: 'Pool A - Schedule',
		description: 'This is the schedule.'

	};


	APP.game = {

		title: 'Game',
		description: 'This is the game.'

	};


	APP.ranking = {

		title: 'Pool A - Ranking',
		description: 'This is the ranking.'

	};


	APP.movies = {

		title: 'Movies',
		description: 'A collection of movies',
		cover: APP.request.xmlRequest('GET', 'data/movies.json', function(data) {
			data = JSON.parse(data.response);
			console.log(data);
		})

	};


	// ROUTIE
	APP.router = {

		/* The functionality of Routie lies in that it can differentiate links
		 * and add functions to the links called.
		 * Thus you can 'switch' pages without using another request.
		*/
		init: function() {
			routie({

				'/schedule': function() {
					APP.page.schedule();
				},

				'/ranking': function() {
					APP.page.ranking();
				},

				'/game': function() {
					APP.page.game();
				},

				'/movies': function() {
					APP.page.movies();
				},

				'*': function() {
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

		schedule: function() {
			Transparency.render(qwery('[data-route=schedule]')[0], APP.schedule);
			APP.router.change();
		},

		game: function() {
			Transparency.render(qwery('[data-route=game]')[0], APP.game);
			APP.router.change();
		},

		ranking: function() {
			Transparency.render(qwery('[data-route=ranking]')[0], APP.ranking);
			APP.router.change();
		},

		movies: function() {
			Transparency.render(qwery('[data-route=movies]')[0], APP.movies);
			APP.router.change();
		}

	};


	////////////////////// This is a well commented line
	domready(function() {
		APP.controller.init();
	});

})();