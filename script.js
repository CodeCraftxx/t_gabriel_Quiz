
const questions = [
  {
    question: 'Cuál es el nombre del arbol que da olivas:',
    answers: [
      {text: 'El olivero', correct: false},
      {text: 'El olivo', correct: true},
      {text: 'Oliva', correct: false},
      {text: 'Olivano', correct: false}
    ]
  },
  {
    question: 'Cuál es la raiz cuadrada de 48:',
    answers: [
      {text: '7', correct: false},
      {text: '8', correct: true},
      {text: '4', correct: false},
      {text: '12', correct: false}
    ]
  },
  {
    question: 'Quién es conocida como la "reina del Pop":',
    answers: [
      {text: 'Katy Perry', correct: false},
      {text: 'Lady Gaga', correct: false},
      {text: 'Madonna', correct: true},
      {text: 'Beyoncé', correct: false}
    ]
  },
  {
    question: 'Cuales son los colores primarios:',
    answers: [
      {text: 'Rojo,Azul y Amarillo', correct: true},
      {text: 'Verde, rojo, azul', correct: false},
      {text: 'Azul, Amarillo, Naranja', correct: false},
      {text: 'Amarillo, Rojo, Blanco', correct: false}
    ]
  },
  {
    question: 'Cuál es el país más pequeño del mundo:',
    answers: [
      {text: 'Ciudad del vaticano', correct: true},
      {text: 'Leichtenstein', correct: false},
      {text: 'Seychelles', correct: false},
      {text: 'Bután', correct: false}
    ]
  },
]

const questionBtn = document.getElementById('question');
const answerBtn = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next');
const noQuestion = document.getElementById('number-questions');
let xpEl = document.getElementById('xpText');
let levelEl = document.getElementById('levelText');
let currentQuestionIndex = 0;
let score = 0;
let xp = 50;
let level = 1;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;

  nextBtn.innerHTML = 'Next';
  showQuestion();
}
function showQuestion(){
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionBtn.innerHTML = currentQuestion.question;
  noQuestion.innerHTML = '0' + questionNo + '/' + questions.length; 

  resetState();
  
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    answerBtn.appendChild(button);
    button.classList.add('btn');

    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  })

}

function resetState(){
  nextBtn.style.display = 'none';

  while(answerBtn.firstChild){
    answerBtn.removeChild(answerBtn.firstChild);
  }
}
function selectAnswer(e){
  let selectedBtn = e.target;
  let isCorrect = selectedBtn.dataset.correct === 'true';

  if(isCorrect){
    selectedBtn.classList.add('correct');
    score++
    xp += 30;
    xpEl.innerHTML = xp;
  }else{
    selectedBtn.classList.add('incorrect')
  }
  Array.from(answerBtn.children).forEach(button =>{
    if(button.dataset.correct === 'true'){
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextBtn.style.display = 'block';
}

function showScore(){
  resetState();
  questionBtn.innerHTML = `You scored ${score} out of ${questions.length}`
  if(score >= 3){
    level++
    levelEl.innerHTML ='0' + level;
  }
  nextBtn.innerHTML = 'Play Again';
  nextBtn.style.display = 'block';
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextBtn.addEventListener('click',()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})


startQuiz();