$('#start').on('click', function() {
	$('#start').remove();
	game.loadQuestion();
});

$(document).on('click', '.answer-button', function(e){
	game.clicked(e);
});

$(document).on('click', '#reset', function(){
	game.reset();
});

//e is typically used for events

var questions = [{
	question: "What is a sentence summary of zen?",
	answers: ["a Japanese school of Mahayana Buddhism emphasizing the value of meditation and intuition", "a term used to be happy", "a lifestyle that is meant to teach self-discipline", "was started in Africa"],
	correctAnswer: "a Japanese school of Mahayana Buddhism emphasizing the value of meditation and intuition",
	image: "images/enso.png",
}, {
	question: "What is the capital of California?",
	answers: ["Los Angeles", "Hollywood", "San Diego", "Sacramento", "Berkeley"],
	correctAnswer: "Sacramento",
	image: "images/sacramento.jpg",
}, {
	question: "What is the most popular computer programming language in 2017?",
	answers: ["python", "java", "javaScript", "mySQL", "c++"],
	correctAnswer: "javaScript",
	image: "images/javaScript.png",
}, {
	question: "What does the DOM stand for in javaScript?",
	answers: ["do or move", "death or moon", "dualistic or monistic", "document object model", "data on models"],
	correctAnswer: "document object model",
	image: "images/DOM.svg",
}, {
	question: "What is not a letter in the Hawaiian alphabet",
	answers: ["a", "b", "e", "m", "k"],
	correctAnswer: "b",
	image: "images/b.jpg",
}, {
	question: "What is the California state animal?",
	answers: ["apple", "tiger", "dolphin", "blue whale", "grizzly bear"],
	correctAnswer: "grizzly bear",
	image: "images/grizzly.jpg",
}];

var game = {
	questions: questions,
	currentQuestion: 0,
	counter: 30,
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	countDown: function() {
		game.counter--;
		$('#counter').html(game.counter);
		if(game.counter <= 0){
			console.log("time Up!");
			game.timeUp();
		}
	},
	loadQuestion: function(){
		timer = setInterval(game.countDown,1000);
		//add timer to the page
		$('#subwrapper').html("<h2>Time Remaining: <span id='counter'>30</span> seconds</h2>");
		//posts the question to the page
		$('#subwrapper').append("<h2>"+ questions[game.currentQuestion].question+"</h2>");
		//posts the answers to the corresponging question
		for(var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
			$('#subwrapper').append('<button class="btn btn-success answer-button" id="button-'+i+'" data-name="'+ questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
		}
	},
	nextQuestion: function(){
		game.counter = 30;
		$('#counter').html(game.counter);
		game.currentQuestion++;
		game.loadQuestion();
	},
	timeUp: function(){
		clearInterval(timer);
		game.unanswered++;
		$('#subwrapper').html('<h2>OUT OF TIME</h2>');
		$('#subwrapper').append('<h3>The correct answer was: '+ questions[game.currentQuestion].correctAnswer + "</h3>");
		if(game.currentQuestion == questions.length-1) {
			setTimeout(game.results, 3*1000);
		}
		else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}

	},
	results: function(){
		clearInterval(timer);
		$('#subwrapper').html("<h2> All Done! </h2>");
		$('#subwrapper').append("<h3>Correct: " + game.correct + "</h3>");
		$('#subwrapper').append("<h3>Incorrect: " + game.incorrect +"</h3>");
		$('#subwrapper').append("<h3>Unanswered: " + game.unanswered + "</h3>");
		$('#subwrapper').append("<button class='btn btn-success' id='reset'>RESET</button>");
		// console log the scores of the questions below (cumulative)
		console.log(game.unanswered + game.correct + game.incorrect);
	},
	clicked: function(e){
		clearInterval(timer);
		if($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
			game.answeredCorrectly();
		} 
		else {
			game.answeredIncorrectly();
		} 
	},
	answeredCorrectly: function(){
		console.log("you nailed it");
		clearInterval(timer);
		game.correct++;
		$('#subwrapper').append('<h2>YOU GOT IT RIGHT</h2><br><img src="' + questions[game.currentQuestion].image +'" style="width: 300px; height: auto">');

		if(game.currentQuestion == questions.length-1) {
			setTimeout(game.results, 3 * 1000);
		}
		else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}

	},
	answeredIncorrectly: function(){
		console.log("wrong, try again");
		clearInterval(timer);
		game.incorrect++;
		$('#subwrapper').html('<h2>Wrong answer, next question!<h2><br><img src="images/thumbDown.png" style="width: 300px; height: auto" alt="Boo!">');
		if(game.currentQuestion == questions.length-1) {
			setTimeout(game.results, 3 * 1000);
		}
		else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},
	reset: function(){
		//reset back to original state
		game.currentQuestion = 0;
		game.counter = 30;
		game.correct = 0;
		game.incorrect = 0;
		game.unanswered = 0;
		game.loadQuestion();
	},
} 
