// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
   apiKey: "AIzaSyCMFs71IzGS2hz5FOl8QMVbGTeG-fnI3hE",
   authDomain: "smartzsinglepage-9c0f9.firebaseapp.com",
   databaseURL: "https://smartzsinglepage-9c0f9-default-rtdb.firebaseio.com/",
   projectId: "smartzsinglepage-9c0f9",
   storageBucket: "smartzsinglepage-9c0f9.appspot.com",
   messagingSenderId: "779676739645",
   appId: "1:779676739645:web:bdecf4c0c3517918a5a254",
   measurementId: "G-91NHFX7CB9"
 };
// Initialize Firebase
firebase.analytics();
// Reference messages collection
var scoresRef = firebase.database().ref("english/");

const usernameE = document.getElementById("usernameE");
const saveScoreBtnE = document.getElementById("saveScoreBtnE");
const finalScoreE = document.getElementById("finalScoreE");
const mostRecentScoreE = localStorage.getItem("mostRecentScoreE");
console.log(mostRecentScoreE);

const MAX_HIGH_SCORESE = 10;

saveHighScoreE = (e) => {
  e.preventDefault(); //stops the defult from submitting to a new page
  console.log("SAVE SCORE");
  const scoreE = {
    scoreE: mostRecentScoreE,
    nameE: usernameE.value,
  };

  scoresRef.push(scoreE);
console.log("mostRecentScoreE");
  /*
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score); //will filter scores and only display highest numbers
  highScores.splice(10); //number of highscores to display. any over the top five will be cut off so only top scores are shown

  localStorage.setItem("highScores", JSON.stringify(highScores)); //updates the highscores and saves them in a string
  window.location.assign("index.html"); //automatically goes back home after saving */
};

/*local storage means you can only use key value pairs with the value being a string so anything being stored will be stored as a string*/

finalScoreE.innerText = mostRecentScoreE; // NOTE: displays most recent score in html

// Get a reference to the storage service, which is used to create references in your storage bucket
//var storage = firebase.storage();
// Create a storage reference from our storage service
//var storageRef = storage.ref();

$("#english_end").submit(function (e) {
  e.preventDefault();

  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    nameE: $(".usernameE").val(),
    scoreE: $(".scoreE").val(),
  });

});

enableSave = () => {
  document.getElementById("saveScoreBtnE").removeAttribute("disabled");
};
document.getElementById("usernameE").addEventListener("keyup", enableSave);
