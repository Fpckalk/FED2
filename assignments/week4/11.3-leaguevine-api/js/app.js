/*

A basic framework skeleton

Leaguevine access token: 248cf621f6
Tournament ID: 19389

Using own made XHR with callbacks

*/

'use strict';

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
		description: 'A collection of movies'

	};

	// APP.movieDirectives = {
	// 	cover: {
	// 		src: return this.cover;
	// 	}
	// }


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
			APP.request.xmlRequest('GET', 'https://api.leaguevine.com/v1/tournaments/19389/?access_token=248cf621f6/', function(data) {
				data = JSON.parse(data.response);
				console.log(data);
				Transparency.render(qwery('[data-bind=scheduleData]')[0], data, APP.directives.schedule(data));
				APP.router.change();				
			})
		},

		game: function() {
			APP.request.xmlRequest('GET', 'data/teams.json', function(data) {
				data = JSON.parse(data.response);
				Transparency.render(qwery('[data-bind=gameData]')[0], data.game, APP.directives.game(data.game));
				APP.router.change();
			})
		},

		ranking: function() {
			APP.request.xmlRequest('GET', 'data/teams.json', function(data) {
				data = JSON.parse(data.response);
				Transparency.render(qwery('[data-bind=rankingData]')[0], data.ranking, APP.directives.ranking(data.ranking));
				APP.router.change();
			})
		},

		movies: function() {
			APP.request.xmlRequest('GET', 'data/movies.json', function(data) {
				data = JSON.parse(data.response);
				Transparency.render(qwery('[data-route=movies]')[0], data, APP.directives.movies(data));
				APP.router.change();
			});
		}

	};

	// All the thanks go to Joost Faber
	// https://github.com/joostf
	APP.directives = {
		schedule: function(data) {
			return {
				result: {
					text: function() {
						return this.team1Score + " - " + this.team2Score;
					}
				}
			}
		},
		game: function(data) {
			return {
				result: {
					text: function() {
						return this.team1Score + " - " + this.team2Score;
					}
				}
			}
		},
		ranking: function(data) {
			return {
				result: {
					text: function() {
						return this.Pw - this.Pl;
					}
				}
			}
		},
		movies: function (data) {
			console.log(data);
			return {
				cover: {
					src: function() {
						return this.cover;
					}
				}
			}
		}
	}


	////////////////////// This is a well commented line
	domready(function() {
		APP.controller.init();
	});

})();