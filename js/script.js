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
