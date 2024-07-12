const protoTypeNames = {
  request: {
    NAME: "RequestPacket",
    PATH: "./src/protobuf/requests.proto",
  },
  response: {
    NAME: "ResponsePacket",
    PATH: "./src/protobuf/responses.proto",
  },
  notification: {
    NAME: "NotificationPacket",
    PATH: "./src/protobuf/notifications.proto",
  },
};

export default protoTypeNames;
