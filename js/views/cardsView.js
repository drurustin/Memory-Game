import { elements } from './base';

export const renderCard = card => {
  // Create HTML markup for each card
  const markup = `
    <div class="card card-face-down" data-team="${card.name.replace(/\s+/g, '-').toLowerCase()}">
      ${card.name}${card.imgSrc}
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

export const handleIncorrectAnswer = item => {
  const els = document.querySelectorAll(`div[data-team="${item}"`);

  Array.from(els).forEach(el => {
    // Turn card back over by replacing class names
    if (el.classList.contains('card-face-up')) {
      el.classList.remove("card-face-up");
      el.classList.add("card-face-down");
    }
  })
}

export const handleCorrectAnswer = item => {
  const els = document.querySelectorAll(`div[data-team="${item}"`);

  Array.from(els).forEach(el => {
    el.classList.add("guessed");
  })
  
}

export const handleWinner = (time, starRating) => {
  console.log('handle winner');
  const targetEl = document.getElementById('winner-message');
  const html = `
    <div class="dialog">
      <div id="winner-message-content">
        Congrats! You have won!
        You finished in ${time} seconds and have a star rating of ${starRating} / 3 stars
        <button class="btn-close-modal">Play again?</button>
        <button class="btn-close-modal">Close</button>
        <form class="leaderForm">
          <div class="form-group">
            <input id="leaderNameInput" class="form-control" />
            <input type="submit" value="Submit">
          </div>
        </form>
      </div>
    </div>
  `

  // Remove existing cotnent
  const mdlContent = document.querySelector('.dialog');
  if (mdlContent) mdlContent.innerHTML = '';

  const modal = document.querySelector('.modal');

  mdlContent.insertAdjacentHTML('afterbegin', html);
  modal.classList.add('open'); 
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