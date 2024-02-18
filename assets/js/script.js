// ** setting our function variable for the game

var timer = 0;

var moves = 0;

var pairs_made = 0;

var cardFruits = ["apple", "banana", "blueberry", "lemon", "mandarin", "mango", "orange", "strawberry"]; // Our fruit objects the player needs to match

var cardList; // Our Deck of cards

var canvas = []; // our game canvas

var rows = 4; 

var columns = 4;

var cardOne;
var cardTwo;


// Function to shuffle our cards before starting the game

window.onload = function() {
    shuffleCards();
    startGame();

}

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

To start the game the below function will copy and paste our array randomly on screen.
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
            card.src =  "../assets/images/" + cardImage + ".jpg"; 
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
            card.src = `../../assets/images/fruitmcover.jpg`

}
    }
}


// Function to track when the user clicks on two cards to flip them over. 

function selectCard() {

    if(this.src.includes("fruitmcover")) {
        if(!cardOne){
            cardOne = this;

            let coord = cardOne.id.split("-");
            let r = parseInt(coord[0]);
            let c = parseInt(coord[1]);

            cardOne.src = "../assets/images/" + canvas[r][c]  + ".jpg";  

        }

        else if (!cardTwo && this != cardOne){
            cardTwo = this;

            let coord = cardTwo.id.split("-");
            let r = parseInt(coord[0]);
            let c = parseInt(coord[1]);

            cardTwo.src = "../assets/images/" + canvas[r][c]  + ".jpg"; 
            setTimeout(update, 1000);

        }
        
        }
        
        }

// If function to check if the two cards selected are the same if they are they remaining showing if not they return to face down state. Till matched.


function update () {

    if (cardOne.src != cardTwo.src){

        cardOne.src=`../../assets/images/fruitmcover.jpg`
        cardTwo.src=`../../assets/images/fruitmcover.jpg`
        // Counter to increase move event by 1 
        moves += 1;
        document.getElementById("moves").innerText = moves;

    }

    cardOne = null;
    cardTwo = null;


}


