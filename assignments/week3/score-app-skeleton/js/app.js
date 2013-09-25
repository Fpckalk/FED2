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

	};

	// Apply data to the different 'pages'

	APP.schedule = {
		title: 'Pool A - Schedule',
		description: 'This is the schedule.',
		scheduleData: [

			{ date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
		    { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
		    { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
		    { date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
		    { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},    
		    { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
		    { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
		    { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
		    { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
		    { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}

		]
	};

	APP.game = {
		title: 'Game',
		description: 'This is the game.',
		gameData: [

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
	};

	APP.ranking = {

		title: 'Pool A - Ranking',
		description: 'This is the ranking.',
		rankingData: [

			{ team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
			{ team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
			{ team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
			{ team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
			{ team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}

		]

	};



	/* Transparency Directives
	 * These are functions passed onto the corresponding Transparency objects
	 * which can be found under APP.game
	*/

	APP.scheduleDirectives = {
		result: {
			text: function(params) {
				return params.value + this.scheduleData[params.index].team1Score + " - " + this.scheduleData[params.index].team2Score;
			}
		}
	};

	APP.gameDirectives = {
		result: {
			text: function(params) {
				return params.value + this.gameData[params.index].team1Score + " - " + this.gameData[params.index].team2Score;
			}
		}
	};

	APP.rankingDirectives = {
		result: {
			text: function(params) {
				return params.value + (parseFloat(this.rankingData[params.index].Pw) - parseFloat(this.rankingData[params.index].Pl));
			}
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
			Transparency.render(qwery('[data-route=schedule]')[0], APP.schedule, APP.scheduleDirectives);
			APP.router.change();
		},

		game: function () {
			Transparency.render(qwery('[data-route=game]')[0], APP.game, APP.gameDirectives);
			APP.router.change();
		},

		ranking: function () {
			Transparency.render(qwery('[data-route=ranking]')[0], APP.ranking, APP.rankingDirectives);
			APP.router.change();
		}

	};

	////////////////////// This is a well commented line
	domready(function() {
		APP.controller.init();
	});

})();