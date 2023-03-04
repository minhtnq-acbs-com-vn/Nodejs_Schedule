import cron from "node-cron";

import { getSchedule } from "./api.js";

const GetCronExpress = time => {
  return `0 * * * ${time.dayOfTheWeek}`;
};

const CreateCronObject = (loopTime, id) => {
  let expression = GetCronExpress(loopTime);
  return cron.schedule(expression, () => console.log("Cron created"), {
    timezone: "Asia/Ho_Chi_Minh",
  });
};

const CreateCron = async id => {
  let docID = id.slice(id.indexOf(":") + 1, id.indexOf("-"));
  let docOp = id.slice(id.indexOf("-") + 1);
  if (docOp === "delete") {
  }
  if (docOp === "create" || docOp === "update") {
    let schedule = await getSchedule(docID);
    let cronJob = CreateCronObject(
      type,
      {
        dayOfTheWeek: schedule.dayOfTheWeek,
        timeOn: schedule.timeOn,
        timeOff: schedule.timeOff,
        repeat: schedule.repeat,
      },
      { roomName: schedule.room, request: schedule.request }
    );
    let valid = cron.validate(cronJob);
    if (valid !== true) return;
    // execSync('cd "C:/Users/potat/AppData/Roaming/BetterDiscord/themes/" && go run main.go')
    console.log("configCronList:", configCronList);
  }
};

export { CreateCron };
