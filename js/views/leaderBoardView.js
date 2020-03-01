import { domStrings } from './base';

export const getNewLeaderName = () => {
  return document.querySelector(`#${domStrings.leaderNameInput}`).value;
}

const createLeader = (leader, index) => `
  <tr>
    <td>${index}</td>
    <td>${leader.name}</td>
    <td>${leader.score}</td>
  </tr>
`;

export const renderLeaderForm = (score) => {
  const html = `        
    <form class='leader-form'>
      <div class='form-group'>
        <h3>New high score of ${score}!</h3>
        <p>Enter your name to be added to the leaderboard</p>
        <input id='leaderNameInput' class='form-control' /><br>
        <input type='submit' class='btn btn-reverse' value='Submit'>
      </div>
    </form>
  `
  document.querySelector(`#${domStrings.winnerModal}`).insertAdjacentHTML('beforeend', html);
}

export const renderLeaderBoard = (leaderboard) => {
  const html = `
    <h2>Springfield Hall of Fame</h2>
    <div class="leader-board-container"> 
      <div>        
        <picture>
          <source media="(min-width: 650px)" srcset="/img/ralph.png">
          <source media="(min-width: 465px)" srcset="/img/ralph.png">
          <img src="/img/ralph.png" alt="Ralph Wiggum" class="ralph-wiggum">
        </picture> 
      </div>
      <div>
        <table id='leader-board-table'>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            ${leaderboard.map( (leader, index) => createLeader(leader, index + 1)).join('')}
          </tbody>
        </table>
        <button class='btn btn-primary btn-restart'>
          Restart Game
        </button>
      </div>
    </div>
  `;

  // Remove existing content
  const mdlContent = document.querySelector('.dialog');
  if (mdlContent) mdlContent.innerHTML = '';

  // Render new leaderboard
  const lbContainer = document.querySelector('.modal .dialog');
  lbContainer.insertAdjacentHTML('afterbegin', html);
  
}

export const handleInvalidField = () => {
  const html = `<div class="error-label">Please enter a name.</div>`;
  leaderNameInput.classList.add('invalid-field');
  leaderNameInput.insertAdjacentHTML('afterend', html);
}