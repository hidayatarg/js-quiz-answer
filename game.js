const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

const question = document.getElementById('question');
const choice = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
      question: "Inside which HTML element do we put the JavaScript??",
      choice1: "<script>",
      choice2: "<javascript>",
      choice3: "<js>",
      choice4: "<scripting>",
      answer: 1
    },
    {
      question:
        "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choice1: "<script href='xxx.js'>",
      choice2: "<script name='xxx.js'>",
      choice3: "<script src='xxx.js'>",
      choice4: "<script file='xxx.js'>",
      answer: 3
    },
    {
      question: " How do you write 'Hello World' in an alert box?",
      choice1: "msgBox('Hello World');",
      choice2: "alertBox('Hello World');",
      choice3: "msg('Hello World');",
      choice4: "alert('Hello World');",
      answer: 4
    }
];

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]
  // console.log(availableQuestions);
  
  getNewQuestion();
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // go to the end page question are finished
    return window.location.assign('/end.html')
  }
  questionCounter++;
  // Math.floor(Math.random() * 3)
 const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  // iterate on choice of the question
  choice.forEach(choice => {
    // get the data number
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });
  // delete the current question from the question array
  availableQuestions.splice(questionIndex, 1)
  acceptingAnswers = true;
}

choice.forEach(choice => {
    choice.addEventListener('click', e =>{
      // console.log(e.target)
      if (!acceptingAnswers)  return;
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];
      // after we anser get the new question

      const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

      console.log(classToApply)
      // update the class
      selectedChoice.parentElement.classList.add(classToApply)
      // timeout before remove the class
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion();
      }, 500);
    });
})

startGame();