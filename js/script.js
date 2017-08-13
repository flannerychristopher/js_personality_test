function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrect = function(choice) {
  return this.answer === choice;
};

function Test(questions) {
  this.questions = questions;
  this.score = 0;
  this.questionIndex = 0;
}

Test.prototype.guess = function(answer) {
  if ( this.currentQuestion().isCorrect(answer) ) this.score++;
  this.questionIndex++;
};

Test.prototype.currentQuestion = function() {
  return this.questions[this.questionIndex];
};

Test.prototype.isComplete = function() {
  return this.questionIndex >= this.questions.length;
};

//create test and display
var questions = [
  new Question('Do you prefer kittens or cockroaches?', ['kittens', 'cockroaches'], 'kittens'),
  new Question('Do you prefer puppies or mosquitoes?', ['puppies', 'mosquitoes'], 'puppies')
]
var test = new Test(questions);

//TestUI
var TestUI = {
  displayNext: function() {
    if ( test.isComplete() ) {
      this.displayScore();
    } else {
      this.displayQuestion();
      this.displayChoices();
      this.displayProgress();
    }
  },

  displayProgress: function() {
    let currentQuestionNum = test.questionIndex + 1;
    this.findIdInsertHTML('progress', `Questions ${currentQuestionNum} of ${test.questions.length}`);
  },

  displayQuestion: function() {
    this.findIdInsertHTML('question', test.currentQuestion().text);
  },

  displayChoices: function() {
    let choices = test.currentQuestion().choices;
    for (var i = 0; i < choices.length; i++) {
      this.findIdInsertHTML('choice' + i, choices[i]);
      this.guessHandler('guess' + i, choices[i]);
    }
  },

  displayScore: function() {
    this.findIdInsertHTML('test', `You've completed the test. Your score is ${test.score}.`);
  },

  findIdInsertHTML: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },

  guessHandler: function(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
      test.guess(guess);
      TestUI.displayNext();
    }
  }

}

TestUI.displayNext();
