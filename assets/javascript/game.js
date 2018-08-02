//global variables
var guesses; //number of guesses, equal to number of blanks
var blanks; //number of blanks remaining
var userKey; //key the user pressed
var losses = 0; //count of losses
var wins = 0; //count of wins
var money = 0; //amount of money

//JSON request

var url = "http://jservice.io/api/random";

var jObj;
var answer;
var httpReq = new XMLHttpRequest();

function game() {
    httpReq.open("GET", url);
    httpReq.responseType = "json";
    httpReq.send();
    httpReq.onload = function (answer) {
        jObj = httpReq.response; //assign JSON response to jObj object
        playGame(jObj); //passing jObj to playGame function call 
    }
}

function playGame(jObj) {
    //variables for DOM elements
    var clueDom = document.getElementById("clue");
    var catDom = document.getElementById("category");
    var userAnswerDom = document.getElementById("userAnswer");
    var statsDom = document.getElementById("userStats");

    var clue = jObj[0].question; //assign question to clue variable
    var cat = jObj[0].category.title; //assign category to cat variable
    var answer = jObj[0].answer; //assign answer to variable
    var answerArr = answer.split(""); //split answer into array of chars



    //append clue to DOM
    clueDom
        .appendChild(document.createElement("p"))
        .textContent = clue;
    //append category to DOM
    catDom
        .appendChild(document.createElement("p"))
        .textContent = cat;
    
    //create blanks for user entry
    answerArr.forEach(function(letter) {
        if (letter.match(/[w]/gi)) {
            userAnswerDom   
                .appendChild(document.createElement("letterBlock"))
        }
        else if (letter.match(/[s]/gi)) {
            userAnswerDom
                .appendChild(document.createElement("spaceBlock"));
        }
        else {
            userAnswerDom
                .appendChild(document.createElement("completedBlock"))
                .textContent = letter;
        }
    }
    userAnswerDom
        .appendChild()
    


}

/*

httpReq.onload = function(jObj) {
    jObj = httpReq.response;
    showAnswer(jObj);
  };

function showAnswer (jObj) {
    
    document.getElementById("game").innerHTML = jObj[0]["answer"];

}
var winston = showAnswer();
console.log(winston);

/*
var xmlHttp = new XMLHttpRequest();
var jObj = {};
function getJeopardy (jObj, callback) {}
xmlHttp.onreadystatechange = function(jObj) {
    if (this.readyState == 4 && this.status == 200) {
      jObj = JSON.parse(this.responseText);
    }
}
xmlHttp.send();
console.log(jObj);


  function Get(url) {
  var httpReq = new XMLHttpRequest();
  httpReq.onload = handler();
  httpReq.open("GET", url, true);
  httpReq.send();
  return httpReq.responseText;
  }

  var jObj = JSON.parse(Get(url));
  console.log(jObj);


function Get(url){
    var httpReq = new XMLHttpRequest(); // a new request
    httpReq.open("GET",url, true);
    httpReq.send(null);
    return httpReq.responseText;          
}
var jObj = JSON.parse(Get(url));
console.log(jObj);
*/