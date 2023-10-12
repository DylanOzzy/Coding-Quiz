// These are the qustions with answers and data sets.
const questions = [
    {
        question: "Which of the following is not a valid data type in JavaScript?", 
        answers: [
            { text: " A) Number ", correct: false},
            { text: " B) String ", correct: false},
            { text: " C) Character ", correct: true},
            { text: " D) Boolean ", correct: false},
        ]
    },
    {
        question: "What does the `===` operator in JavaScript do?", 
        answers: [
            { text: " A) Compares two values for equality without type conversion. ", correct: true},
            { text: " B) Assigns a value to a variable. ", correct: false},
            { text: " C) Compares two values for equality with type conversion. ", correct: false},
            { text: " D) Checks if a variable is defined. ", correct: false},
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?", 
        answers: [
            { text: " A) v ", correct: false},
            { text: " B) let ", correct: false},
            { text: " C) variable ", correct: false},
            { text: " D) var ", correct: true},
        ]
    },
    {
        question: "Which of the following is the correct way to write a single-line comment in JavaScript?", 
        answers: [
            { text: " A) `/* This is a comment */` ", correct: false},
            { text: " B) `// This is a comment` ", correct: true},
            { text: " C) `# This is a comment` ", correct: false},
            { text: " D) `<!-- This is a comment -->` ", correct: false},
        ]
    }
];

// Constants and Variables declared in global scope. 
const questionEl = document.getElementById("question");
const timeEl = document.getElementById("timer");
const answerBtns  = document.getElementById("answerBtns");
const nextBtn  = document.getElementById("nextBtn");
const startQuizBtn = document.getElementById("startQuizBtn");
let secondsLeft = 10;
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let saveBtn = $("#saveBtn");
const initialsForm = $("#initials-form")


// Handles Timer function.
function setTime() {
    // Sets interval in variable
    timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
        
        if(secondsLeft < 1) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            showScore();
        }
        
    }, 1500);
};

// Sends the time up message in the times textContent. 
function sendMessage() {
    timeEl.textContent = "Time's Up";
};

// This is called when "Start Quiz" button is pressed.
function startQuiz() {
    var quizContainer = document.querySelector(".quizContainer");
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = 'block';
    startQuizBtn.style.display = 'none';
    nextBtn.textContent = "Next";
    showQuestion();
    setTime();
};

// This handles how questions are displayed and appended to the page. 
function showQuestion() {
    resetState();
    initialsForm.hide();
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
        button.addEventListener("click", selectAnswer);
    });
};

// This prevents the page from reverting back to default when a new question is loaded. 
function resetState() {
    nextBtn.style.display = "none";
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
};

// This handles if answers are correct or incorrect and awards points and seconds, and also applies classes to use color indication.
function selectAnswer(event) {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score += 5;
        secondsLeft += 3;
    } else {
        selectedBtn.classList.add("incorrect")
        secondsLeft -= 3;
        
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
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
};

//This shows the ending landing page for the quiz. Clears timer, shows times up, score, save initials, and reload the qiuz. 
function showScore(){
    resetState();
    clearInterval(timerInterval);
    sendMessage();
    questionEl.textContent = `You scored ${score} out of 20!`;
    nextBtn.style.display = "block";
    initialsForm.show();
    nextBtn.textContent = 'Play again';
    nextBtn.addEventListener("click", function() {
        window.location.reload();
    });
    
};

// This shows the next question in the currentQuestionIndex or shows score if there are no more questions. 
function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
};

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
});

startQuizBtn.addEventListener("click", function(event){
    startQuiz();
});

// We started learning about jQuery so I wanted to use it. 
saveBtn.on("click", (event)=>{
    const userInitials = $("#initials").val();
    event.preventDefault();
    localStorage.setItem("Initials", userInitials);
    localStorage.setItem("Score", score);
});
