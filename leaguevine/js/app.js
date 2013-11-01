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
			this.enable();
		},

		// Event handlers
		enable: function() {
			var el = qwery('[data-type=submit]')[0];
			el.addEventListener('click', APP.request.update, false);
		}

	};


	APP.request = {

		// Request any xml type file by passing up the method and file you're looking for
		xmlRequest: function(method, file, headers, success) {

			var request = new XMLHttpRequest;

			request.open(method, file);

			// The headers should be set after open()
			// due to an anomaly in Gecko
			if (method === "POST") {
				request.setRequestHeader(
					"X-Hello",
					"Is it me you're looking for",
					false
				);				
			}

			request.send(null);

			document.getElementById("loader").className = "loading";
			
			request.onreadystatechange = function() {
				if (request.readyState == 4) {
					if (request.status == 200) {
						document.getElementById("loader").className = "";
						success(request);
					}
				}
			}

		},


		update: function() {

			console.log('test');

		}

	};


	// Apply data to the different 'pages'
	// The rest of these can be found under the directives
	// Which are located near the bottom of this script

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
			APP.request.xmlRequest('GET', 'https://api.leaguevine.com/v1/games/?tournament_id=19389&order_by=%5Bstart_time%5D&fields=%5Bid%2C%20team_1%2C%20team_2%2C%20start_time%2C%20team_1_score%2C%20team_2_score%5D&access_token=d6fb6c85cb/', '' , function(data) {
				data = JSON.parse(data.response);
				console.log(data);
				Transparency.render(qwery('[data-bind=scheduleData]')[0], data.objects, APP.directives.schedule(data.objects));
				APP.router.change();		
			})
		},

		game: function() {
			APP.request.xmlRequest('GET', 'https://api.leaguevine.com/v1/games/?season_id=20167&fields=%5Bteam_1%2C%20team_1_score%2C%20team_2%2C%20team_2_score%5D&offset=2&access_token=d0cff4f798/', '', function(data) {
				data = JSON.parse(data.response);
				console.log(data);
				Transparency.render(qwery('[data-bind=gameData]')[0], data.objects, APP.directives.game(data.objects));
				APP.router.change();
			})
		},

		ranking: function() {
			APP.request.xmlRequest('GET', 'https://api.leaguevine.com/v1/teams/?season_id=20167&fields=%5Bid%2C%20leaguevine_url%2C%20losses%2C%20name%2C%20profile_image_50%2C%20season%2C%20wins%5D&access_token=d0cff4f798/', '', function(data) {
				data = JSON.parse(data.response);
				console.log(data);
				Transparency.render(qwery('[data-bind=rankingData]')[0], data.objects, APP.directives.ranking(data.objects));
				APP.router.change();
			})
		}

	};

	// All the thanks go to Joost Faber
	// https://github.com/joostf
	APP.directives = {

		schedule: function(data) {
			return {
				start_time: {
					text: function() {
						var date = this.start_time.split("T");
						return date[1];
					}
				},
				team_1: {
					text: function() {
						return this.team_1.name;
					}
				},
				score_1: {
					value: function() {
						return this.team_1_score;
					}
				},
				score_2: {
					value: function() {
						return this.team_2_score;
					}
				},
				team_2: {
					text: function() {
						return this.team_2.name;
					}
				}
			}
		},

		game: function(data) {
			return {
				result: {
					text: function() {
						return this.team_1_score + " - " + this.team_2_score;
					}
				},
				team_1: {
					text: function() {
						return this.team_1.name;
					}
				},
				team_2: {
					text: function() {
						return this.team_2.name;
					}
				}
			}
		},

		ranking: function(data) {
			return {
				result: {
					text: function() {
						return this.wins - this.losses;
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