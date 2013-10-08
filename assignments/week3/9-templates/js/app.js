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
			APP.gameLoad.loadData();
		}

	};

	// Apply data to the different 'pages'

	APP.schedule = {
		title: 'Schedule',
		description: 'This is the schedule.'
	};

	APP.ranking = {

		title: 'Ranking',
		description: 'This is the ranking.'

	};

	APP.game = {
		title: 'Game',
		description: 'This is the game.'
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


	APP.gameLoad = {

		loadData: function() {
			APP.request.xmlRequest('GET', 'data/teams.json', function(data) {
				var data = JSON.parse(data.response);
				
				// Called here because I could not get the directives to behave
				Transparency.render(qwery('[data-bind=gameInfo]')[0], data);
				console.log(data);
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
			Transparency.render(qwery('[data-route=game]')[0], APP.game, APP.gameDirectives);
			APP.router.change();
		}
	};

	////////////////////// This is a well commented line
	domready(function() {
		APP.controller.init();
	});

})();