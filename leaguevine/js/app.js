/*

Leaguevine access token: 248cf621f6
Tournament ID: 19389

Using own made XHR with callbacks

*/

'use strict';

var APP = APP || {};

(function() {

	// Initiate all the functions you want to start when
	// everything has finished loading.
	APP.controller = {
		init: function() {
			APP.router.init();
			this.enable();
		},

		enable: function() {

			var	el = qwery('body')[0],
				route = window.location.hash.slice(2);
				
				Hammer(el).on('dragdown', function() { APP.animation.dragDown(event); });
				Hammer(el).on('dragend', function() { APP.animation.dragEnd(event); });
			
		},

		// Event handlers after loading a request is done
		// Gets called in the XHR GET
		loadEnable: function(data) {
			var el = qwery('[data-type=submit]');
			for (var i = 0; i < el.length; i++) {
				el[i].addEventListener('click', function() { APP.request.update(data, event); }, false);
			};
		}

	};

	// Small things I needed
	APP.toolkit = {

		elemIndex: function(elem) {
			var  i = 0;
			while((elem = elem.previousSibling) != null) i++;
			return i;
		}

	};

	// Animations and their functions
	APP.animation = {

		dragDown: function(e) {
			e.gesture.preventDefault();
			var dis = e.gesture.distance,
				main = 'schedule',
				route = window.location.hash.slice(2),
				route = (route) ? route : main, // Checking whether the route actually has a path
				el = qwery('[data-route=' + route + ']')[0];

			el.className = "active";
			el.style.marginTop = dis + "px";
			if(dis >= 150) {
				el.className = "active off";
				el.style.marginTop = "0px";
			}
		},

		// Checks to see if an animation should occur
		// or if there should be a refresh
		dragEnd: function(e) {
			var	dis = e.gesture.distance,
				main = 'schedule',
				route = window.location.hash.slice(2),
				route = (route) ? route : main, // Checking whether the route actually has a path
				el = qwery('[data-route=' + route + ']')[0];

			if(dis <= 150) {
				el.className = "active off";
				el.style.marginTop = "0px";
			} else {
				APP.page[route]();
			}
		}

	}


	APP.request = {

		// Request any xml type file by passing
		// up the method and file you're looking for
		xmlGet: function(file, success) {

			var request = new XMLHttpRequest;

			request.open('GET', file);
			request.send(null);

			document.getElementById("loader").className = "loading";
			
			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					document.getElementById("loader").className = "";
					success(request);
					APP.controller.loadEnable(request.response); // Giving the data to the loadEnabler. Just to be nice.
				}
			}

		},

		// Divided these two bad boys
		// Optional parameters would get a tad too confusing
		xmlPost: function(method, url, params) {

			var request = new XMLHttpRequest;
			var params = JSON.stringify(params);

			request.open(method, url, true);
			request.setRequestHeader("Content-Type", "application/json", false);				
			request.setRequestHeader("Accept", "application/json", false);
			request.setRequestHeader("Authorization", "bearer 248cf621f6", false);
			request.send(params);

			document.getElementById("loader").className = "loading";

			request.onreadystatechange = function() {
				if(request.readyState == 4 && request.status == 201) {
					document.getElementById("loader").className = "";
				}
			}
		},

		// This is to update the scores and
		// send them over to Leaguevine
		update: function(data, e) {

			// All I wanted was to get the index
			// I am sorry it had to be this way
			var elem = e.target.parentNode.parentNode.parentNode;
			var index = Math.floor(APP.toolkit.elemIndex(elem) / 3);

			var data = JSON.parse(data),
				game_id = data.objects[index].id,
				score_1 = qwery('[data-bind=score_1]', this.parentNode)[index].value,
				score_2 = qwery('[data-bind=score_2]', this.parentNode)[index].value;

			var params = {
				"game_id" : game_id,
				"team_1_score" : score_1,
				"team_2_score" : score_2,
				"is_final":"false" // Standard procedure
			}

			APP.request.xmlPost('POST', 'https://api.leaguevine.com/v1/game_scores/', params);
			
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

		// The functionality of Routie lies in that it can differentiate links
		// and add functions to the links called.
		// Thus you can 'switch' pages without using another request.
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

				'*': function() {
					APP.page.schedule();
				}

			});
		},

		// Checks whether the current 'page' should be active
		change: function () {

            var route = window.location.hash.slice(2),
            	articles = qwery('article[data-route]'),
            	article = qwery('[data-route=' + route + ']')[0],
            	navItems = qwery('a[data-nav]'),
            	navItem = qwery('[data-nav=' + route + ']')[0];

            // Show active article, hide all other
            if (article) {
            	for (var i=0; i < articles.length; i++){
            		articles[i].classList.remove('active');
            		navItems[i].classList.remove('active');
            	}
            	article.classList.add('active');
            	navItem.classList.add('active');
			}

			// Default route
			if (!route) {
            	articles[0].classList.add('active');
			}

		}

	};


	// Gets the data and then renders
	// it to a data-bind
	APP.page = {

		schedule: function() {
			APP.request.xmlGet('https://api.leaguevine.com/v1/games/?tournament_id=19389&order_by=%5Bstart_time%5D&fields=%5Bid%2C%20team_1%2C%20team_2%2C%20start_time%2C%20team_1_score%2C%20team_2_score%5D&access_token=d6fb6c85cb/', function(data) {
				data = JSON.parse(data.response);
				console.log(data);
				Transparency.render(qwery('[data-bind=scheduleData]')[0], data.objects, APP.directives.schedule(data.objects));
				APP.router.change();		
			})
		},

		game: function() {
			APP.request.xmlGet('https://api.leaguevine.com/v1/games/?season_id=20167&fields=%5Bteam_1%2C%20team_1_score%2C%20team_2%2C%20team_2_score%5D&offset=2&access_token=d0cff4f798/', function(data) {
				data = JSON.parse(data.response);
				console.log(data);
				Transparency.render(qwery('[data-bind=gameData]')[0], data.objects, APP.directives.game(data.objects));
				APP.router.change();
			})
		},

		ranking: function() {
			APP.request.xmlGet('https://api.leaguevine.com/v1/teams/?season_id=20167&fields=%5Bid%2C%20leaguevine_url%2C%20losses%2C%20name%2C%20profile_image_50%2C%20season%2C%20wins%5D&access_token=d0cff4f798/', function(data) {
				data = JSON.parse(data.response);
				console.log(data);
				Transparency.render(qwery('[data-bind=rankingData]')[0], data.objects, APP.directives.ranking(data.objects));
				APP.router.change();
			})
		}

	};


	// All the thanks go to Joost "Josie" Faber
	// https://github.com/joostf

	// After data has been received it goes through here
	// so it can use functions on elements
	APP.directives = {

		schedule: function(data) {
			return {
				start_time: {
					text: function() {
						var date = this.start_time.split(/[T+]+/);
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


	// All is ready, let's get this show on the road
	domready(function() {
		APP.controller.init();
	});

})();