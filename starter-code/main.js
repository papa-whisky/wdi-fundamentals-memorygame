//Global variables.
var cardValues = [
  "911R (1967)",
  "917K (1970)",
  "906 Carrera 6 (1966)",
  "Abarth 356B Carrera GTL (1960)",
  "550 Spyder (1953)",
  "935-77 (1977)",
  "718 RSK Spyder (1959)",
  "904 Carrera GTS (1964)",
  "911 Carrera RSR (1973)",
  "911 Carrera RS 2.7 (1973)",
  "356A Speedster (1956)",
  "804 (1962)"];
var deck = [];
var cardsInPlay = [];
var numOfPairs = document.getElementsByClassName('pairs');
var beginButton = document.getElementsByClassName('begin');
var aboutButton = document.getElementsByTagName('h3');
var aboutText = document.getElementsByTagName('p');
var gameBoard = document.getElementsByClassName('game-board');
var cards = document.getElementsByClassName('card');

//Display or hide 'about' text.
aboutButton[0].addEventListener("click", function () {
  if (aboutButton[0].innerHTML === 'ABOUT ↓') {
    aboutText[0].className = 'show';
    aboutButton[0].innerHTML = 'ABOUT ↑';
  } else {
    aboutText[0].className = ('');
    aboutButton[0].innerHTML = 'ABOUT ↓';
  };
});

//Handler for pressing 'enter' from input field.
numOfPairs[0].addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    beginButton[0].click();
  };
});

//Check that user input is valid, start game if so.
var checkInput = function () {
  if (numOfPairs[0].value > 0) {
    createBoard(numOfPairs[0].value);
    numOfPairs[0].value = "";
    numOfPairs[0].className = "pairs";
    numOfPairs[0].setAttribute('placeholder', 'Enter number of pairs');
    beginButton[0].value = "RESTART";
  } else {
    numOfPairs[0].className += ' invalid';
    numOfPairs[0].value = "";
    numOfPairs[0].setAttribute('placeholder', 'Enter a number above 0');
  };
};

//Generate deck, shuffle, create game board.
var createBoard = function (x) {
  clearBoard();
  //Create first half of deck randomly and assign 'img' type.
  for (var i = 0; i < x; i++) {
    var card1 = document.createElement('div');
    var card2 = document.createElement('div');
    var card1Content = document.createElement('div');
    var card2Content = document.createElement('div');
    var rand = cardValues[Math.floor(Math.random() * cardValues.length)];
    card1.className = ('card');
    card1.setAttribute('data-value', rand);
    card1.setAttribute('data-type', 'img');
    card1.setAttribute('data-matched', "N");
    deck.push(card1);
    card1.addEventListener('click', clickCard);
    card1.appendChild(card1Content);
    card1Content.className = ('content');
  };
  //Duplicate to create second half of deck and assign 'text' type.
  for (var i = 0; i < x; i++) {
    var card = document.createElement('div');
    var cardContent = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-value', deck[i].getAttribute('data-value'));
    card.setAttribute('data-type', 'text');
    card.setAttribute('data-matched', "N");
    deck.push(card);
    card.addEventListener('click', clickCard);
    card.appendChild(cardContent);
    cardContent.className = ('content vcenter');
  };
  //Shuffle deck.
  shuffleArray(deck);
  //Create game board.
  for (var i = 0; i < x * 2; i++) {
    gameBoard[0].appendChild(deck[i]);
  };
};

//Clear game board.
var clearBoard = function () {
  deck = [];
  document.getElementById('win').className = ('banner');
  while (gameBoard[0].firstChild) {
    gameBoard[0].removeChild(gameBoard[0].firstChild);
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

//Actions to take when card is clicked.
function clickCard() {
  //Check whether card has already been turned over.
  if (this.firstChild.innerHTML === "" && cardsInPlay.length < 2) {
    //Add card to array for later comparison.
    cardsInPlay.push(this);
    //Display image or text on clicked card.
    if (this.getAttribute('data-type') === "img") {
      this.firstChild.innerHTML = '<img src="images/' + this.getAttribute('data-value') + '.jpg" alt="' + this.getAttribute('data-value') + '">';
    } else {
      this.firstChild.innerHTML = this.getAttribute('data-value');
    };
    this.firstChild.classList.add('slide');
    //Once two cards have been clicked, call function to compare. Delay to allow image time to load. (**Why does function need to be in quotes?**)
    if (cardsInPlay.length === 2) {
      setTimeout('isMatch(cardsInPlay)', 100);
    };
  };
};

//Compare two cards and display message.
var isMatch = function (x) {
  if ((x[0].getAttribute('data-value') === x[1].getAttribute('data-value')) && (x[0].getAttribute('data-type') !== x[1].getAttribute('data-type'))) {
    //Mark cards as matched.
    for (var i = 0; i < 2; i++) {
      x[i].setAttribute('data-matched', "Y");
      x[i].className += (' matched');
    };
    cardsInPlay = [];
    //Check whether game is complete and display message if so.
    if (isComplete() === true) {
      document.getElementById('win').className += (' show');
      document.getElementById('win').scrollIntoView();
    };
  } else {
    x[0].className += (' invalid');
    x[1].className += (' invalid');
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
      cards[i].firstChild.innerHTML = "";
      cards[i].firstChild.classList.remove('slide');
      cards[i].className = ('card');
    };
  };
};
