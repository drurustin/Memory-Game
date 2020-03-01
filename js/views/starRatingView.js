import { domStrings } from './base';

export const removeStar = () => {
  setTimeout(function(){ 
  const star = document.querySelector(`.${domStrings.star}`);
  star.classList.add(domStrings.starDisabled);
  star.classList.remove(domStrings.star);
  console.log('removed');
  }, 3500);
}

export const updateStarRating = (count) => {
  const stars = Array.from(domStrings.stars);
  for (let i = count; i < count; i++) {
    stars[i].add(domStrings.star);
  }
}

export const resetStars = () => {
  const stars = document.querySelectorAll(`.${domStrings.starDisabled}`);
  Array.from(stars).forEach( star => {
    star.classList.remove(domStrings.starDisabled);
    star.classList.add(domStrings.star);
   });
}

