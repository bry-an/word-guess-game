# Jeopardy! Word Guess Game

## What is this?
Jeopardy! Word Guess Game is like a hybrid between Jeopardy! and Wheel of Fortune. Actual Jeopardy! questions are displayed, with blank blocks to represent the answers. Users then have three guesses to "solve the puzzle," i.e. answer the question. 

## API
Jeopardy! Word Guess uses an API located at http://jservice.io with an endpoint at /api/random to fetch the clue information in JSON format. It then parses the object to populate the appropriate fields in the game's page. 

## How can I help?
The project is served on the following GitHub pages link: https://bry-an.github.io/word-guess-game/

However, users will notice that a security warning is thrown by browsers since GitHub uses an HTTPS connection, while the API does not, so users have an inconvenient step of having to allow this unsecure connection. 

In the interim, this project is hosted on a web server that does not utilize HTTPS: bryanyunis.com/jeopardy

Collaborators could help by serving the API using HTTPS then modifying the XMLHTTP request within the game.js document. Visit https://github.com/sottenad/jService for more information on this. 

Additionally, the JSON object has a money keyword, so the game could be made more advanced by including the value of each answer somehow in the game -- perhaps with a DailyDouble option!

##Project Contact
Further information can be found by contacting Bryan Yunis at https://github.com/bry-an/. 
