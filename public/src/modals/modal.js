// const modalOpenButton = document.getElementById('modalOpenButton');
// const modalCloseButton = document.getElementById('modalCloseButton');
const modal = document.getElementById('modalContainer');
const modalMessage = document.getElementById('modal-message-01');

// modalOpenButton.addEventListener('click', () => {
//   modal.classList.remove('hidden');
// });

// modalCloseButton.addEventListener('click', () => {
//   modal.classList.add('hidden');
// });

export const hideModal = () => {
  modal.classList.add('hidden');
};

export const displayModalMessage = (message) => {
  // const modal = document.getElementById('modalContainer');
  // const modalMessage = document.querySelector('.modalMessage');
  modalMessage.innerHTML = message;
  modal.classList.remove('hidden');
};
