function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
}

Question.prototype.displayQuestion = function () {
    console.log(this.question);

    for (var i = 0; i < this.answers.length; i++) {
        console.log(i+': '+this.answers[i])
    }
}

Question.prototype.checkAnswer = function(ans){
    if(ans === this.correct){
        console.log('Correct answer!')
    }
    else{
        console.log('Wrong answer. try again!')
    }
}

var q1 = new Question("is Javascript the coolest?", ['Yes', 'No'], 0);
var q2 = new Question("Whats the name of this courses' teacher?", ['Dennis', 'John', 'Ash'], 2);
var q3 = new Question("Whats does the best decrible coding?", ['boring', 'hard', 'fun', 'interesting'], 3);

var questions = [q1, q2, q3]
var n = Math.floor(Math.random() * questions.length);

questions[n].displayQuestion();

var answer = parseInt(prompt('Please select the correct answer.'));

questions[n].checkAnswer(answer);