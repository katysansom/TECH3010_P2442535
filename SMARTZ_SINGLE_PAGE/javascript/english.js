// NOTE: Calls all of the elements and classes referenced in the html
const questionE = document.getElementById("questionE");
const choicesE = Array.from(document.getElementsByClassName("choice-textE"));
const progressTextE = document.getElementById("progressTextE");
const scoreTextE = document.getElementById("scoreE");
const progressBarFullE = document.getElementById("progressBarFullE");
const loaderE = document.getElementById("loaderE");
const gameE = document.getElementById("gameE");
let currentQuestionE = {};
let acceptingAnswersE = false; //to create a second delay after someone answers beofre letting them answer to give the script enough time to log and pull up the information
let scoreE = 0;
let questionCounterE = 0;
let availableQuestionsE = []; //copy of full question set and will take out a question from the availible questions so it doesnt get repeated
let questionsE = [];



// NOTE: calls the question from OPEN DB and returns the information into the areas specified in the html
fetch(
    'https://opentdb.com/api.php?amount=33&category=10&type=multiple'
)
    .then((res) => {
     return res.json();
    })
    .then((loadedQuestions) => {
        questionsE = loadedQuestions.results.map((loadedQuestion) => {
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
        startGameE();
    })
    .catch((err) => {
        console.error(err);
    });



// NOTE: Counts the number of points if the answer is clicked correctly
const CORRECT_BONUSE = 10; //how many points the question is worth
const MAX_QUESTIONSE = 10; //number of questions available in each game

startGameE = () => {
  questionCounterE = 0;
  scoreE = 0;
  availableQuestionsE = [...questionsE]; //...questions means that it will take the array, spread out all of the items and put it into a new array and thats what availible questions is going to be
  getNewQuestionE();
  gameE.classList.remove("hidden"); //when the game is ready it will display
  loaderE.classList.add("hidden"); //when the game is ready the loader will dissappear to show the question
};

getNewQuestionE = () => {
  if (availableQuestionsE.length === 0 || questionCounterE >= MAX_QUESTIONSE) {//once we have gone through all the questions availible or have maxed out the number of questions set it will end the game
    localStorage.setItem("mostRecentScoreE", scoreE);

    //go to the end page
    return window.location.assign("#english_end");
  }
  questionCounterE++;
  progressTextE.innerHTML = `Question ${questionCounterE}/${MAX_QUESTIONSE}`; //what number question they are on out of the max number of questions using es6 template literals
  //Update the progress bar
  progressBarFullE.style.width = `${(questionCounterE / MAX_QUESTIONSE) * 100}%`;//calculates how far we are and displays in the progress bar with the needed percentage

  const questionIndex = Math.floor(Math.random() * availableQuestionsE.length); //get a random number between 0 and max number of questions and will display the question related to that number
  currentQuestionE = availableQuestionsE[questionIndex];
  questionE.innerHTML = currentQuestionE.question;//it will display the question and options in the html text, so it will pull the question and display it

  choicesE.forEach(choice => { //will display the options to the question being displayed due to the script above
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestionE["choice" + number];
  });

  availableQuestionsE.splice(questionIndex, 1); //takes the availible questions array and removes the question that had just been displayed
  acceptingAnswersE = true; //it will allow the user to answer
};

choicesE.forEach(choice => {
  choice.addEventListener("click", e => {//add an event listener so the console can log which option was clicked
    if (!acceptingAnswersE) return; //if we arent ready for the answer to be clicked it will just ignore it

    acceptingAnswersE = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestionE.answer ? "correct" : "incorrect"; //uses a ternary syntax operator so that if this condition is true it will assign the equivelant value


    if (classToApply === "correct") { //makes the bottom code work as it calls the information
      incrementScoreE(CORRECT_BONUSE);
    }



    selectedChoice.parentElement.classList.add(classToApply); //it will only apply the class for long enough to show the colour before dissapearing to display the next question
    setTimeout(() => {//gives a delay before removing the class
      selectedChoice.parentElement.classList.remove(classToApply);

      getNewQuestionE();//will load the next question
    }, 1000/*the amount of time delayed*/);
  });
});

incrementScoreE = num => { //checks if they got the correct answer then adds on the number of points and displays in the hud
  scoreE += num;
  scoreTextE.innerHTML = scoreE;
};
