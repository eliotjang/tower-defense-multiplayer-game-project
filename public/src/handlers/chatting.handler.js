import { addMessage } from '../chatting.js';

const chattingNotificationHandler = ({ socket, packetType, payload }) => {
  const { chat } = payload;
  addMessage(chat, 'enemy');
};

export default chattingNotificationHandler;
