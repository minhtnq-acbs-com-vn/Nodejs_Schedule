import { mqtt, brokerConfig } from "./config/init.js";

import { RequestHandler, SubscribeToTopics } from "./functions/eventHandler.js";
let client = mqtt.connect(brokerConfig);

client.on("connect", () => SubscribeToTopics());
client.on("message", (topic, message) =>
  RequestHandler(topic, message.toString())
);

export { client };