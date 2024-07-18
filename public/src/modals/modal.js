const modal = document.getElementById('modalContainer');
const modalMessage = document.getElementById('modal-message-01');

export const hideModal = () => {
  modal.classList.add('hidden');
};

export const displayModalMessage = (message) => {
  modalMessage.innerHTML = message;
  modal.classList.remove('hidden');
};
