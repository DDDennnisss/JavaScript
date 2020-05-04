(function () {
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    function updateScore() {
        var score = 0;
        return function (correct) {
            if (correct) {
                score++;
            }
            return score;
        }
    }

    var keepScore = updateScore();

    Question.prototype.displaySocre = function (score) {
        console.log("Your current socre is: " + score);
        console.log("-------------------------------------------");
    }

    Question.prototype.displayQuestion = function () {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i])
        }
    }

    Question.prototype.checkAnswer = function (ans, callback) {
        var score;

        if (ans === this.correct) {
            console.log('Correct answer!');
            score = callback(true);
        }
        else {
            console.log('Wrong answer. try again!');
            score = callback(false);
        }

        this.displaySocre(score);
    }

    function nextQuestion() {
        var q1 = new Question("is Javascript the coolest?", ['Yes', 'No'], 0);
        var q2 = new Question("Whats the name of this courses' teacher?", ['Dennis', 'John', 'Ash'], 2);
        var q3 = new Question("Whats does the best decrible coding?", ['boring', 'hard', 'fun', 'interesting'], 3);

        var questions = [q1, q2, q3]
        var n = Math.floor(Math.random() * questions.length);

        questions[n].displayQuestion();

        var answer = prompt('Please select the correct answer.');

        if (answer !== 'exit') {
            questions[n].checkAnswer(parseInt(answer), keepScore);
            nextQuestion();
        }
    }

    nextQuestion();
})();


