/*
 * Create a list that holds all of your cards
 */
 const fontIcons = [
 "fa fa-diamond","fa fa-cube","fa fa-paper-plane-o","fa fa-bicycle","fa fa-cube",
 "fa fa-anchor","fa fa-leaf","fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-leaf",
 "fa fa-bolt","fa fa-paper-plane-o","fa fa-diamond","fa fa-anchor","fa fa-bomb"
 ];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 const cardContainer = document.querySelector('.deck')

 function init(){
   for(let i = 0; i < fontIcons.length; i++){
     const card =document.createElement('li');
     card.classList.add('card')
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
      alert(`game is over you made ${moves} moves`);
    }
    shuffle(fontIcons); //shuffle card.
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
    <li><i class="fa fa-star"></i></li>`
  }else if( moves <= 20){
    starDiv.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`
  }else{
    starDiv.innerHTML = `<li><i class="fa fa-star"></i></li>`
  }
}

var timer = new Timer();
timer.start({precision: 'seconds'});
timer.addEventListener('secondsUpdated', function (e){
  $('#gameStart .minutes').html(timer.getTotalTimeValues().minutes);
  $('#gameStart .seconds').html(timer.getTotalTimeValues().seconds);
  $('#gameStart .secondTenths').html(timer.getTotalTimeValues().secondTenths);
});




/*
*create a variable for restart button
*added event addEventListener
*reset the button to clear previous moves upon click
*/

const restartBtn = document.querySelector('.restart')
restartBtn.addEventListener ("click",function (){
  cardContainer.innerHTML = "";
  init();
  matchedCard = [];
  moves = 0;
  movesDiv.innerHTML = moves;

}

)
//initialitize our game.
init();

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
