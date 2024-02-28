// jshint esversion: 8

// ** setting our function variable for the game

let moves = 0; // counter for number times 2 cards are turned

let pairs = 0; // counter for when player matches a pair.

const cardFruits = ["apple", "banana", "blueberry", "lemon", "mandarin", "mango", "orange", "strawberry"]; // Our fruit objects the player needs to match

let cardList; // List for our above deck of cards

let canvas = []; // our game canvas

let rows = 4; // our number of rows

let columns = 4; // our number of columns

let cardOne; // variable for the first card turned
let cardTwo; // variable for second card

let startMe = false; // Game start variable


// How to Play Pop-up Modal adapted using https://www.w3schools.com/howto/howto_css_modals.asp */


// Get the modal element

var playmodal = document.getElementById("play-modal");

// How to Play button to launch popup modal
var btn = document.getElementById("howToPlay");

// Close button
var playspan = document.getElementsByClassName("playclose")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  playmodal.style.display = "block";
};

// Close button function
playspan.onclick = function () {
  playmodal.style.display = "none";
};


/* 
Card game functioning adapted following along with online tutorial 
https://www.youtube.com/watch?v=wz9jeI9M9hI

*/


// Shuffle cards function

window.onload = function () {
  shuffleCards();
  startGame();

};

// Shuffling cards function using math floor and random functions.

function shuffleCards() {

  // Concatenate cards so we have 2 of them

  cardList = cardFruits.concat(cardFruits);

  // Shuffle the cards


  for (let x = 0; x < cardList.length; x++) {

    let y = Math.floor(Math.random() * cardList.length); //Gets a random index

    // randomize cards

    let tmp = cardList[x];
    cardList[x] = cardList[y];
    cardList[y] = tmp;

  }

}

/*

To start the game the below function will copy and paste our deck of fruit cards (array) randomly on screen.
Starting with the first (1) square on screen down to the last (16).

*/

/* Card characters from Freepik.com - images cropped using Photo Editor
 
https://www.freepik.com/free-vector/cute-fruit-berry-cartoon-characters-illustrations-set-comic-stickers-with-funny-caricatures-happy-lemon-orange-mango-strawberry-personages-isolated-white_20827612.htm#query=cute%20cartoon%20fruit&position=11&from_view=keyword&track=ais&uuid=66a8faad-a13c-4bff-b040-592762bebf70" Image by pch.vector
 
*/

function startGame() {


  // r for rows, c for columns
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let cardImage = cardList.pop();
      row.push(cardImage);
      let card = document.createElement("img"); // HTML 
      card.id = r.toString() + "-" + c.toString();
      card.src = "assets/images/" + cardImage + ".jpg";
      card.classList.add("card");
      // Listener click event for when the user clicks on the card. 

      card.addEventListener("click", selectCard);
      document.getElementById("canvas").append(card);

    }

    // Push the cards to the screen
    canvas.push(row);

  }

  // Hide the cards so user can't see them till they are matched.

  setTimeout(hideCards);

}

// Function to hide the cards showing them face down image (fruitmcover).

function hideCards() {

  for (let r = 0; r < rows; r++) {
    //let row = [];
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(r.toString() + "-" + c.toString());
      card.src = `assets/images/fruitmcover.jpg`;

    }
  }
}


// Timer Function - https://stackoverflow.com/questions/55031097/how-do-i-start-a-timer-on-a-click#:~:text=the%20most%20basic%20way%20to,('%23button').

var timer; // Variable to hold timer interval
var seconds = 0;
var minutes = 0;

function startTimer() {

  timer = setInterval(updateTimer, 1000); // Updates timer every second
}

// When the timer reaches 60 seconds our minutes variable is increased by 1 and seconds variable returns to 00 

function updateTimer() {

  seconds++;

  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }

  /*
  Timer logic using tenary operators to check if the value of minutes or seconds are
   less than 10 if they are 0 is placed in front so they maintain a 2 digit format  - ie 01 seconds instead 1 seconds.
   */

  var time = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

  document.querySelector(".timer").textContent = time;
}

function endTimer() {

  clearInterval(timer);

}

// Function to track when the user clicks on two cards to flip them over. 

function selectCard() {

  if (this.src.includes("fruitmcover")) {

    if (!cardOne) {
      cardOne = this;


      let coord = cardOne.id.split("-");
      let r = parseInt(coord[0]);
      let c = parseInt(coord[1]);

      cardOne.src = "assets/images/" + canvas[r][c] + ".jpg";

    }

    if (!startMe) {

      startMe = true;
      startTimer();

    } else if (!cardTwo && this != cardOne) {
      cardTwo = this;

      let coord = cardTwo.id.split("-");
      let r = parseInt(coord[0]);
      let c = parseInt(coord[1]);

      cardTwo.src = "assets/images/" + canvas[r][c] + ".jpg";
      setTimeout(update, 1000);
      //clearInterval(startTimer);

    }

  }

}

// If function to check if the two cards selected are the same if they are remain showing if not they return to face down state. Till matched.

function update() {

  if (cardOne.src === cardTwo.src) {

    pairs++; // Increase pair counter for each match made

    document.getElementById("pairs").innerText = pairs;
    cardOne.removeEventListener("click", selectCard);
    cardTwo.removeEventListener("click", selectCard);

  } else {

    // If no match return cards to face down state
    cardOne.src = 'assets/images/fruitmcover.jpg';
    cardTwo.src = 'assets/images/fruitmcover.jpg';
  }

  cardOne = null;
  cardTwo = null;

  // Moves counter to track number of time when 2 cards are turned over to find a match

  moves++; // increase moves counter
  document.getElementById("moves").innerText = moves;

  // When the player matches all 8 cards they complete the game.

  if (pairs === 8) {

    endGame();


  }
}

// End Game logic adapted using https://moirahartigan.github.io/Portfolio-2---Alien-Memory-Game/ 

function endGame() {

  endTimer();
  winMsg();


}

function winMsg() {

  winmodal.style.display = "block";
  document.getElementById("endMoves").innerHTML = moves;
  var endTime = document.querySelector(".timer").textContent;
  document.getElementById("endTime").innerText = endTime;

}

// Win message pop-up modal

// Get the modal element
var winmodal = document.getElementById("win-modal");

// Close button
var winspan = document.getElementsByClassName("winclose")[0];

// Close button function
winspan.onclick = function () {
  winmodal.style.display = "none";
};

// New Game button - refreshes the browser to restart the game.

const newGameBtn = document.getElementById("btnNewGame");

function handleClick() {
  window.location.reload();
}

newGameBtn.addEventListener("click", handleClick);