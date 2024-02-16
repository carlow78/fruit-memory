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

window.onload = function() {
    shuffleCards();
    startGame();

}

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

function startGame()   {

    //arrange the cards across the canvas

    // r for rows, c for columns
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0;  c < columns; c++){
            let cardImage = cardList.pop();
            row.push(cardImage); //JavaScript
            // starting with 0-0 then 0-1 etc <img id = "0-0" src = "[card image]" class="card" the below code will copy and paste to index
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src =  "../assets/images/" + cardImage + ".jpg";
            card.classList.add("card");
            document.getElementById("canvas").append(card);



        }

        canvas.push(row);

        

}

console.log(canvas);
setTimeout(hideCards);

}

// Function to hide the cards showing the face down side.

function hideCards (){

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0;  c < columns; c++){
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = `../../assets/images/fruitmcover.jpg`

}
    }
}



