import axios from "axios";
import { generateToken } from "./jwt.js";

axios.defaults.headers.common["auth"] = generateToken(process.env.api_key, 3);

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
