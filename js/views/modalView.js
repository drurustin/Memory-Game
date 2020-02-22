import { elements } from './base';

export const toggleModal = (action) => {
  const modal = document.querySelector(`.modal`);
  if (modal && action === 'open') {
    modal.classList.add('open');
  } else if (modal && action === 'close') {
    modal.classList.remove('open');
  }
}