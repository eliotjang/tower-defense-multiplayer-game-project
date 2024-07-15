import { packetNames } from '../constants/proto.constants.js';

const protoMessages = {};

export const loadProtoFile = () => {
  const files = Object.values(packetNames);
  const paths = files.map((file) => file.PATH);
  protobuf.load(paths, (err, root) => {
    if (err) {
      console.log('proto 파일 로드 실패:', err);
    }
    for (const name of files.map((file) => file.NAME)) {
      protoMessages[name] = root.lookupType(name);
    }

    Object.freeze(protoMessages);
    console.log('proto 파일 로드 성공.');
    // console.log(Object.entries(protoMessages).map((protoMessage) => protoMessage[1].name));
  });
};

export const getProtoMessages = () => protoMessages;
