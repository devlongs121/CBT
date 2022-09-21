const form = document.querySelector(".start");
const input = document.querySelector("#identityNumber");

window.addEventListener("load", () => {
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();


        const id = input.value.toUpperCase();

        if (id === "PASSWORD" || id === "DUNA" || id === "0000" && id != "") {

            let quizStart =
                `
                <h1>E.M.S SCHOOL JOS</h1>
            <div class="quiz-header">
                <p id="progress">Question x of y</p>
                <p id="count-down"></p>
            </div>
            <p id="question"></p>

            <div class="buttons">
                <button class="btn" id="btn0">
                    A. <span id="choice0"></span>
                </button>
                <button class="btn" id="btn1">
                    B. <span id="choice1"></span>
                </button>
                <button class="btn" id="btn2">
                    C. <span id="choice2"></span>
                </button>
                <button class="btn" id="btn3">
                    D. <span id="choice3"></span>
                </button>
            </div>

            <hr>


            <footer>
                <p>By Duna Longul (longzy Or devlong's).</p>
            </footer>
            `;
            let quizStartElement = document.getElementById("quiz");
            quizStartElement.innerHTML = quizStart;

            // CREATE A QUIZ CLASS
            class Quiz {
                constructor(questions) {
                    this.score = 0;
                    this.questions = questions;
                    this.questionIndex = 0;
                }

                getQuestionIndex() {
                    return this.questions[this.questionIndex];
                }

                guess(answer) {
                    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
                        this.score++;
                    }
                    this.questionIndex++;
                }

                isEnded() {
                    return this.questionIndex === this.questions.length;
                }
            }

            // CREATE A QUESTION CLASS
            class Question {
                constructor(text, choices, answer) {
                    this.text = text;
                    this.choices = choices;
                    this.answer = answer;
                }

                isCorrectAnswer(choice) {
                    return this.answer === choice;
                }
            }

            //DISPLAY QUESTION
            function displayQuestion() {
                if (quiz.isEnded()) {
                    showScores();
                } else {
                    //SHOW QUESTION
                    // for (let i =0; i<quiz.questions.length; i++){
                    let questionElement = document.getElementById("question");
                    questionElement.innerHTML = quiz.getQuestionIndex().text;
                    // }

                    // SHOW OPTIONS
                    let choices = quiz.getQuestionIndex().choices;
                    for (let i = 0; i < choices.length; i++) {
                        let choiceElement = document.getElementById("choice" +

                            // Math.floor(Math.random()*(choices.length-i)+i)); 

                            i);
                        choiceElement.innerHTML = choices[i];
                        guess("btn" + i, choices[i]);
                    }

                    showProgress();
                }
            };

            //GUESS FUNCTION
            function guess(id, guess) {
                let button = document.getElementById(id);
                button.onclick = function () {
                    quiz.guess(guess);
                    displayQuestion();
                }
            }

            // Show quiz progress
            function showProgress() {
                let currentQuestionNumber = quiz.questionIndex + 1;
                let progressElement = document.getElementById("progress");
                progressElement.innerHTML =
                    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
            }

            // SHOW SCORE
            function showScores() {
                let quizEndHTML =
                    `
                <h1>CONGRATULATIONS </h1>
                <h2 id="score"> You Scored: ${quiz.score * 3} of ${quiz.questions.length * 3} </h2>

                <div class="quiz-repeat">
                <a href="cbtTest.html"> Take Quiz Again </a>
                </div>
            `;
                let quizElement = document.getElementById("quiz");
                quizElement.innerHTML = quizEndHTML;
            }

            // CREATE QUIZ QUESTIONS
            let questions = [
                new Question(
                    // "Which angle is this <img src='a.png' class='daigram' alt=''>"
                    "Microprocessors as switching devices are for which generation of computers.", [
                    "First Generation", "Second Genaration", "Thrid Generation", "Fourth Generation"], "Fourth Generation"
                ),
                new Question(
                    "Herman Hellerith machine was develop by Herman Hellerith.", [
                    "Agree", "Disagree", "Strongly Agree", "Strongly Disagree"], "Strongly Agree"
                ),
                new Question(
                    "Stones, Sticks, Fingers and Toes are example of modern counting device ", [
                    "Agree", "Disagree", "Strongly Agree", "Strongly Disagree"], "Strongly Disagree"
                ),
                new Question(
                    "One major problem with early counting devices is that", [
                    "THe occupy small space", "The waste time", "The can be used to count large numbers", "The are very fast "], "The waste time"
                ),
                new Question(
                    "Herman Hellerith machine was develop by John Von Neuman", [
                    "Agree", "Disagree", "Strongly Agree", "Strongly Disagree"], "Strongly Disagree"
                ),
                new Question(
                    "Stones, Sticks, Fingers and Toes are example of early counting device ", [
                    "Agree", "Disagree", "Strongly Agree", "Strongly Disagree"], "Strongly Agree"
                ),
                new Question(
                    "Integrated Circuits (ICs) are related to which of computers ?", [
                    "1st Generation", "2nd Generation", "3rd Generation", "4th Generation"], "3rd Generation"
                ),
                new Question(
                    "Herman Hellerith machine was develop by ?", [
                    "John Von Neuman", "Chalse Babege", "Dev Longs Neuman", "Herman Hellerith"], "Herman Hellerith"
                ),
                new Question(
                    "The machine used for processing census information was develop by", [
                    "John Von Neuman", "Herman Hellerith", "Dev Longs Neuman", "Chalse Babege"], "Herman Hellerith"
                ),
                new Question(
                    "MU stands for ", [
                    "Memory United", "Memory Union", "Mesenger Unit", "Memory Unit"
                ], "Memory Unit"
                )
            ];

            let quiz = new Quiz(questions);

            //  Display Question
            displayQuestion();


            // ADD COUNT-DOWN
            let time = 180;
            let quizTimeInMinutes = time * 60 ;
            quizTime = quizTimeInMinutes / 60;

            let counting = document.getElementById("count-down");

            function startCountdown() {
                let quizTimer = setInterval(function () {
                    if (quizTime <= 0) {
                        clearInterval(quizTimer);
                        showScores();
                    } else {
                        quizTime--;
                        let sec = Math.floor(quizTime % 60);
                        let min = Math.floor(quizTime / 60) % 60;
                        let hour = Math.floor(quizTime / 60 / 60) % 24;
                        counting.innerHTML = `TIME: ${hour} : ${min} : ${sec}`;
                    }
                }, 1000)
            }

            startCountdown();

        } else {
            const wrongInput = document.querySelector(".wrongInput");
            wrongInput.innerHTML = "Invalid Registration Number, Try Again."
        }
    });
    
})
;