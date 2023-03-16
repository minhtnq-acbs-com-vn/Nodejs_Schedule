import dotenv from "dotenv";
import * as mqtt from "mqtt";
import { RequestHandler, SubscribeToTopics } from "./functions/eventHandler.js";

dotenv.config({ path: "./config/config.env" });

let client = mqtt.connect({
  host: process.env.brokerHost,
  username: process.env.brokerUname,
  password: process.env.brokerPassword,
  clientId: "Nodejs_Schedule",
  port: 1883,
  clean: true,
  connectTimeout: 1000,
  reconnectPeriod: 1000,
});

client.on("connect", () => SubscribeToTopics());
client.on("message", (topic, message) =>
  RequestHandler(topic, message.toString())
);
client.on("error", err => console.error(err));

export { client };
