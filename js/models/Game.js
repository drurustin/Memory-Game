export default class Game {
  constructor() {
    // Main Card Deck
    this.cards = [
      {
        'name': 'Bart',
        'imgSrc': 'bart.jpg'
      },
      {
        'name': 'Homer and Marg',
        'imgSrc': 'homer_marg.jpg'
      },
      {
        'name': 'Dr Hibbert',
        'imgSrc': 'dr_hibbert.jpg'
      },
      {
        'name': 'Grandpa Simpson',
        'imgSrc': 'grandpa.jpg'
      },
      {
        'name': 'Hans Moleman',
        'imgSrc': 'hans.jpg'
      },
      {
        'name': 'Moe',
        'imgSrc': 'moe.jpg'
      },
      {
        'name': 'Ned Flanders',
        'imgSrc': 'ned.jpg'
      },
      {
        'name': 'Nelson',
        'imgSrc': 'nelson.jpg'
      }
    ],
    this.gameScore = 0;
    this.moveCount = 0;
  }

  createNewDeck () {
    // Create pairs
    this.cards = createCardPairs(this.cards);

    // Shufffle deck
    this.cards = shuffleDeck(this.cards);
  }

  // Check for high score
  isHighScore (score, highScores) {
    let bool = false;

    console.log(highScores.length);
    // Is a high score if there are less than 10 high scores
    if (highScores.length < 10) {
      bool = true;
    } else {
      highScores.forEach(highScore => {
        if (score > parseInt(highScore.score)) {
          bool = true;
        }
      });
    }
    return bool; 
  }

  updateMoveCounter (flipCount) {
    this.moveCount++;    
  }
}

const createCardPairs = (arr) => {
  const newArray = [];

  // Create card pairs and push to newArray
  for(let i = 0; i < arr.length; i++) {
    newArray.push(arr[i]);
  }

  const combinedArray = arr.concat(newArray)
  return combinedArray;
}

const shuffleDeck = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }    
  
  return array;
}