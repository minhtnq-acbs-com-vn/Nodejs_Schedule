import axios from "axios";

const Auth = async () => {
  let result = await axios.post(
    `${process.env.requestAuth}`,
    {
      email: `${process.env.email}`,
      password: `${process.env.password}`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result.data.token;
};

const getRoomDevice = async roomName => {
  let result = await axios.get(`${process.env.requestRoomDevice}` + roomName);
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
  let token = await Auth();
  let result = await axios.get(`${process.env.requestSchedule}` + id, {
    headers: {
      auth: token,
    },
  });
  return result.data[0];
};

export { getRoomDevice, getSchedule };
