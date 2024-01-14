// Get variables from HTML
var timer = document.getElementById('time'); //Timer
var timerText = document.getElementById('Bigtime'); //Timer text
var startScreen = document.getElementById('start-screen'); //Start screen
var start = document.getElementById('start'); //Start btn
var endScreen = document.getElementById('end-screen'); //Last screen
var score = document.getElementById('final-score'); //Final score
var initials = document.getElementById('initials'); //User's initials 3 max
var submit = document.getElementById('submit'); //Submit button
var feedback = document.getElementById('feedback'); //Feedback
var questionsPage = document.getElementById('questions'); //Question page
var questions = document.getElementById('question-title'); //Questions
var choices = document.getElementById('choices'); //Choices

//Assign variables for audio files
var correctsound = new Audio('./assets/sfx/correct.wav');
var incorrectsound = new Audio('./assets/sfx/incorrect.wav');

// Timer that counts down from 100s
var timeLeft = 50;     //Set initial time to 100
function countdown() {
    // Use the 'setInterval()' method to count down every 1000ms
    var timeInterval = setInterval(function(){
        //If statement for counter. End game when reaches 0
        if (timeLeft > 0) {
            timer.textContent = timeLeft + 's';
            timeLeft--;
        } else {
            timer.textContent = 0 + 's';
            endGame(); //Function to end the game.
        }
    }, 1000);
};

// Create global variables to be used locally by the quizz function
var questionOutput = [];
var answerChoices = [];
var finalScore = null;

//Define the quizz function
function quizz() {
    // Initialise the question index
    let currentQuestionIndex = 0;

    // Function to display the current question and choices
    function displayQuestion() {
        if (currentQuestionIndex < JSquizz.length) {
            // Get the current question and choices
            const currentQuestion = JSquizz[currentQuestionIndex];
            const questionOutput = currentQuestion.question;
            const answerChoices = currentQuestion.answers;
            const correctChoice = currentQuestion.correctAnswer;

            // Display the question
            questions.textContent = questionOutput;

            // Render a list of buttons for the choices
            choices.innerHTML = "";
            for (let i = 0; i < answerChoices.length; i++) {
                const li = document.createElement("li");
                const choiceBtn = document.createElement("button");
                choiceBtn.textContent = answerChoices[i];

                // Add a click event listener to the button to move to next question
                choiceBtn.addEventListener('click', function () {
                    // Register user's choice
                    var userChoice = choiceBtn.textContent;
                    if(userChoice === correctChoice) {
                        //feedback correct
                        feedback.setAttribute("class","feedback start");
                        feedback.textContent = "Correct!"
                        //Play correct sound
                        correctsound.play();
                    } else {
                        //feedback wrong!
                        //cut time by 10s
                        feedback.setAttribute("class","feedback start");
                        feedback.textContent = "Wrong!"
                        timeLeft = timeLeft - 10;
                        //Play incorrect sound
                        incorrectsound.play();
                    };

                    //Only display feedback for 1 second
                    setTimeout(function(){
                        feedback.setAttribute("class","feedback hide"); //Hide feedback
                    }, 1000); //Show feedback for 1 second.

                    // Move on to the next question
                    currentQuestionIndex++;
                    // Display the next question
                    displayQuestion();
                });

                // Append the button to the list item and the list item to the choices container
                li.appendChild(choiceBtn);
                choices.appendChild(li);
            }
        } else {
            // Quiz finished
            finalScore = timeLeft;
            console.log("Quiz finished");
            console.log("The final score is "+ finalScore);
            endGame();
        }
    }

    // Start displaying the first question
    displayQuestion();
}

//Event listener to trigger quiz start and timer
start.addEventListener("click",function() {
    countdown();    //When clicked start the countdown
    startScreen.setAttribute("class","hide"); //Hide start-screen
    questionsPage.setAttribute("class","start"); //Move on to the questions in questions.js
    quizz();
});

//End-screen
function endGame() {
    questionsPage.setAttribute("class","hide"); //Hide questions
    endScreen.setAttribute("class","start"); //Last page
    timerText.setAttribute("class","hide"); //Remove timer from end-page
    if(finalScore >0){
        score.textContent = finalScore;
    } else {
        score.textContent = 0;
    };

    //Store user's initials and score to localStorage and go to Highscore page
    submit.addEventListener("click", function(){
        //Assign user's initials input to variable
        var userInitials = initials.value;
        //If user's initials exceed max stated in HTML syntax
        if(userInitials.length <= JSON.parse(initials.getAttribute("max"))) {
            localStorage.setItem("score",JSON.stringify([userInitials, score.textContent]));
            window.location.href = "highscores.html";
        } else {
            feedback.setAttribute("class","feedback start");
            feedback.textContent = "Maximum character of 3!"
        };
        //Only display feedback for 1 second
        setTimeout(function(){
            feedback.setAttribute("class","feedback hide"); //Hide feedback
        }, 1500); //Show warning for 1.5 seconds.
    })
};
