import { log } from "console";
import Attendance from "../model/attendance.model.js";
import os from "os";

function getLocalIP() {
  const interfaces = os.networkInterfaces();

  for (const interfaceName in interfaces) {
    const interf = interfaces[interfaceName];

    for (const iface of interf) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }

  return null;
}

export const attendanceMarked = async (req, res) => {
  try {
    const data = req.ip;
    const email = req.body.email;
    const ip = data.split(":");
    if (ip[3] == "127.0.0.1") {
      const result = await Attendance.findOne({ email });
      log(result);
      if (result) {
        const resultData = await Attendance.findOneAndUpdate(
          { email: result.email },
          { $set: { time: { in: Date.now(), out: null } } }
        );
        if (resultData) {
          res.status(201).send("Login and Marked");
        }
      }
      const resulty = new Attendance({
        email,
        attendance: "Present",
        time: [{ in: Date.now(), out: null }],
      });
      const resp = await resulty.save();
      if (resp) {
        res.status(201).send("Login and Marked");
      }
    } else {
      res.status(201).send("Logined but Absent Marked");
    }
  } catch (err) {
    console.log(err);
  }
};

export const attendanceReMarked = async (req, res) => {
  try {
    const email = req.email;
    console.log(email);
    const data = await Attendance.findOne({ email });
    if (data) {
      const result = await Attendance.findOneAndUpdate(
        { email },
        { $set: { time: { out: Date.now() } } }
      );
      if (result) {
        res.status(201).send("Out Noted");
      } else {
        res.status(401).send("Error in Updating Out");
      }
    } else {
      res.status(401).send("Data not Found");
    }
  } catch (error) {
    console.log(err);
  }
};
