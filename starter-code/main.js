/*
// define value of each card.
var cardOne = "queen";
var cardTwo = "queen";
var cardThree = "king";
var cardFour = "king";

// compare card values.
if (cardTwo === cardFour) {
    alert("You found a match!");
} else {
        alert("Sorry, try again.");
};
*/

var gameBoard = document.getElementById('game-board');
var createBoard = function () {
    for (i = 0; i < 4; i++) {
        var card = document.createElement('div');
        card.className = ('card');
        gameBoard.appendChild(card);
    }
}
createBoard();