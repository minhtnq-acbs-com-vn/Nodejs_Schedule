import axios from "axios";

import { requestRoomDevice, requestSchedule } from "../config/apiUrl.js";

const getRoomDevice = async roomName => {
  let result = await axios.get(requestRoomDevice + roomName);
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
  let result = await axios.get(requestSchedule + id);
  return result.data[0];
};

export { getRoomDevice, getSchedule };
