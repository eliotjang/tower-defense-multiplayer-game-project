import packetTypes from '../constants/packet-types.constants.js';
import { getPayloadKeyNameByPacketType, packetNames } from '../constants/proto.constants.js';
import Game from '../game.js';
import { toggleCssClass } from '../utils/toggler.utils.js';

const signUpHandler = ({ socket, packetType, payload }) => {
  console.log('signUpHandler');
  // console.log(Object.keys(payload));
  // console.log(getPayloadKeyNameByPacketType(packetType));
  // console.log(payload[getPayloadKeyNameByPacketType(packetType)]);
  // console.log(Object.keys(payload[getPayloadKeyNameByPacketType(packetType)]));

  // div 토글
  toggleCssClass('hide', 'register-buttons-01', 'main-buttons-01');
};

export default signUpHandler;
