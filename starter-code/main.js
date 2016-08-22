//Define global variables.
var cardTypes = ["queen", "queen", "king", "king", "queen", "queen", "king", "king"];
var cardsInPlay = [];
var gameBoard = document.getElementById('game-board');
var cards = document.getElementsByClassName('card')

//Generate '.card' divs on page load.
var createBoard = function () {
  for (var i = 0; i < cardTypes.length; i++) {
    var card = document.createElement('div');
    card.className = ('card');
    card.setAttribute('data-card', cardTypes[i]);
    card.setAttribute('data-matched', "N");
    gameBoard.appendChild(card);
    card.addEventListener('click', clickCard);
  };
};
createBoard();

//Actions to take when card is clicked.
function clickCard() {
  //Check whether card has already been turned over.
  if (this.innerHTML === "") {
    //Add card to array for later comparison.
    cardsInPlay.push(this);
    //Display image on clicked card.
    if (this.getAttribute('data-card') === "queen") {
      this.innerHTML = '<img src="queen.png" alt="Queen">';
    } else {
      this.innerHTML = '<img src="king.png" alt="King">';
    };
    ////Call isMatch function once two cards have been clicked. Function delayed to allow image time to load. (Why does this require quotes around isMatch?)
    if (cardsInPlay.length === 2) {
      setTimeout('isMatch(cardsInPlay)', 200);
    };
  };
};

//Compare two cards and display message.
var isMatch = function(x) {
  if (x[0].getAttribute('data-card') === x[1].getAttribute('data-card')) {
    alert("You found a match!");
    //Mark cards as matched.
    x[0].setAttribute('data-matched', "Y");
    x[1].setAttribute('data-matched', "Y");
    //Check whether game is complete and display message if so.
    if (isComplete() === true) {
      alert("Game complete!");
    };
  } else {
    alert("Sorry, try again.");
    clearCards();
  };
  cardsInPlay = [];
};

//Check whether all cards have been turned over (i.e. game is complete).
var isComplete = function() {
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].getAttribute('data-matched') === "N") {
      return false;
    };
  };
  return true;
};

//Clear images from unmatched cards.
var clearCards = function() {
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].getAttribute('data-matched') === "N") {
      cards[i].innerHTML = "";
    };
  };
};
