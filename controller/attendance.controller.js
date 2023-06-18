import { myIps } from "../helper/data.js";
import Attendance from "../model/attendance.model.js";
import { getTime, getLocalIP } from "../helper/utils.js";

export const attendanceMarked = async (req, res) => {
  try {
    const data = req.ip;
    const email = req.body.email;
    const ip = data.split(":");
    const time = getTime();
    const day = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ipSplit = ip[3].split(".");
    const userIP = `${ipSplit[0]}.${ipSplit[1]}.${ipSplit[2]}`;
    const inMin = hours * 60 + minutes;
    if (myIps.includes(userIP)) {
      req.session.inTimeOffice = inMin;
    } else {
      req.session.inTimeRemote = inMin;
    }
    const result = await Attendance.findOne({ email, "attendances.day": day });
    const resEmail = await Attendance.findOne({ email });
    let newAtt = {
      day,
      totalHours: 0,
      marked: "Absent",
    };
    if (!resEmail) {
      const att = new Attendance({ email, attendances: [newAtt] });
      await att.save();
    } else if (result == null) {
      resEmail.attendances.push(newAtt);
      await resEmail.save();
    }
    res.status(201).send("In Time Noted");
  } catch (err) {
    console.log(err);
    res.status(500).send("err");
  }
};

export const attendanceReMarked = async (req, res) => {
  try {
    const email = req.email;
    const time = getTime();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const date = time.getDate();
    const outMin = hours * 60 + minutes;
    const officeIn = req.session.inTimeOffice;
    const remoteIn = req.session.inTimeRemote;
    const user = await Attendance.findOne({ email });
    let totalWork = 0;
    let inHours = 0;
    console.log(email);
    if (user.attendances.day == date) {
      totalWork = user.attendances.totalHours;
    }
    if (officeIn) {
      totalWork = totalWork + (outMin - officeIn);
      req.session.officeIn = 0;
    } else {
      totalWork = totalWork + (outMin - remoteIn);
      req.session.remoteInIn = 0;
    }
    inHours = totalWork / 60;
    if (inHours >= 7.5) {
      user.attendances.marked = "Present";
    } else if (inHours >= 5) {
      user.attendances.marked = "Half Day";
    } else {
      user.attendances.marked = "Absent";
    }
    user.attendances.totalHours = totalWork;
    await user.save();
    res.status(201).send("Marked");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
};
