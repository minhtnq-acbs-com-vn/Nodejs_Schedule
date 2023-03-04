import { client } from "../index.js";
import { subTopic } from "../config/init.js";
import { CreateCron } from "./scheduling.js";

const SubscribeToTopics = () => {
  client.subscribe(subTopic);
  console.log("Wait for messages");
};

const RequestHandler = (topic, message) => {
  console.log("", topic, message);
  if (
    message.startsWith("schedule") &&
    message.search(":") !== -1 &&
    message.search("-") !== -1
  )
    CreateCron(message);
};

export { SubscribeToTopics, RequestHandler };
