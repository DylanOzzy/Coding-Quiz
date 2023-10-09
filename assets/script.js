const questions = [
    {
        question: "What does HTML stand for?", 
        answers: [
            { text: "A) Hyper Text Markup Language", correct: true},
            { text: "B) High Technology Modern Language", correct: false},
            { text: "C) Hyperlinks and Text Markup Language", correct: false},
            { text: "D) Home Tool Markup Language", correct: false},
        ]
    },
    {
        question: "What does CSS stand for?", 
        answers: [
            { text: "A) Cascading Style Script", correct: false},
            { text: "B) Computer Style Sheet", correct: false},
            { text: "C) Creative Style System", correct: false},
            { text: "D) Cascading Style Sheets", correct: true},
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?", 
        answers: [
            { text: "A) var", correct: true},
            { text: "B) let", correct: false},
            { text: "C) variable", correct: false},
            { text: "D) v", correct: false},
        ]
    },
    {
        question: "Which HTML tag is used for creating a hyperlink?", 
        answers: [
            { text: "A) <link>", correct: false},
            { text: "B) <href>", correct: false},
            { text: "C) <a>", correct: true},
            { text: "D) <http>", correct: false},
        ]
    }
];

const questionEl = document.getElementById("question");
const timeEl = document.getElementById("timer");
const answerBtns  = document.getElementById("answerBtns");
const nextBtn  = document.getElementById("nextBtn");
const startQuizBtn = document.getElementById("startQuizBtn");
let secondsLeft = 10;
let currentQuestionIndex = 0;
let score = 0;

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft;
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        showScore();
      }
  
    }, 1000);
}

function sendMessage() {
    timeEl.textContent = "Time's Up";
    showScore();
}

function startQuizFunc() {
    var quizContainer = document.querySelector(".quizContainer");

    startQuiz();
}

function startQuiz() {
    var quizContainer = document.querySelector(".quizContainer");
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = 'block'
    startQuizBtn.style.display = 'none'
    nextBtn.textContent = "Next";
    showQuestion();
    setTime();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEl.textContent = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(event) {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score ++;
        secondsLeft += 2;
    } else {
        selectedBtn.classList.add("incorrect")
        secondsLeft -= 2;

        if(secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            showScore();
        }
    }
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block"
}

function showScore(){
    resetState();
    questionEl.textContent = `You scored ${score} out of ${questions.length}!`;
    nextBtn.textContent = 'Play again';
    nextBtn.style.display = "block";

    nextBtn.addEventListener("click", function() {
        window.location.reload(); // Reloads the page
    });
}

function quizEnd() {
    
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}


nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
});


startQuizBtn.addEventListener("click", function(event){
    startQuiz();
});
