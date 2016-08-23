//Define global variables.
var cardTypes = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];
var cardsInPlay = [];
var gameBoard = document.getElementById('game-board');
var cards = document.getElementsByClassName('card')
var startButton = document.getElementById('start');
var numInput = document.getElementById('number');
var deck = [];

//Check that user input is valid, start game if so.
var checkInput = function () {
  if (parseInt(numInput.value) % 2 === 0 && parseInt(numInput.value) > 3) {
    createBoard(parseInt(numInput.value));
    numInput.value = "";
    startButton.value = "Restart Game";
  } else {
    alert("Please enter an EVEN number of 4 or higher.");
  };
};

//Generate deck, shuffle, create game board.
var createBoard = function (x) {
  clearBoard();
  //Create half of deck randomly.
  for (var i = 0; i < x / 2; i++) {
    var card = document.createElement('div');
    var rand = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    card.className = ('card');
    card.setAttribute('data-card', rand);
    card.setAttribute('data-matched', "N");
    deck.push(card);
    card.addEventListener('click', clickCard);
  };
  //Duplicate first half of deck (so every card will have a pair).
  for (var i = 0; i < x / 2; i++) {
    var card = document.createElement('div');
    card.className = ('card');
    card.setAttribute('data-card', deck[i].getAttribute('data-card'));
    card.setAttribute('data-matched', "N");
    deck.push(card);
    card.addEventListener('click', clickCard);
  };
  //Shuffle deck.
  shuffleArray(deck);
  //Create game board.
  for (var i = 0; i < x; i++) {
    gameBoard.appendChild(deck[i]);
  };
};

//Clear game board.
var clearBoard = function () {
  deck = [];
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
  };
};

//Actions to take when card is clicked.
function clickCard() {
  //Check whether card has already been turned over.
  if (this.innerHTML === "") {
    //Add card to array for later comparison.
    cardsInPlay.push(this);
    //Display image on clicked card.
    this.innerHTML = '<img src="images/' + this.getAttribute('data-card') + '.png" alt="' + this.getAttribute('data-card') + '">';
    //Once two cards have been clicked, call function to compare. Delay to allow image time to load. (**Why does function need to be in quotes?**)
    if (cardsInPlay.length === 2) {
      setTimeout('isMatch(cardsInPlay)', 200);
    };
  };
};

//Compare two cards and display message.
var isMatch = function (x) {
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
var isComplete = function () {
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].getAttribute('data-matched') === "N") {
      return false;
    };
  };
  return true;
};

//Clear images from unmatched cards.
var clearCards = function () {
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].getAttribute('data-matched') === "N") {
      cards[i].innerHTML = "";
    };
  };
};

//Durstenfeld shuffle algorithm.
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };
  return array;
};