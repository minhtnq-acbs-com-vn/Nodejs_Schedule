import axios from "axios";
import { generateToken } from "./jwt.js";

let token = generateToken(process.env.api_key, 3);
axios.defaults.headers.common["auth"] = token;
console.log("🚀 ~ file: api.js:7 ~ process.env.api_key:", process.env.api_key);
console.log("🚀 ~ file: api.js:5 ~ token:", token);

const getRoomDevice = async roomName => {
  let result = await axios.get(process.env.requestRoomDevice + roomName);
  let newArr = result.data.map(obj => ({
    deviceModule: obj.deviceModule,
    subscribe: obj.topic.subscribe,
    publish: obj.topic.publish,
    ackTopic: obj.topic.ack,
    request: obj.request,
    ack: obj.ack,
  }));

  return newArr[0];
};

const getSchedule = async id => {
  let result = await axios.get(process.env.requestSchedule + id);
  return result.data[0];
};

export { getRoomDevice, getSchedule };
