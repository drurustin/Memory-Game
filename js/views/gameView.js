import { elements } from './base';

export const renderCard = card => {
  // Create HTML markup for each card
  const rootContext = document.body.getAttribute("data-root");
  const markup = `
    <div class='card card-face-down' data-item='${card.name.replace(/\s+/g, '-').toLowerCase()}'>
    <picture>
      <source media="(min-width: 650px)" srcset="/img/${card.imgSrc}" class="card-img">
      <source media="(min-width: 465px)" srcset="/img/${card.imgSrc}" class="card-img">
      <img src="/img/${card.imgSrc}" alt="Simpsons Character" class="card-img">
    </picture>  
    </div>
  `;

  // Append card to game board
  elements.gameBoard.insertAdjacentHTML('beforeend', markup);
}

export const flipCard = card => {
  if (card.matches('.card-face-down')) {
    // Replace up with down
    card.classList.replace('card-face-down', 'card-face-up');
  } else if (card.matches('.card-face-up')) {
    // or down with up
    card.classList.replace('card-face-up', 'card-face-down');
  }
}

export const toggleCardLock = (type) => {
  const cards = document.querySelectorAll('.card');
  
    Array.from(cards).forEach(card => {
      if (type === 'lock') {
        // card.style.pointerEvents = 'none';
      } else if (type === 'unlock') {
        // card.style.pointerEvents = 'auto';
      }
    });
}

export const updateMoveCounter = count => {
  const mc = document.getElementById('move-counter');
  mc.innerText = count;
}

export const handleIncorrectGuess = item => {
  const els = document.querySelectorAll(`div[data-item='${item}'`);

  Array.from(els).forEach(el => {

    if (el.classList.contains('card-face-up')) {

      // Allow for incorrect animation to play before
      // flipping cards back over
      setTimeout(function(){ 

        // Add class to cards to show incorrect guess
        el.classList.add('incorrect-guess');

        setTimeout(function(){ 
          el.classList.remove('card-face-up');
          el.classList.remove('incorrect-guess');
          el.classList.add('flip-down');
          el.classList.add('card-face-down');
          
          // Is this what they call callback hell?
          setTimeout(function(){
            el.classList.remove('flip-down'); 
          }, 1600);

        }, 1000);

       }, 1200);

    }
  })
}

export const handleCorrectGuess = item => {
  setTimeout(function(){ 
    const els = document.querySelectorAll(`div[data-item='${item}'`);

    Array.from(els).forEach(el => {
      el.classList.add('correct-guess');
    })
  }, 1000);
}

export const handleWinner = (time, starRating) => {
  let html;
  let doughnutPlural;

  starRating > 1 ? doughnutPlural = `s` : ``;

  if (starRating > 0) {
    html = `
    <div id='winner-message-content' class="has-star-rating">
      <h2>Woohoo, you have won!</h2>
      <p>You finished in ${time} seconds and have collected ${starRating} / 3 doughnuts.</p>
      <button class='btn btn-primary btn-restart'>Play again?</button>
      <button class='btn-close-modal'>Close</button>
    </div>
  `
  } else {
    html = `
    <div id='winner-message-content' class="no-star-rating">
      <h2>Good job, you have guessed all matches!</h2>
      <p>You finished in ${time} seconds.</p>
      <button class='btn btn-primary btn-restart'>Play again?</button>
      <button class='btn-close-modal'>Close</button>
    </div>
  `
  }

  // Remove existing cotnent
  const mdlContent = document.querySelector('.dialog');
  if (mdlContent) mdlContent.innerHTML = '';

  const modal = document.querySelector('.modal');

  mdlContent.insertAdjacentHTML('afterbegin', html);
  
  // Allow time for correct guess animation to play
  // before rendering winner message
  setTimeout(function(){  
    modal.classList.add('open'); 
  }, 2500);
}

export const closeModal = () => {
  const modal = document.querySelector('.modal');
  document.body.removeChild(modal);
}

export const resetCards = () => {
  const cards = document.querySelectorAll('.card');
  if (cards.length > 0) { 
    console.log(cards);
    Array.from(cards).forEach(card => {
      card.parentNode.removeChild(card); 
    })
    
  }
}