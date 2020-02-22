
import { elements } from './base';

export const getNewLeaderName = () => {
  console.log(document.getElementById('leaderNameInput').value);
  return document.getElementById('leaderNameInput').value;
}

const createLeader = (leader, index) => `
  <tr>
    <td>${index}</td>
    <td>${leader.name}</td>
    <td>${leader.score}</td>
  </tr>
`;

export const renderLeaderBoard = (leaderboard) => {
  const html = `
    <table id="leader-board-table">
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
    <button class="btn-restart">
      Restart Game
    </button>
  `;

  // Remove existing cotnent
  const mdlContent = document.querySelector('.dialog');
  if (mdlContent) mdlContent.innerHTML = '';

  // Render new leaderboard
  const lbContainer = document.querySelector('.modal .dialog');
  lbContainer.insertAdjacentHTML('afterbegin', html);
}