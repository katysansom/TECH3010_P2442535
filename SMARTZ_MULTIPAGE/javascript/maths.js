const question = document.getElementById("question"); //gives a reference to the class choice text in the html
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswers = false; //to create a second delay after someone answers beofre letting them answer to give the script enough time to log and pull up the information
let score = 0;
let questionCounter = 0;
let availableQuesions = []; //copy of full question set and will take out a question from the availible questions so it doesnt get repeated

let questions = [];

/*fetch("questions.json") //will pull and questions stored in the json file so that i can have the questions stored locally//
.then( res=>{
  console.log(res);
  return res.json();
})
.then( loadedQuestions => {
  console.log(loadedQuestions)
  questions = loadedQuestions;
  startGame();
});*/
fetch(
    'https://opentdb.com/api.php?amount=33&category=19&type=multiple'
) //will get questions from open trivia db using the api
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });



//CONSTANTS
const CORRECT_BONUS = 10; //how many points the question is worth
const MAX_QUESTIONS = 10; //number of questions available in each game

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions]; //...questions means that it will take the array, spread out all of the items and put it into a new array and thats what availible questions is going to be
  getNewQuestion();
  game.classList.remove("hidden"); //when the game is ready it will display
  loader.classList.add("hidden"); //when the game is ready the loader will dissappear to show the question
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {//once we have gone through all the questions availible or have maxed out the number of questions set it will end the game
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerHTML = `Question ${questionCounter}/${MAX_QUESTIONS}`; //what number question they are on out of the max number of questions using es6 template literals
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;//calculates how far we are and displays in the progress bar with the needed percentage

  const questionIndex = Math.floor(Math.random() * availableQuesions.length); //get a random number between 0 and max number of questions and will display the question related to that number
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;//it will display the question and options in the html text, so it will pull the question and display it

  choices.forEach(choice => { //will display the options to the question being displayed due to the script above
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1); //takes the availible questions array and removes the question that had just been displayed
  acceptingAnswers = true; //it will allow the user to answer
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {//add an event listener so the console can log which option was clicked
    if (!acceptingAnswers) return; //if we arent ready for the answer to be clicked it will just ignore it

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; //uses a ternary syntax operator so that if this condition is true it will assign the equivelant value


    if (classToApply === "correct") { //makes the bottom code work as it calls the information
      incrementScore(CORRECT_BONUS);
    }



    selectedChoice.parentElement.classList.add(classToApply); //it will only apply the class for long enough to show the colour before dissapearing to display the next question
    setTimeout(() => {//gives a delay before removing the class
      selectedChoice.parentElement.classList.remove(classToApply);

      getNewQuestion();//will load the next question
    }, 1000/*the amount of time delayed*/);
  });
});

incrementScore = num => { //checks if they got the correct answer then adds on the number of points and displays in the hud
  score += num;
  scoreText.innerHTML = score;
};
