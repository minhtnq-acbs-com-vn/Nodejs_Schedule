import axios from "axios";

const getRoomDevice = async (roomName, userid) => {
  let result = await axios.get(process.env.requestRoomDevice + roomName, {
    headers: {
      system: process.env.systemKey,
      userid: userid,
    },
  });
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

const getSchedule = async (id, userid) => {
  let result = await axios.get(process.env.requestSchedule + id, {
    headers: {
      system: process.env.systemKey,
      userid: userid,
    },
  });
  return result.data[0];
};

export { getRoomDevice, getSchedule };
