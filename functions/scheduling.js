import cron from "node-cron";

import { getRoomDevice, getSchedule } from "./api.js";
import { execSync } from "child_process";

const GetCronExpress = time => {
  let hourOn = "";
  let hourOff = "";
  let minuteOn = "";
  let minuteOff = "";

  //tim ra format gio:phut
  if (time.timeOn.search(":") !== -1) {
    hourOn = time.timeOn.slice(0, time.timeOn.indexOf(":"));
    minuteOn = time.timeOn.slice(time.timeOn.indexOf(":") + 1);
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
  }
  //khong tim ra format
  if (time.timeOff.search(":") === -1) {
    hourOff = time.timeOff;
    minuteOff = "0";
  }
  if (time.timeOn === "-1") {
    return {
      type: "singleOff",
      expression: `${minuteOff} ${hourOff} * * ${time.dayOfTheWeek}`,
    };
  }
  if (time.timeOff === "-1") {
    return {
      type: "singleOn",
      expression: `${minuteOn} ${hourOn} * * ${time.dayOfTheWeek}`,
    };
  }
  if (time.timeOn !== "-1" && time.timeOff !== "-1") {
    return {
      type: "multiple",
      expression: [
        `${minuteOn} ${hourOn} * * ${time.dayOfTheWeek}`,
        `${minuteOff} ${hourOff} * * ${time.dayOfTheWeek}`,
      ],
      order: ["on", "off"],
    };
  }
};

const CreateCronObject = (loopTime, req) => {
  let expression = GetCronExpress(loopTime);
  if (expression.type === "singleOn") {
    if (cron.validate(expression.expression) !== true) return false;
    RunGoCommand(
      req.id,
      "on",
      `${expression.expression} mosquitto_pub -h localhost -t '${req.topic}' -m '${req.request}' -u '${process.env.brokerUname}' -P '${process.env.brokerPassword}'`,
      "create",
      req.rerun
    );
  }
  if (expression.type === "singleOff") {
    if (cron.validate(expression.expression) !== true) return false;
    RunGoCommand(
      req.id,
      "off",
      `${expression.expression} mosquitto_pub -h localhost -t '${req.topic}' -m '${req.request}' -u '${process.env.brokerUname}' -P '${process.env.brokerPassword}'`,
      "create",
      req.rerun
    );
  }
  if (expression.type === "multiple") {
    let reqArr = [
      req.request.slice(0, req.request.indexOf(",")),
      req.request.slice(req.request.indexOf(",") + 2),
    ];
    for (let i = 0; i < expression.expression.length; i++) {
      if (cron.validate(expression.expression[i]) !== true) return false;
      RunGoCommand(
        req.id,
        expression.order[i],
        `${expression.expression[i]} mosquitto_pub -h localhost -t '${req.topic}' -m '${reqArr[i]}' -u '${process.env.brokerUname}' -P '${process.env.brokerPassword}'`,
        "create",
        req.rerun
      );
    }
  }
};

const CreateCron = async id => {
  let docID = id.slice(id.indexOf(":") + 1, id.indexOf("-"));
  let uid = id.slice(id.indexOf("@") + 1);
  let schedule = await getSchedule(docID, uid);
  let device = await getRoomDevice(schedule.room, uid);

  if (id.indexOf("(") !== -1) {
    let docDel = id.slice(id.indexOf("(") + 1, id.indexOf(")"));
    RunGoCommand(schedule._id, docDel, "delete", "delete", "yes");
    return;
  }

  let cronJob = CreateCronObject(
    {
      dayOfTheWeek: schedule.dayOfTheWeek,
      timeOn: schedule.timeOn,
      timeOff: schedule.timeOff,
      rerun: schedule.rerun,
    },
    {
      id: schedule._id,
      topic: device.subscribe,
      request: schedule.request,
      rerun: schedule.rerun,
    }
  );

  if (cronJob === false) console.log("something wrong with creating cron");
};

const RunGoCommand = (id, toggle, cronjob, op, rerun) => {
  if (rerun === "yes") {
    execSync(
      `cd /home/ubuntu/helpers/go-crontab-manipulate && ./main -id ${id} -toggle ${toggle} -cronjob "${cronjob}" -op ${op}`
    );
  }
  if (rerun === "no") {
    cronjob += ` && cd /home/ubuntu/helpers/go-crontab-manipulate && ./main -id ${id} -toggle ${toggle} -cronjob "delete" -op delete && cd`;
    execSync(
      `cd /home/ubuntu/helpers/go-crontab-manipulate && ./main -id ${id} -toggle ${toggle} -cronjob "${cronjob}" -op ${op}`
    );
  }
};

export { CreateCron };
