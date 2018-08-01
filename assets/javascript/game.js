//game variables
var guesses; //number of guesses, equal to number of blanks
var answerStr; //answer from JSON as a string
var answerSpl; //answer split into array of single-character strings
var blanks; //number of blanks remaining
var userKey; //key the user pressed
var losses = 0; //count of losses
var wins = 0; //count of wins

//JSON request

function loadJSON(callback) {   

    var jpObj = new XMLHttpRequest();
        jpObj.overrideMimeType("application/json");
    jpObj.open('GET', 'http://bryanyunis.com/jeopardy/jeopardy.json', true); // Replace 'my_data' with the path to your file
    jpObj.onreadystatechange = function () {
          if (jpObj.readyState == 4 && jpObj.status == 200) {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(jpObj.responseText);
          }
         
    };
    jpObj.send(null);  
 }
 function init() {
    loadJSON(function(response) {
     // Parse JSON string into object
       var actual_JSON = JSON.parse(response);
       console.log(actual_JSON)
    });
   }
   loadJSON();
