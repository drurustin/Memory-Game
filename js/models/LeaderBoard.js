export default class LeaderBoard {
  constructor(leaders) {
    // Leaders (cap at 5 leaders max)
    this.leaders = leaders.slice(0, 4) || [];
  }

  updateLeaderBoard(newLeader){

    this.leaders.push(newLeader);
    
    // Order leaders from highest score to lowest
    if (this.leaders.length > 1) {
      this.leaders.sort(function(a, b) {
        return b.score - a.score;
      });
    }

    };
}