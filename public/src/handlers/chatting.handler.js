import { addMessage } from '../chatting.js';

const chattingHandler = ({ socket, packetType, payload }) => {
  const { chattingMessage } = payload;
  addMessage(chattingMessage, 'enemy');
};

export default chattingHandler;
