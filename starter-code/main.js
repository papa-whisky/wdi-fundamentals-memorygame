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
    numInput.className = "";
    numInput.setAttribute('placeholder', 'Number of cards');
    startButton.value = "Restart Game";
  } else {
    numInput.className = ('invalid');
    numInput.value = "";
    numInput.setAttribute('placeholder', 'Enter an even number above 3');
  };
};

//Handler for pressing enter from textbox.
numInput.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    startButton.click();
  };
});

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
  if (this.innerHTML === "" && cardsInPlay.length < 2) {
    //Add card to array for later comparison.
    cardsInPlay.push(this);
    //Display image on clicked card.
    this.innerHTML = '<img src="images/' + this.getAttribute('data-card') + '.png" alt="' + this.getAttribute('data-card') + '">';
    //Once two cards have been clicked, call function to compare. Delay to allow image time to load. (**Why does function need to be in quotes?**)
    if (cardsInPlay.length === 2) {
      setTimeout('isMatch(cardsInPlay)', 100);
    };
  };
};

//Compare two cards and display message.
var isMatch = function (x) {
  if (x[0].getAttribute('data-card') === x[1].getAttribute('data-card')) {
    //Mark cards as matched.
    for (var i = 0; i < 2; i++) {
      x[i].setAttribute('data-matched', "Y");
      x[i].className += (' matched');
    };
    cardsInPlay = [];
    //Check whether game is complete and display message if so.
    if (isComplete() === true) {
      alert("Game complete!");
    };
  } else {
    x[0].className += (' wrong-match');
    x[1].className += (' wrong-match');
    setTimeout('clearCards()', 1750);
    setTimeout('cardsInPlay = []', 1750);
  };
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
      cards[i].className = ('card');
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
