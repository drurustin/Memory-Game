export const elements = {
  gameBoard:  document.querySelector('.game-board'),
  starContainer: document.querySelector('#star-rating'),
  stars: document.querySelectorAll('.star'),
  starsDisabled: document.querySelectorAll('.star-disabled'),
  star: document.querySelector('.star'),
  modal: document.querySelector('.modal'),
};

// This is for class names that have been added to the DOM
// after the page has loaded
export const domStrings = {
  starDisabled: 'star-disabled',
  star: 'star',
  leaderNameInput: 'leaderNameInput',
  winnerModal: 'winner-message-content'
}
