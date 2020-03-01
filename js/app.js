import Game from './models/Game';
import LeaderBoard from './models/LeaderBoard';
import * as gameView from './views/gameView';
import * as timerView from './views/timerView';
import * as starRatingView from './views/starRatingView';
import * as leaderBoardView from './views/leaderBoardView';
import * as modalView from './views/modalView';

let state = {};

/* Game Controller */
/* =============== */

const controlCard = () => {
  // Set all cards to be face down
  gameView.resetCards();

  // Set up card deck
  state.game = new Game();
  state.game.createNewDeck();

  // Render cards to game board (grid)
  state.game.cards.forEach(card => {
    gameView.renderCard(card);
  })
}

/* Time Controller */
/* ================ */

const controlTimer = () => {

  // Start Game Timer
  state.timer = setInterval(
    () => {
      if (state.gameStatus === 'playing') {
        // Update state with current time
        state.currentTime++;

        // Display time elapsed
        timerView.displayTime(state.currentTime);

        // Update score (for every second take off 1 point)
        if (state.score > 0 && state.gameStatus === 'playing') state.score--;

      } else if (state.gameStatus === 'stopped') {
        timerView.displayTime(state.finishTime);
      }

    },
    1000
  );
}

const controlStarRating = (moveCount) => {
  console.log('move count = ' + moveCount);
  // After 15 moves, reduce star ratings to 2
  // After 25 moves, reduce star rating to 1
  // After 35 moves, reduce star rating to 0
  if (moveCount === 35) {
    state.starRating = 0;
    starRatingView.removeStar();
  } else if (moveCount === 25) {
    state.starRating = 1;
    starRatingView.removeStar();
  } else if (moveCount === 15) {
    state.starRating = 2;
    starRatingView.removeStar();  
  }
}


const init = () => {

  // Global state of the app

  state = {
    'gameStatus': 'stopped',
    'score': 1000,
    'flipCount': 0,
    'currentSelection': [],
    'correctGuesses': 7,
    'matches': [],
    'starRating': 3,
    'currentTime': 0,
    'leaderBoard': []
  };

  controlTimer();

  // Update leaderboard from local storage
  const leaderBoard = JSON.parse(localStorage.getItem('leaderBoard'));
  // Set state leaderboard and keep to 5 leaders max
  if (leaderBoard) state.leaderBoard = leaderBoard;

  controlCard();
  gameView.updateMoveCounter(state.game.moveCount);
  starRatingView.resetStars();
  modalView.toggleModal('close');

  state.gameStatus = 'playing';
}

// Run init function when content loads
document.addEventListener('DOMContentLoaded', init);

// Event delegation for card click
document.addEventListener('click', evt => {

  // Prevent card from being clicked twice
  // evt.target.style.pointerEvents = 'none';

  // If a memory card has been clicked
  if ( evt.target.matches('.card, .card *') && !evt.target.classList.contains('guessed')  ) {

    // Update flip count for each click
    state.flipCount+= 1;

    // 2 flips = 1 move
    if (state.flipCount%2 === 0) {
      // Update move count
      state.game.updateMoveCounter(state.flipCount);
      gameView.updateMoveCounter(state.game.moveCount);
      
      // Lock cards so you can't click another card until
      // cards are flipped back over
      gameView.toggleCardLock('lock');
    }

    // Handle star rating
    controlStarRating(state.game.moveCount);

    // Capture title of clicked card
    state.currentSelection.push(evt.target.dataset.item);

    // Flip card
    gameView.flipCard(evt.target);

    // If second selection in turn:
    if (state.currentSelection.length > 1) {

      // If correct guess
      if (state.currentSelection[0] === state.currentSelection[1]) {
  
        // Update state
        state.correctGuesses += 1;

        // Update the UI to show correct guess
        state.currentSelection.forEach(element => {
          gameView.handleCorrectGuess(element);        
        }); 

        // Check if all cards have been matched
        if (state.correctGuesses === 8){

          // Update the game state
          state.gameState = 'stopped';

          // Save the current time as the total time
          state.finishTime = state.currentTime;

          gameView.handleWinner(state.finishTime, state.starRating);

          // Check for high score
          if (state.game.isHighScore(state.score, state.leaderBoard)){
            // If it is a high score show high score form
            leaderBoardView.renderLeaderForm(state.score);
          }

        }

      } else {
        // Handle incorrect guess
        state.currentSelection.forEach(element => {
          gameView.handleIncorrectGuess(element);        
        }); 
      }

      // Unlock cards
      setTimeout(function(){
        gameView.toggleCardLock('unlock');
      }, 3000);

      // Empty current selection array
      state.currentSelection = [];
    }

  }

  // Close modal window
  if ( evt.target.matches('.btn-close-modal') ) {
    modalView.toggleModal('close');
    clearInterval(state.timer);
    init(); 
  };

});

// Handle new leader
document.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.matches('.leader-form')) {

    const lb = new LeaderBoard(state.leaderBoard);
    
    const newLeader = {
      name: leaderBoardView.getNewLeaderName(),
      score: state.score
    };

    if (newLeader.name.length > 0){
      lb.updateLeaderBoard(newLeader);
    
      state.leaderBoard = lb.leaders;    
  
      // Display modal window
      modalView.toggleModal('close');
      modalView.toggleModal('open');
      leaderBoardView.renderLeaderBoard(state.leaderBoard);
  
      console.log(state.leaderBoard);
      // Save to local storage
      localStorage.setItem('leaderBoard', JSON.stringify(state.leaderBoard));
      console.log(state.leaderBoard);
    } else {
      leaderBoardView.handleInvalidField();
    }

  }

});

window.addEventListener('scroll', function(e) {
  if (window.pageYOffset > 250) {
    const clouds = document.querySelectorAll('.cloud');
    Array.from(clouds).forEach( cloud => {
      cloud.classList.add('fade-out');
    });
  }
});

// Reset Game
document.querySelector('.page-wrapper').addEventListener('click', e => {
  if (e.target.matches('.btn-restart')) {
    clearInterval(state.timer);
    init();
  }
});




