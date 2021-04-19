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
var scoresRefM = firebase.database().ref("math/");

const usernameML = document.getElementById("usernameM");
const saveScoreBtnML = document.getElementById("saveScoreBtnM");
const finalScoreML = document.getElementById("finalScoreM");
const mostRecentScoreML = localStorage.getItem("mostRecentScoreM");
console.log(mostRecentScoreML);

const MAX_HIGH_SCORESML = 10;


function addItemsToListM(nameM, scoreM) {
  console.log("adding chikd", nameM, scoreM);
  let ulM = document.getElementById("highScoresListM");
  let listItemML = document.createElement("li"); //the number of highscores shown
  let contents = document.createTextNode(
    "Name: " + nameM +  "   Score: " + scoreM
  );
  listItemML.appendChild(contents);
  ulM.appendChild(listItemML);
}


//calls for the data from database
function FetchAllDataM() {
  firebase
    .database()
    .ref("math")
    .once("value", function (snapshot) {
      console.log("Data", snapshot);
      //a snapshot is a picture of the data at a particular database reference at a single point in time
      snapshot.forEach(function (ChildSnapshot) {
        console.log("hild", ChildSnapshot);
        let nameM = ChildSnapshot.val().nameM;
        let scoreM = ChildSnapshot.val().scoreM;
        addItemsToListM(nameM, scoreM);
      });
    });
}


  FetchAllDataM();

  console.log("highScoresListM");
