//Define global variables.
var cards = ["queen", "queen", "king", "king"];
var cardsInPlay = [];
var gameBoard = document.getElementById('game-board');

//Generate '.card' divs on page load.
var createBoard = function () {
  for (var i = 0; i < cards.length; i++) {
    var card = document.createElement('div');
    card.className = ('card');
    //Record type of card for later use with isMatch function.
    card.setAttribute('data-card', cards[i]);
    gameBoard.appendChild(card);
    card.addEventListener('click', clickCard);
  };
};
createBoard();

//Compare two cards and display message.
var isMatch = function(x) {
  if (x[0] === x[1]) {
    alert("You found a match!");
    //Check whether game is complete and display message if so.
    if (isComplete() === true) {
      alert("Game complete!");
    }
  } else {
    alert("Sorry, try again.");
    //Clear image from cards if not matched.
    clearCards();
  };
  cardsInPlay = [];
};

//Check whether all cards have been turned over (i.e. game is complete).
var isComplete = function() {
  var card = document.getElementsByClassName('card');
  for (var i = 0; i < card.length; i++) {
    if (card[i].innerHTML === "") {
      return false;
    };
  };
  return true;
};

//Function to clear images from cards.
var clearCards = function() {
  var card = document.getElementsByClassName('card');
  for (var i = 0; i < card.length; i++) {
    card[i].innerHTML = "";
  };
};

//Actions to take when card is clicked.
function clickCard() {
  //Check whether card has already been turned over.
  if (this.innerHTML === "") {
    //Add card type to array for later comparison.
    cardsInPlay.push(this.getAttribute('data-card'));
    //Display image on clicked card.
    if (this.getAttribute('data-card') === "queen") {
      this.innerHTML = '<img src="queen.png" alt="Queen">';
    } else {
      this.innerHTML = '<img src="king.png" alt="King">';
    };
    ////Call isMatch function once two cards have been clicked. Function delayed to allow image time to load. (Why does this require quotes around isMatch?)
    if (cardsInPlay.length === 2) {
      setTimeout('isMatch(cardsInPlay)', 500);
    };
  };
};
