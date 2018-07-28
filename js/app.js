"use strict"
/*
* Create a list that holds all of your cards
*/
const cards = [
 "fas fa-gem","fa fa-cube","fas fa-paper-plane","fa fa-bicycle",
 "fa fa-anchor","fa fa-leaf","fa fa-bomb","fa fa-bolt"];

const fontIcons = [...cards, ...cards];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 const cardContainer = document.querySelector('.deck');

 function init(){
   for(let i = 0; i < fontIcons.length; i++){
     const card =document.createElement('li');
     card.classList.add('card');
     card.innerHTML = `<i class ='${fontIcons[i]}')></i>`;
     cardContainer.appendChild(card);
     click(card);

   }
 }

 let openCard = [];
 let matchedCard = [];

 /*
 *  set up the event listener for a card. If a card is clicked:
 */
 function click (card){
   card.addEventListener("click",function(){
   const  presentCard = this;
   const  previousCard = openCard[0];
     if(openCard.length === 1){

       card.classList.add("open","show","disabled");
       openCard.push(this);
       compare(presentCard,previousCard);
      }else{
        presentCard.classList.add('open','show','disabled');
       openCard.push(this);
      }
    }
 )

 }

 /*
  *  - if the list already has another card, check to see if the two cards match
  */
 function compare (presentCard,previousCard){
   if(presentCard.innerHTML === previousCard.innerHTML){
   presentCard.classList.add('match');
   previousCard.classList.add('match');
   matchedCard.push(presentCard,previousCard); //*    + if the cards do match, lock the cards in the open position
   openCard = [];
   gameOver();
   }else{
     setTimeout(function(){
     presentCard.classList.remove('open','show','disabled');
     previousCard.classList.remove('open','show','disabled'); // if the cards do not match, remove the cards from the list and hide the card's symbol
     openCard = [];
     },0);
    }

    addMoves();
  }

/*
if all cards have matched, display a message with the final score
*/

function gameOver() {
    if(matchedCard.length === fontIcons.length){
    openModal();
    //alert(`game is over you made ${moves} moves`);
    shuffle(fontIcons); //shuffle card.
    clearInterval(i);
  }
}

/*
*create modals to appear with instructions at the end of our game.
*/

const modal = document.querySelector('.modal');
const closeBtn =  document.querySelector('.closeBtn');
const modalp = document.querySelector('.modal-p');

//add event listener to close modal box
closeBtn.addEventListener('click',closeModal);

//create a function to open modals
function openModal(){
 modal.style.display = 'block';
 modalp.innerHTML = `Congrats! You saved ${moveCount} stars in ${min} minutes and ${second} seconds. Click on &times; to close modal box and <i class="fas fa-redo-alt"></i> button on the top right side of the page to replay` ;
 }

//create a function to close modals
function closeModal(){
  modal.style.display = 'none';
}





// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
*create an addmove functionality
*increment the move counter and display it on the page
*/

const movesDiv = document.querySelector('.moves');

let moves = 0;
movesDiv.innerHTML = 0;
let moveCount = "";

function addMoves(){
   moves++;
  movesDiv.innerHTML = moves;
  rating();
}

/*
*create a rating function
*/
const starDiv = document.querySelector('.stars');
function rating(){
  if(moves < 15){
    starDiv.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
    moveCount = 3;
  }else if( moves <= 20){
    starDiv.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
    moveCount = 2;
  }else{
    starDiv.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    moveCount = 1;
  }
}


/*
*create a function to set time
*create a function to set countdown clock
*create a function to rest the countdown time
*/


let min = 0;
let second = 0;
let i ;
let timer_time;
function startTimer(){
   i =setInterval(function(){
      second++;
      if(second > 59){
          second = 0;
          min++;
      }
       timer_time = (min > 9 ? min : '0'+min)+':'+(second > 9 ? second : '0'+second);
      $('#gameStart').html(timer_time);
  }, 1000);
}


function stopTimer(){
    clearInterval(i);
}

function reset(){
  stopTimer();
  startTimer();
}

/*
*create a variable for restart button
*added event addEventListener
*reset the button to clear previous moves upon click
*reset the button to shuffle cards and restart time
*/

const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener ("click",function (){
  cardContainer.innerHTML = "";
  init();
  shuffle(fontIcons);
  matchedCard = [];
  openCard = [];
  moves = 0;
  movesDiv.innerHTML = moves;
  reset();

}
);

shuffle(fontIcons);
//initialitize our game.
startTimer();
init();
