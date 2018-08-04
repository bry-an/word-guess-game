//global variables
var losses = 0;
var wins = 0;

var game = {
    dom: {
        clueDom: document.getElementById("clue"),
        catDom: document.getElementById("category"),
        userAnswerDom: document.getElementById("userAnswer"),
        gameStatusDom: document.getElementById("gameStatus"),
        userWinsDom: document.getElementById("userWins"),
        wrongLettersDom : document.getElementById("wrongLetters"),
        userLossesDom: document.getElementById("userLosses"),
        colorblue: "#060ce9"
    },

    data: {
        json: getQuestions(),
        clue: json[0].question,
        cat: json[0].category.title, //assign category to cat variable
        answer: json[0].answer.toLowerCase()
            .replace(/(<([^>]+)>)/ig, "")
            .match(/\w|\'|\&|\s/gi),
        guesses: 3, //number of incorrect guesses (3 allowed)
        count: 0, //keeping count of correctly guessed letters
        guessList: [], //list of guessed letters
        wrongList: [], //list of wrong guesses
        gameStatus: true, //stop flag

    },

    getQuestions: function () {
        var url = "http://jservice.io/api/random";
        var httpReq = new XMLHttpRequest();
        var json;

        httpReq.open("GET", url);
        httpReq.responseType = "json";
        httpReq.send();
        httpReq.onload = function response() {
            var obj = httpReq.response;
            //return json object after removing problematic 
            //html tags and doing some filtering
        };
        return json;
    },

    clearElements: function (parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    },

    addText: function (text) {
        return document.createTextNode(text);
    },

    createAndAppend: function (element) {
        return appendChild(document.createElement(element));
    },

    displayStats: function () {
        dom.userWinsDom.addText("Wins");
        dom.userWinsDom
            .createAndAppend("winsBlock")
            .addText(this.data.wins);
        dom.userWinsDom.addText("Wins");
        dom.userLossesDom
            .createAndAppend("lossesBlock")
            .addText(this.data.losses);
    },

    fillBoard: function () {
        dom.clueDom
            .createAndAppend("p")
            .addText(clue);
        dom.clueCom.style.backgroundColor = dom.colorblue;

        dom.catDom
            .createAndAppend("p")
            .addText("Category: " + data.cat);
        dom.datDom.style.backgroundColor = dom.colorblue;

        data.answer.forEach(function (letter) {
            if (letter.match(/\w/gi)) {
                dom.userAnswerDom
                    .createAndAppend("letterBlock")
                    .addText(letter);
            }

            else if (letter.match(/\s/gi)) { //add spaces for free
                dom.userAnswerDom
                    .createAndAppend("spaceBlock")
                    .addText(letter);
                data.count++; //freebie: add to count
            }

            else if (letter.match(/\'|&/gi)) { //add special characters for free
                dom.userAnswerDom
                    .createAndAppend("completedBlock")
                    .addText(letter);
                dom.count++; //freebie: add to count
            }
        });
    },

    revealGuesses: function(key) {
        var userGuess = key;

        //make sure guess is unique and game is running
        if (data.guessList.indexOf(userGuess) == -1 && data.gameStatus == true) {
            data.guessList.push(userGuess);

            //make sure input is alphabetical character
            if (userGuess.charCodeAt(0) > 96 && userGuess.charCodeAt(0) < 123) {

                if (data.answer.indexOf(userGuess) == -1) { //guessed letter not present in answer
                    data.guesses--;
                    data.wrongList.push(userGuess);
                    data.wrongLettersDom.createAndAppend("wrongLetterBox")

                    

                    document.getElementById("wrongLettersText")
                        .textContent = "Wrong Guesses";
                    document.getElementById("wrongAnswer").play();
                    wrongLettersDom
                        .appendChild(document.createElement("wrongLetterBlock"))
                        .textContent = userGuess;
                    wrongLettersDom.style.border = "1px solid #ccc";

            }

        }
    }






};
    //variables for DOM elements




