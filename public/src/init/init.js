import GameData from '../classes/game-data.class.js';
import { loadProtoFile } from '../protobuf/load-proto.js';
import initSocket from '../socket.js';

loadProtoFile();
initSocket();
