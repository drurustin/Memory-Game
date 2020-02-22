export default class Cards {
  constructor(cardsArray) {
    // Main Card Deck
    this.cards = cardsArray;
  }

  createNewDeck() {
    // Create pairs
    this.cards = createCardPairs(this.cards);

    // Shufffle deck
    this.cards = shuffleDeck(this.cards);
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