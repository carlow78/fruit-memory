// ** setting our function variable for the game



var moves = 0;

var pairs = 0;

var cardFruits = ["apple", "banana", "blueberry", "lemon", "mandarin", "mango", "orange", "strawberry"]; // Our fruit objects the player needs to match

var cardList; // Our Deck of cards

var canvas = []; // our game canvas

var rows = 4; 

var columns = 4;

var cardOne;
var cardTwo;

let startMe=false;

// How to Play Pop-up Modal adapted using https://www.w3schools.com/howto/howto_css_modals.asp */


// Get the modal element
var modal = document.getElementById("play-modal");

// How to Play button to launch popup modal
var btn = document.getElementById("howToPlay");

// Close button
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// Close button function
span.onclick = function() {
  modal.style.display = "none";
};

// Closes pop-up when user clicks outside
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};



/* Card game functioning adapted following along with online tutorial 
https://www.youtube.com/watch?v=wz9jeI9M9hI
*/


// Shuffle cards function

window.onload = function() {
    shuffleCards();
    startGame();

};

// Shuffling cards function using math floor and random.

function shuffleCards (){

// Concatenate cards so we have 2 of them

cardList = cardFruits.concat(cardFruits);

// Shuffle the cards


for (let x = 0;  x <  cardList.length; x++){

    let y = Math.floor(Math.random() * cardList.length); //Gets a random index



// randomize cards

let tmp = cardList[x];
cardList[x] = cardList[y];
cardList[y]= tmp;

console.log(cardList);

}

}

/*

To start the game the below function will copy and paste our deck of fruit cards (array) randomly on screen.
Starting with the first (1) square on screen down to the last (16).

*/


function startGame()   {
 

    // r for rows, c for columns
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0;  c < columns; c++){
            let cardImage = cardList.pop();
            row.push(cardImage); //JavaScript
            let card = document.createElement("img"); // HTML 
            card.id = r.toString() + "-" + c.toString();
            card.src =  "assets/images/" + cardImage + ".jpg"; 
            card.classList.add("card");
            // Listener click event for when the user clicks on the card. 
            
            card.addEventListener("click", selectCard);
            document.getElementById("canvas").append(card);

        }

        // Push the cards to the screen
        canvas.push(row);
    

}

// Print cards to screen.
console.log(canvas);

// Hide the cards so user can't see them till they are matched.

setTimeout(hideCards);

}

// Function to hide the cards showing them face down image (fruitmcover).

function hideCards (){

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0;  c < columns; c++){
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = `assets/images/fruitmcover.jpg`;

}
    }
}


/* Timer Function - https://stackoverflow.com/questions/55031097/how-do-i-start-a-timer-on-a-click#:~:text=the%20most%20basic%20way%20to,('%23button').

/* JavaScript */
var timer; // This variable will hold the interval function
var seconds = 0;
var minutes = 0;

function startTimer() {
  timer = setInterval(updateTimer, 1000); // Update the timer every second
}

function updateTimer() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }
  var time = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
  document.querySelector(".timer").textContent = time;
}

// Function to track when the user clicks on two cards to flip them over. 

function selectCard() {

 
  if(this.src.includes("fruitmcover")) {
       
      if(!cardOne ){
            cardOne = this; 
            
            
            let coord = cardOne.id.split("-");
            let r = parseInt(coord[0]);
            let c = parseInt(coord[1]);
            
            cardOne.src = "assets/images/" + canvas[r][c]  + ".jpg"; 
  
            
      }

      if (!startMe) {

        startMe=true;
        startTimer();
    
      }
 
      
        else if (!cardTwo && this != cardOne){
            cardTwo = this;
            

            let coord = cardTwo.id.split("-");
            let r = parseInt(coord[0]);
            let c = parseInt(coord[1]);

            cardTwo.src = "assets/images/" + canvas[r][c]  + ".jpg";      
            setTimeout(update, 1000);
            //clearInterval(startTimer);

        }

        
      }


        }
 

// If function to check if the two cards selected are the same if they are they remaining showing if not they return to face down state. Till matched.


function update () {

    if (cardOne.src != cardTwo.src){

        cardOne.src=`assets/images/fruitmcover.jpg`;
        cardTwo.src=`assets/images/fruitmcover.jpg`;
        // Counter to increase move event by 1 
        moves ++;
        document.getElementById("moves").innerText = moves;

  
    
    cardOne = null;
    cardTwo = null;

    }

    else if (cardOne.src == cardTwo.src) {

      pairs++;
      document.getElementById("pairs").innerText = pairs;

    }


  }

    


// New game/restart game function - using page refresh

https://teamtreehouse.com/community/any-one-know-how-to-make-a-restart-button


function newGame (){

    window.location.reload();


}
