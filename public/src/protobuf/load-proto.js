import protoTypeNames from "../constants/proto-type-names.constants.js";

const protoMessages = {};

export const loadProtoFile = () => {
  try {
    const root = new protobuf.Root();
    for (const [type, constants] of Object.entries(protoTypeNames)) {
      protoMessages[constants.NAME] = root.lookupType(constants.PATH);
    }
    Object.freeze(protoMessages);
    console.log("proto 파일 로드 성공.");
    console.log(Object.entries(protoMessages).map((protoMessage) => protoMessage[1].name));
  } catch (err) {
    console.error(err);
  }
};

export const getProtoMessages = () => protoMessages;
