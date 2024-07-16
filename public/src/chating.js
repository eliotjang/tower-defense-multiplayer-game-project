const messagesContainer = document.querySelector('.chat-messages');
const inputField = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.chat-input button');
const chatContainer = document.getElementById('chatContainer');

sendButton.addEventListener('click', () => {
  const messageText = inputField.value.trim();
  if (messageText) {
    addMessage(messageText, 'user');
    inputField.value = '';
    setTimeout(() => {
      addMessage('게임 그렇게 하는거 아닌데', 'enemy');
    }, 1000);
  }
});

function addMessage(text, type) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', type);
  messageElement.textContent = text;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
