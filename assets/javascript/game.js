//global variables
var losses = 0; //count of losses
var wins = 0; //count of wins
var money = 0; //amount of money

//JSON request

var url = "http://jservice.io/api/random";

var jObj;
var answer;
var httpReq = new XMLHttpRequest();

//get Jeopardy! question JSON
function game() {
    httpReq.open("GET", url);
    httpReq.responseType = "json";
    httpReq.send();
    httpReq.onload = function (answer) {
        jObj = httpReq.response; //assign JSON response to jObj object
        playGame(jObj); //passing jObj to playGame function call 
    }
}
//function to clear game's elements
function clearElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//variables to sound IDs
rightAnswer = document.getElementById("rightAnswer");
wrongAnswer = document.getElementById("wrongAnswer");

//main game function
function playGame(jObj) {
    //variables for DOM elements
    var clueDom = document.getElementById("clue");
    var catDom = document.getElementById("category");
    var userAnswerDom = document.getElementById("userAnswer");
    var gameStatusDom = document.getElementById("gameStatus");
    var statsDom = document.getElementById("userStats");

    var clue = jObj[0].question; //assign question to clue variable
    var cat = jObj[0].category.title; //assign category to cat variable
    var dirtyAnswer = jObj[0].answer.toLowerCase(); //assign answer to variable & make lowercase
    var guesses = 3; //number of incorrect guesses (3 allowed)
    var count = 0; //keeping count of correctly guessed letters
    var guessList = []; //list of guessed letters
    var wrongList = []; //list of wrong guesses

    //remove problematic HTML tags from some answers
    var noHTML = dirtyAnswer.replace(/(<([^>]+)>)/ig, "");

    //clean up answer
    var answerArr = noHTML.match(/\w|\'|\&|\s/gi);

    //clear any previous game's elements
    clearElements(clueDom);
    clearElements(catDom);
    clearElements(userAnswerDom);
    clearElements(gameStatusDom);

    console.log(answerArr);

    //append clue to DOM
    clueDom
        .appendChild(document.createElement("p"))
        .textContent = clue;
    //append category to DOM
    catDom
        .appendChild(document.createElement("p"))
        .textContent = cat;

    //create blanks for user entry
    answerArr.forEach(function (letter) {
        if (letter.match(/\w/gi)) {
            userAnswerDom
                .appendChild(document.createElement("letterBlock"))
                .textContent = letter;
        }
        else if (letter.match(/\s/gi)) { //add spaces for free
            userAnswerDom
                .appendChild(document.createElement("spaceBlock"))
                .textContent = letter;
            count++; //freebie: add to count
        }
        else if (letter.match(/\'|&/gi)) { //add special characters for free
            userAnswerDom
                .appendChild(document.createElement("completedBlock"))
                .textContent = letter;
            count++; //freebie: add to count
        }
    });
    //reveal correctly guessed letters
    document.onkeyup = function (event) {
        var userGuess = event.key;

        //make sure guess is unique
        if (guessList.indexOf(userGuess) == -1) {
            guessList.push(userGuess);

            //make sure input is an alphabetical character
            if (userGuess.charCodeAt(0) > 96 && userGuess.charCodeAt(0) < 123) {

                if (answerArr.indexOf(userGuess) == -1) { //guessed letter not present in answer
                    guesses--;
                    wrongList.push(userGuess);
                    document.getElementById("wrongAnswer").play();
                }
                else { //guessed letter is present in answer
                    var indicies = [];//create array of indicies at which letter present
                    for (var i = 0; i < answerArr.length; i++) {
                        if (answerArr[i] === userGuess) {
                            indicies.push(i);
                        }
                    }
                    //reveal present letters
                    indicies.forEach(function (index) {
                        userAnswerDom.childNodes[index].style.fontSize = "3rem";
                        count++;
                    });
                    document.getElementById("rightAnswer").play();
                }
                if (count == answerArr.length) {
                    console.log("You win!");
                    gameStatusDom
                        .appendChild(document.createElement("p"))
                        .textContent = "Correct. You win! Play Again!";
                    

                }
                if (guesses == 0)
                    gameStatusDom
                        .appendChild(document.createElement("p"));
                    console.log("You lose!")
            };
        }
    }
}


/*
To do: 
Code the winning/losing
Add a guessed-letters section with red blocked letters
Style the damn page
*/