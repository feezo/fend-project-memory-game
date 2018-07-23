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
     }, 500);
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
    clearInterval(trend);
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
 modalp.innerHTML = `game is over you made ${moves} moves and saved ${moveCount} stars, click on &times;. To close this modal box and press the <i class="fas fa-redo-alt"></i> button on the top right corner of the page to restart game`;
 }

//create a function to close modals
function closeModal(){
  modal.style.display = 'none';
}





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

var trend ;

function startTimer(duration, display) {
   var timer = duration,minutes,seconds;
    trend = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}


//set count down time
jQuery(function ($) {
    var fiveMinutes = 60 * 5,
        display = $('#gameStart');
    startTimer(fiveMinutes, display);
});


//a time reset function

function reset(){
  clearInterval(trend);
  var fiveMinutes = 60 * 5,
  display = $('#gameStart');
  startTimer(fiveMinutes, display);
}

/*const count = timeIt();
const counter = 0;
function timeIt(){
  counter++;
  let timer = duration,minutes,seconds;
  let fiveMinutes = 60 * 5,
  timer.innerHTML = (fiveMinutes - counter);
}*/



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
  moves = 0;
  movesDiv.innerHTML = moves;
  reset();
}
);

//initialitize our game.
init();
