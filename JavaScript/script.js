const questions = [
    {
        question: "Which is the capital city of Germany?",
        answers: [
            { text: "Rome", correct: false},
            { text: "Berlin", correct: true},
            { text: "Paris", correct: false},
            { text: "London", correct: false},
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "O2", correct: false},
            { text: "H2O", correct: true},
            { text: "CO2", correct: false},
            { text: "NaCl", correct: false},
        ]
    },
    {
        question: "Which movie features a young lion named Simba as the main character?",
        answers: [
            { text: "The Lion King", correct: true},
            { text: "Finding Nemo", correct: false},
            { text: "Madagascar", correct: false},
            { text: "Shrek", correct: false},
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Ag", correct: false},
            { text: "K", correct: false},
            { text: "Au", correct: true},
            { text: "Li", correct: false},
        ]
    },
    {
        question: "Which river is the longest in the world?",
        answers: [
            { text: "The Nile River", correct: true},
            { text: "Amazon River", correct: false},
            { text: "Yangtze River", correct: false},
            { text: "Mississippi River", correct: false},
        ]
    },
    {
        question: "What is the square root of 64?",
        answers: [
            { text: "54", correct: false},
            { text: "4", correct: true},
            { text: "74", correct: false},
            { text: "84", correct: false},
        ]
    },
    {
        question: "How many players are there on a standard soccer team?",
        answers: [
            { text: "10", correct: false},
            { text: "12", correct: false},
            { text: "11", correct: true},
            { text: "09", correct: false},
        ]
    },
    {
        question: "Who co-founded Microsoft along with Bill Gates?",
        answers: [
            { text: "Elon Musk", correct: false},
            { text: "Paul Allen", correct: true},
            { text: "Logan Paul", correct: false},
            { text: "Mark Zuckerburg", correct: false},
        ]
    },
    {
        question: "Which famous British rock band was fronted by Freddie Mercury?",
        answers: [
            { text: "Queen", correct: true},
            { text: "AC/DC", correct: false},
            { text: "Pink Floyd", correct: false},
            { text: "Nirvana", correct: false},
        ]
    },
    {
        question: "Which country has the most unique shaped flag in the world?",
        answers: [
            { text: "Srilanka", correct: false},
            { text: "Nepal", correct: true},
            { text: "Canada", correct: false},
            { text: "Bhutan", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn"); 

let currentQuestionIndex = 0; //variable to store the question index
let score = 0; // variable to store score

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();