// NOTE: Calls all of the elements and classes referenced in the html
const questionM = document.getElementById("questionM");
const choicesM = Array.from(document.getElementsByClassName("choice-textM"));
const progressTextM = document.getElementById("progressTextM");
const scoreTextM = document.getElementById("scoreM");
const progressBarFullM = document.getElementById("progressBarFullM");
const loaderM = document.getElementById("loaderM");
const gameM = document.getElementById("gameM");
let currentQuestionM = {};
let acceptingAnswersM = false; //to create a second delay after someone answers beofre letting them answer to give the script enough time to log and pull up the information
let scoreM = 0;
let questionCounterM = 0;
let availableQuestionsM = []; //copy of full question set and will take out a question from the availible questions so it doesnt get repeated
let questionsM = [];



// NOTE: calls the question from OPEN DB and returns the information into the areas specified in the html
fetch(
    'https://opentdb.com/api.php?amount=33&category=19&type=multiple'
)
    .then((res) => {
     return res.json();
    })
    .then((loadedQuestions) => {
        questionsM = loadedQuestions.results.map((loadedQuestion) => {
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
        startGameM();
    })
    .catch((err) => {
        console.error(err);
    });



// NOTE: Counts the number of points if the answer is clicked correctly
const CORRECT_BONUSM = 10; //how many points the question is worth
const MAX_QUESTIONSM = 10; //number of questions available in each game

startGameM = () => {
  questionCounterM = 0;
  scoreM = 0;
  availableQuestionsM = [...questionsM]; //...questions means that it will take the array, spread out all of the items and put it into a new array and thats what availible questions is going to be
  getNewQuestionM();
  gameM.classList.remove("hidden"); //when the game is ready it will display
  loaderM.classList.add("hidden"); //when the game is ready the loader will dissappear to show the question
};

getNewQuestionM = () => {
  if (availableQuestionsM.length === 0 || questionCounterM >= MAX_QUESTIONSM) {//once we have gone through all the questions availible or have maxed out the number of questions set it will end the game
    localStorage.setItem("mostRecentScoreM", scoreM);
    //go to the end page
    return window.location.assign("#maths_end");
  }
  questionCounterM++;
  progressTextM.innerHTML = `Question ${questionCounterM}/${MAX_QUESTIONSM}`; //what number question they are on out of the max number of questions using es6 template literals
  //Update the progress bar
  progressBarFullM.style.width = `${(questionCounterM / MAX_QUESTIONSM) * 100}%`;//calculates how far we are and displays in the progress bar with the needed percentage

  const questionIndex = Math.floor(Math.random() * availableQuestionsM.length); //get a random number between 0 and max number of questions and will display the question related to that number
  currentQuestionM = availableQuestionsM[questionIndex];
  questionM.innerHTML = currentQuestionM.question;//it will display the question and options in the html text, so it will pull the question and display it

  choicesM.forEach(choice => { //will display the options to the question being displayed due to the script above
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestionM["choice" + number];
  });

  availableQuestionsM.splice(questionIndex, 1); //takes the availible questions array and removes the question that had just been displayed
  acceptingAnswersM = true; //it will allow the user to answer
};

choicesM.forEach(choice => {
  choice.addEventListener("click", e => {//add an event listener so the console can log which option was clicked
    if (!acceptingAnswersM) return; //if we arent ready for the answer to be clicked it will just ignore it

    acceptingAnswersM = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestionM.answer ? "correct" : "incorrect"; //uses a ternary syntax operator so that if this condition is true it will assign the equivelant value


    if (classToApply === "correct") { //makes the bottom code work as it calls the information
      incrementScoreM(CORRECT_BONUSM);
    }



    selectedChoice.parentElement.classList.add(classToApply); //it will only apply the class for long enough to show the colour before dissapearing to display the next question
    setTimeout(() => {//gives a delay before removing the class
      selectedChoice.parentElement.classList.remove(classToApply);

      getNewQuestionM();//will load the next question
    }, 1000/*the amount of time delayed*/);
  });
});

incrementScoreM = num => { //checks if they got the correct answer then adds on the number of points and displays in the hud
  scoreM += num;
  scoreTextM.innerHTML = scoreM;
};
