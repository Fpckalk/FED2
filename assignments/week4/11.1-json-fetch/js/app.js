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
		description: 'A collection of movies'

	};


	APP.movieDirectives = {

		cover: {
			src: promise.get('data/movies.json').then(function(error, text, xhr) {
				if(error) {
					console.log('Error ' + xhr.status);
					return;
				}
				var data = JSON.parse(text);
				console.log(data[0].cover);
				return data[0].cover;
			})
		}

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

				'/movies': function() {
					console.log('Movies called');
					APP.page.movies();
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
			Transparency.render(qwery('[data-route=movies]')[0], APP.movies, APP.movieDirectives);
			APP.router.change();
		}

	};


	////////////////////// This is a well commented line
	domready(function() {
		APP.controller.init();
	});

})();