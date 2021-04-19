// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*var firebaseConfig = {
  apiKey: "AIzaSyDuejSqZSWsXGYcO1qaILbyIpJJb5jvIUs",
  authDomain: "smartzmultipage.firebaseapp.com",
  databaseURL: "https://smartzmultipage-default-rtdb.firebaseio.com/",
  projectId: "smartzmultipage",
  storageBucket: "smartzmultipage.appspot.com",
  messagingSenderId: "398309169877",
  appId: "1:398309169877:web:daffc48ea2dbe54241a05c",
  measurementId: "G-746DK30RKC",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
*/
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // Your web app's Firebase configuration
   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
   var firebaseConfig = {
     apiKey: "AIzaSyCdaUaHnd5l46I01HqZiTAKJgzJkp8vCs0",
     authDomain: "smartzmultipage-991ce.firebaseapp.com",
     databaseURL: "https://smartzmultipage-991ce-default-rtdb.firebaseio.com/",
     projectId: "smartzmultipage-991ce",
     storageBucket: "smartzmultipage-991ce.appspot.com",
     messagingSenderId: "933437273989",
     appId: "1:933437273989:web:0bf41986da46863eb9b6ec",
     measurementId: "G-KQD9LJ007G"
   };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
// Reference messages collection
var scoresRef = firebase.database().ref("general/");

const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
console.log(mostRecentScore);

const MAX_HIGH_SCORES = 10;

saveHighScore = (e) => {
  e.preventDefault(); //stops the defult from submitting to a new page
  console.log("SAVE SCORE");
  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  scoresRef.push(score);

  /*
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score); //will filter scores and only display highest numbers
  highScores.splice(10); //number of highscores to display. any over the top five will be cut off so only top scores are shown

  localStorage.setItem("highScores", JSON.stringify(highScores)); //updates the highscores and saves them in a string
  window.location.assign("index.html"); //automatically goes back home after saving */
};

/*local storage means you can only use key value pairs with the value being a string so anything being stored will be stored as a string*/

finalScore.innerText = mostRecentScore; // NOTE: displays most recent score in html

// Get a reference to the storage service, which is used to create references in your storage bucket
//var storage = firebase.storage();
// Create a storage reference from our storage service
//var storageRef = storage.ref();

$("#generalEnd").submit(function (e) {
  e.preventDefault();

  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: $(".username").val(),
    score: $(".score").val(),
  });

});

enableSave = () => {
  document.getElementById("saveScoreBtn").removeAttribute("disabled");
};
document.getElementById("username").addEventListener("keyup", enableSave);
