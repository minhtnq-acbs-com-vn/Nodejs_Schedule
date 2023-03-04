import * as mqtt from "mqtt";

const brokerConfig = {
  host: "192.168.68.116",
  username: "pi",
  password: "Kou-chan1153",
  clientId: "PacketFilterandForwarder",
  port: 1883,
  clean: true,
  connectTimeout: 1000,
  reconnectPeriod: 1000,
};

const subTopic = "scheduler/server";
const pubTopic = "schduler/noti";

export { mqtt, brokerConfig, subTopic, pubTopic };
