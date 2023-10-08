const questions = [
    {
        question: "What does HTML stand for?", 
        answers: [
            {text: "A) Hyper Text Markup Language", correct: true},
            {text: "B) High Technology Modern Language", correct: false},
            {text: "C) Hyperlinks and Text Markup Language", correct: false},
            {text: "D) Home Tool Markup Language", correct: false},
        ]
    },
    {
        question: "What does CSS stand for?", 
        answers: [
            {text: "A) Cascading Style Script", correct: false},
            {text: "B) Computer Style Sheet", correct: false},
            {text: "C) Creative Style System", correct: false},
            {text: "D) Cascading Style Sheets", correct: true},
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?", 
        answers: [
            {text: "A) var", correct: true},
            {text: "B) let", correct: false},
            {text: "C) variable", correct: false},
            {text: "D) v", correct: false},
        ]
    },
    {
        question: "Which HTML tag is used for creating a hyperlink?", 
        answers: [
            {text: "A) <link>", correct: false},
            {text: "B) <href>", correct: false},
            {text: "C) <a>", correct: true},
            {text: "D) <http>", correct: false},
        ]
    }
];

const questionEl = document.getElementById("question");
const answerBtns  = document.getElementById("answerBtns");
const nextBtn  = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.textContent = "Next";
    showQuestion();
    
}