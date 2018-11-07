/*
 * Create a list that holds all of your cards
 */

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

let moveCount = 0;
let stars = document.querySelectorAll(".stars li");
let allCards = document.querySelectorAll('.card');
let openMatchedCards = [];
let openUnmatchedCards = [];
let timerCount = 0;
let myTimer;



function handleMatch(card1, card2) {
    //check if cards match
    if (card1 !== card2 && card1.querySelector("i").classList.value === card2.querySelector("i").classList.value) {
        //remove open and show classes from both cards 
        card1.classList.remove('open', 'show');
        card2.classList.remove('open', 'show');

        //add match class to both the cards
        card1.classList.add("match");
        card2.classList.add("match");


        openMatchedCards.push(card1);
        openMatchedCards.push(card2);
    } else {
        //close both the cards after a timeout of 300ms
        setTimeout(function () {
            card1.classList.remove('open', 'show');
            card2.classList.remove('open', 'show');
        }, 300);

    }
}



function myCounter() {
    document.getElementById("timer").innerHTML = `${++timerCount} seconds`;
}
function turn(e) {
    //start timer on first click
    if (moveCount === 0) {
        myTimer = setInterval(myCounter, 1000);
    }
    moveCount++;
    //display incremented moveCount
    document.querySelector(".moves").textContent = moveCount;

    if (e.target.classList.contains('match') == false) {
        if (e.target.classList.contains('open') == false)
            openUnmatchedCards.push(e.target);
        else
            openUnmatchedCards.pop();
        e.target.classList.toggle("open");
        e.target.classList.toggle("show");
    }

    //when two cards are open, they need to be checked for a match
    if (openUnmatchedCards.length === 2) {
        handleMatch(openUnmatchedCards[0], openUnmatchedCards[1]);
        if (openMatchedCards.length === 16) {
            //stop timer
            clearInterval(myTimer);
            //congratsPlayer();
        }
        openUnmatchedCards.pop();
        openUnmatchedCards.pop();
    }

    // logic for decreasing starts
    //one star will fade away after 16, 32 and 48 moves.
    if (moveCount == 17) {
        stars[0].style.display = "none";
    }
    else if (moveCount == 33) {
        stars[1].style.display = "none";
    }
    else if (moveCount == 49) {
        stars[2].style.display = "none";
    }
}



//add event listener to every card
for (card of allCards) {
    card.addEventListener('click', turn);
}

//add event listener for restart 
let restartButton = document.querySelector(".restart");
restartButton.addEventListener('click', function () {
    //reset cards
    for (card of allCards) {
        card.classList.remove('open', 'show', 'match');
    }

    //reset stars
    for (star of stars) {
        star.style.display = "inline-block";
    }

    moveCount = 0;
    timerCount = 0;
    clearInterval(myTimer);
    document.querySelector("#timer").innerHTML = "";
    document.querySelector(".moves").textContent = moveCount;
    //emppty all arrays.
    while (openMatchedCards.length > 0) {
        openMatchedCards.pop();
    }
    while (openUnmatchedCards.length > 0) {
        openUnmatchedCards.pop();
    }
    //shuffle deck
});
