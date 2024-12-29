// Initialize an empty quiz object
let quiz = {
    title: '',
    questions: []
};

// Function to start quiz creation
function startQuizCreation() {
    const quizTitleInput = document.getElementById("quiz-title");
    quiz.title = quizTitleInput.value.trim();

    if (quiz.title === "") {
        alert("Please enter a quiz title.");
        return;
    }

    // Hide the title input and show the question form
    document.getElementById("quiz-title-section").style.display = "none";
    document.getElementById("question-form-section").style.display = "block";
}

// Function to add a question to the quiz being created
function addQuestion() {
    const questionText = document.getElementById("question-text").value.trim();
    const options = Array.from(document.querySelectorAll(".option-group .option-input"));
    const correctButton = document.querySelector(".correct-btn.selected");

    if (!questionText || options.some(option => !option.value.trim()) || !correctButton) {
        alert("Please complete the question and select a correct answer.");
        return;
    }

    const question = {
        text: questionText,
        answers: options.map((option, index) => ({
            text: option.value.trim(),
            correct: correctButton === option.nextElementSibling
        }))
    };

    quiz.questions.push(question);

    // Clear fields for the next question
    document.getElementById("question-text").value = "";
    options.forEach(option => option.value = "");
    correctButton.classList.remove("selected");

    // Enable "Save Quiz" after the first question
    if (quiz.questions.length > 0) {
        document.getElementById("save-quiz-btn").style.display = "block";
    }
}

// Function to save the quiz created by the user
async function saveQuiz() {
    if (quiz.questions.length === 0) {
        alert("Please add at least one question before saving the quiz.");
        return;
    }

    console.log("Quiz data to be sent:", quiz);

    try {
        const response = await fetch("http://localhost:5000/api/quizzes", { // Ensure the endpoint URL matches your backend
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quiz),
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Quiz "${quiz.title}" saved successfully!`);
            resetQuizForm();
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error("Error saving quiz:", error);
        alert("An error occurred while saving the quiz.");
    }
}

// Function to reset the quiz form
function resetQuizForm() {
    quiz = { title: "", questions: [] };
    document.getElementById("quiz-title").value = "";
    document.getElementById("quiz-title-section").style.display = "block";
    document.getElementById("question-form-section").style.display = "none";
}

// Function to toggle the correct option during quiz creation
function toggleCorrect(button) {
    // Remove selected class from all buttons in the current question
    const optionGroup = button.closest('.question-block');
    optionGroup.querySelectorAll('.correct-btn').forEach(btn => btn.classList.remove('selected'));

    // Add the selected class to the clicked button
    button.classList.add('selected');
}
