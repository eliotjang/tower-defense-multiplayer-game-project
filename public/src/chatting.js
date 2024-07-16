const messagesContainer = document.querySelector('.chat-messages');

export function addMessage(text, type) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', type);
  messageElement.textContent = text;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

export function displayChat() {
  const chatContainer = document.getElementById('chatContainer');
  if (chatContainer) {
    chatContainer.style.display = 'flex';
  }
}
