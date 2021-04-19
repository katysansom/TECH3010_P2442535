/*Help from https://youtu.be/O4N7yfaJYhI to make this*/


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


function addItemsToList(name, score) {
  let ul = document.getElementById("highScoresList");
  let listItem = document.createElement("li"); //the number of highscores shown
  let contents = document.createTextNode(
    "Name: " + name +  "   Score: " + score
  );
  listItem.appendChild(contents);
  ul.appendChild(listItem);
}


//calls for the data from database
function FetchAllData() {
  firebase
    .database()
    .ref("general")
    .once("value", function (snapshot) {
      //a snapshot is a picture of the data at a particular database reference at a single point in time
      snapshot.forEach(function (ChildSnapshot) {
        let name = ChildSnapshot.val().name;
        let score = ChildSnapshot.val().score;
        addItemsToList(name, score);
      });
    });
}

window.onload = () => {
  console.log("Onload function called");
  FetchAllData();
};
