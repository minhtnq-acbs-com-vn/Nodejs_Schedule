import axios from "axios";

const request = async () => {
  let response = await axios.post(process.env.requestToken, {
    email: process.env.email,
    password: process.env.password,
  });
  return response.headers.auth;
};

const getRoomDevice = async (roomName, userid) => {
  let token = await request();
  let result = await axios.get(process.env.requestRoomDevice + roomName, {
    headers: {
      auth: token,
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
  let token = await request();
  let result = await axios.get(process.env.requestSchedule + id, {
    headers: {
      auth: token,
      userid: userid,
    },
  });
  return result.data[0];
};

export { getRoomDevice, getSchedule };
