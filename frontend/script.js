const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {
                text: "Shark", correct: false
            },
            {
                text: "Blue whale", correct: true
            },
            {
                text: "Elephant", correct: false
            },
            {
                text: "Giraffe", correct: false
            },
        ]
    },
    {
        question: "Who won the 2016 IPL",
        answers: [
            {
                text: "Sunrisers Hyderabad", correct: true
            },
            {
                text: "Royal Challengers Bangalore", correct: false
            },
            {
                text: "Chennai Super Kings", correct: false
            },
            {
                text: "Mumbai Indians", correct: false
            },
        ]
    },
    {
        question: "Who won the 2024 US Presedential Elections?",
        answers: [
            {
                text: "Donald Trump", correct: true
            },
            {
                text: "KA Paul", correct: false
            },
            {
                text: "Kamala Harris", correct: false
            },
        ]
    },
    {
        question: "Who won the Ballon Dior most number of times",
        answers: [
            {
                text: "Rodri", correct: false
            },
            {
                text: "Cristiano Ronaldo", correct: false
            },
            {
                text: "Lionel Messi", correct: true
            },
            {
                text: "Kylian Mbappe", correct: false
            },
        ]
    },
    {
        question: "Who is currently the richest person on the planet",
        answers: [
            {
                text: "Jeff Bezos", correct: false
            },
            {
                text: "Mukesh Ambani", correct: false
            },
            {
                text: "Bill Gates", correct: false
            },
            {
                text: "Elon Musk", correct: true
            },
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
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
    }
    else{
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
})
function toggleCorrect(button) {
    // Get all buttons in the same option group and remove the selected class
    const optionGroup = button.closest('.question-block');
    const allButtons = optionGroup.querySelectorAll('.correct-btn');
    
    allButtons.forEach(btn => btn.classList.remove('selected'));

    // Add the selected class to the clicked button
    button.classList.add('selected');
}


startQuiz();
