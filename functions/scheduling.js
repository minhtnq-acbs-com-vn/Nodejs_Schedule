import cron from "node-cron";

import { getRoomDevice, getSchedule } from "./api.js";

const GetCronExpress = time => {
  let hourOn = "";
  let hourOff = "";
  let minuteOn = "";
  let minuteOff = "";

  //tim ra format gio:phut
  if (time.timeOn.search(":") !== -1) {
    hourOn = time.timeOn.slice(0, time.timeOn.indexOf(":"));
    minuteOn = time.timeOn.slice(time.timeOn.indexOf(":") + 1);
    console.log(hourOn);
    console.log(minuteOn);
  }
  //khong tim ra format
  if (time.timeOn.search(":") === -1) {
    hourOn = time.timeOn;
    minuteOn = "0";
  }
  //tim ra format gio:phut
  if (time.timeOff.search(":") !== -1) {
    hourOff = time.timeOff.slice(0, time.timeOff.indexOf(":"));
    minuteOff = time.timeOff.slice(time.timeOff.indexOf(":") + 1);
    console.log(hourOff);
    console.log(minuteOff);
  }
  //khong tim ra format
  if (time.timeOff.search(":") === -1) {
    hourOff = time.timeOff;
    minuteOff = "0";
  }
  // neu co 1 trong 2 time = -1
  if (time.timeOn === "-1" || time.timeOff === "-1") {
    if (time.timeOn === "-1") {
      return `${minuteOff} ${hourOff} * * ${time.dayOfTheWeek}`;
    }
    if (time.timeOff === "-1") {
      return `${minuteOn} ${hourOn} * * ${time.dayOfTheWeek}`;
    }
  }
  // co time on lan off
  if (time.timeOn !== "-1" && time.timeOff !== "-1") {
    
  }

  return `0 * * * ${time.dayOfTheWeek}`;
};

const CreateCronObject = loopTime => {
  let expression = GetCronExpress(loopTime);
  let valid = cron.validate(expression);
  if (valid === true) {
  } else return false;
};

const CreateCron = async id => {
  let docID = id.slice(id.indexOf(":") + 1, id.indexOf("-"));
  let docOp = id.slice(id.indexOf("-") + 1);
  if (docOp === "delete") {
  }
  if (docOp === "create" || docOp === "update") {
    let schedule = await getSchedule(docID);
    let cronJob = CreateCronObject({
      dayOfTheWeek: schedule.dayOfTheWeek,
      timeOn: schedule.timeOn,
      timeOff: schedule.timeOff,
      repeat: schedule.repeat,
    });

    if (cronJob !== false) {
      let device = await getRoomDevice(schedule.room);
      let deviceTopic = device.subscribe;
      let deviceRequest = schedule.request;
    }
    // execSync('cd "C:/Users/potat/AppData/Roaming/BetterDiscord/themes/" && go run main.go')
  }
};

export { CreateCron };
