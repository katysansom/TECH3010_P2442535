/*Help from https://youtu.be/O4N7yfaJYhI to make this*/

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
var scoresRefE = firebase.database().ref("english/");

const usernameEL = document.getElementById("usernameE");
const saveScoreBtnEL = document.getElementById("saveScoreBtnE");
const finalScoreEL = document.getElementById("finalScoreE");
const mostRecentScoreEL = localStorage.getItem("mostRecentScoreE");
console.log(mostRecentScoreEL);

const MAX_HIGH_SCORESEL = 10;


function addItemsToList(nameE, scoreE) {
  let ulE = document.getElementById("highScoresListE");
  let listItemEL = document.createElement("li"); //the number of highscores shown
  let contents = document.createTextNode(
    "Name: " + nameE +  "   Score: " + scoreE
  );
  listItemEL.appendChild(contents);
  ulE.appendChild(listItemEL);
}


//calls for the data from database
function FetchAllData() {
  firebase
    .database()
    .ref("english")
    .once("value", function (snapshot) {
      console.log("English data", snapshot);
      //a snapshot is a picture of the data at a particular database reference at a single point in time
      snapshot.forEach(function (ChildSnapshot) {
        console.log("English child", ChildSnapshot);
        let nameE = ChildSnapshot.val().nameE;
        let scoreE = ChildSnapshot.val().scoreE;
        addItemsToList(nameE, scoreE);
      });
    });
}

window.onload = () => {
  console.log("Onload function called");
  FetchAllData();
};
