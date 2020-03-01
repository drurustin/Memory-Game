export default class Score {
  constructor() {
    this.currentScore = 0;
    this.totalScore = 0;
  }

  isHighScore (score, highScores) {
    let res = false;
    highScores.forEach(highScore => {
      if (score < parseInt(highScore.score)) {
        res = true;
      }
    });
    return res; 
  }

  setNewScoreIndex (score, highScores) {
    
    for (let i = 0; i < highScores.length; i++) {
      if (score < highScores[i].score){
        return i;
      }
    }

  }

}

