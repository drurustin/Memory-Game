import Cards from "./models/Cards";
import Score from "./models/Score";
import Leader from "./models/Leader";
import * as cardsView from "./views/cardsView";
import * as starRatingView from "./views/starRatingView";
import * as leaderBoardView from "./views/leaderBoardView";
import * as modalView from "./views/modalView";

import { elements } from "./views/base";

/** Data */

const cardsData = [
  {
    "name": "LA Lakers",
    "imgSrc": ""
  },
  {
    "name": "Boston Celtics",
    "imgSrc": ""
  },
  {
    "name": "Milwaukee Bucks",
    "imgSrc": ""
  },
  {
    "name": "Golden State Warriors",
    "imgSrc": ""
  },
  {
    "name": "New York Knicks",
    "imgSrc": ""
  },
  {
    "name": "Chicago Bulls",
    "imgSrc": ""
  },
  {
    "name": "Houston Rockets",
    "imgSrc": ""
  },
  {
    "name": "Detroit Pistons",
    "imgSrc": ""
  }
];

let state = {};

/* Card Controller */
/* =============== */

const controlCard = () => {
  // Set all cards to be face down
  cardsView.resetCards();

  // Set up card deck
  const cardObj = new Cards(cardsData);
  cardObj.createNewDeck();

  state.cards = cardObj.cards;

  // Render cards to game board (grid)
  state.cards.forEach(card => {
    cardsView.renderCard(card);
  })
}

/* Time Controller */
/* ================ */

const controlTimer = () => {

  var timeout = setTimeout(function() {
  }, 10000);

  // Start Game Timer
  setInterval(
    () => {
      // Update state with current time
      state.currentTime++;
      // Save current time in local storage
      localStorage.setItem('currentTime', JSON.stringify(state.currentTime));
    },
    1000
  );
}

const controlStarRating = (flipCount) => {
  // After 20 turns reduce star ratings to 2
  // After 40 turns reduce star rating to 1
  if (flipCount === 6) {
    state.starRating = 1;
    starRatingView.removeStar();
  } else if (flipCount === 4) {
    state.starRating = 2;
    starRatingView.removeStar();
  } else if (flipCount === 2) {
    state.starRating = 0;
    starRatingView.removeStar();  
  }
  // Save star rating to local storage
  localStorage.setItem('starRating', JSON.stringify(state.starRating));

}

const controlMoveCounter = () => {
    // 1. Update flip count
    state.flipCount+= 1;

    // Count two card flips as a 'move'
    if (state.flipCount % 2 === 0) {
      // moveCounterView.updateMoveCounter();
    }

    // Save to local storage
    localStorage.setItem('flipCount', JSON.stringify(state.flipCount));

}


/* Score Controller */
/* ================ */

const controlScore = () => {

  state.score = new Score();


}

const controlLeader = () => {
  state.leader = new Leader();
}

const init = () => {

  controlTimer();

  /** Global state of the app
   * - Deck state
   * - Star Rating
   * - Move Counter
   * - Leaderboard
   */

  state = {
    "cards": [],
    "score": 0,
    "flipCount": 0,
    "currentSelection": [],
    "correctGuesses": 7,
    "matches": [],
    "starRating": 3,
    "currentTime": 0,
    "finishTime": 0,
    "leaderBoard": []
  };

  // Update leaderboard from local storage
  const leaderBoard = JSON.parse(localStorage.getItem('leaderBoard'));
  if (leaderBoard) state.leaderBoard = leaderBoard;


  controlCard();
  controlScore();
  controlStarRating(state.flipCount);
  starRatingView.resetStars();
  modalView.toggleModal('close');
}

// Run init function when content loads
document.addEventListener("DOMContentLoaded", init);

// Event delegation for card click
document.addEventListener("click", evt => {

  // If a memory card has been clicked
  if ( evt.target.matches(".card, .card *") && !evt.target.classList.contains('guessed')  ) {

    controlMoveCounter(state.flipCount);

    controlStarRating(state.flipCount);

    // 2. Capture title of clicked card
    state.currentSelection.push(evt.target.dataset.team);

    // 3. Flip card
    cardsView.flipCard(evt.target);

    // 3. If second selection in turn:
    if (state.currentSelection.length > 1) {
      // 4. Check for match
      if (state.currentSelection[0] === state.currentSelection[1]) {
        // If correct guess
        // Update state
        state.correctGuesses += 1;

        state.currentSelection.forEach(element => {
          cardsView.handleCorrectAnswer(element);        
        }); 

        // Check for winner
        if (state.correctGuesses === 8){

          state.score.totalScore  = state.currentTime;

          cardsView.handleWinner(state.score.totalScore, state.starRating);

          
          // Check for high score
          const isHighScore = state.score.isHighScore(state.score.totalScore, state.leaderBoard);

          if (isHighScore) {
            // 1. Find what the index of new score in the leaderboard should be
            console.log('High score!!');
            console.log(state.score.setNewScoreIndex(state.score.totalScore, state.leaderBoard));
          }

        }

      } else {
        state.currentSelection.forEach(element => {
          cardsView.handleIncorrectAnswer(element);        
        }); 
      }

      // 7. Empty current selection array
      state.currentSelection = [];
    }

  }

  // Close modal window
  if ( evt.target.matches(".btn-close-modal") ) {
    modalView.toggleModal('close');
    init(); 
  };

});

// Event delegation for card click
document.addEventListener("click", evt => {

});

// Get new leader name
document.addEventListener("submit", e => {
  e.preventDefault();
  if (e.target.matches(".leaderForm")) {
    
    state.newLeader = new Leader(leaderBoardView.getNewLeaderName(), state.score.totalScore);

    // Rank new leader
    state.newLeader.updateLeaderBoard(state.leaderBoard);

    // Display modal window with id of 'leader-board'
    modalView.toggleModal('close');
    modalView.toggleModal('open');
    leaderBoardView.renderLeaderBoard(state.leaderBoard);

    // Save to local storage
    localStorage.setItem('leaderBoard', JSON.stringify(state.leaderBoard));

  }

});

// Reset Game
document.querySelector('.page-wrapper').addEventListener("click", e => {
  if (e.target.matches(".btn-restart")) {
    init();
  }
});




