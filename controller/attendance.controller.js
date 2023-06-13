import { log } from "console";
import Attendance from "../model/attendance.model.js";
import { getTime, getLocalIP } from "../helper/utils.js";

export const attendanceMarked = async (req, res) => {
  try {
    const data = req.ip;
    const email = req.body.email;
    const ip = data.split(":");
    const time = getTime();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    if (ip[3] == getLocalIP()) {
      const result = await Attendance.findOne({ email });
      if (result) {
        let resultData;
        if (hours >= 2) {
          resultData = await Attendance.findOneAndUpdate(
            { email },
            {
              $set: {
                in: `${hours}:${minutes}`,
                out: null,
                attendance: "Absent",
              },
            }
          );
        } else if (hours >= 12) {
          resultData = await Attendance.findOneAndUpdate(
            { email },
            {
              $set: {
                in: `${hours}:${minutes}`,
                out: null,
                attendance: "Half Day",
              },
            }
          );
        }
        if (resultData) {
          res.status(201).send("Login and Marked");
        }
      } else {
        let resulty;
        if (hours >= 2) {
          resulty = new Attendance({
            email,
            attendance: "Absent",
            in: `${hours}:${minutes}`,
            out: null,
          });
        } else {
          if (hours >= 12) {
            resulty = new Attendance({
              email,
              attendance: "Half Day",
              in: `${hours}:${minutes}`,
              out: null,
            });
          }
        }
        const resp = await resulty.save();
        if (resp) {
          res.status(201).send("Login and Marked");
        }
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
    const time = getTime();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const data = await Attendance.findOne({ email });
    if (data) {
      let result;
      const inT = data.in.split(":");
      if (hours - inT[0] >= 5) {
        result = await Attendance.findOneAndUpdate(
          { email },
          { $set: { out: `${hours}:${minutes}`, attendance: "Present" } }
        );
      } else if (hours - inT[0] >= 3) {
        result = await Attendance.findOneAndUpdate(
          { email },
          { $set: { out: `${hours}:${minutes}`, attendance: "Half Day" } }
        );
      } else {
        result = await Attendance.findOneAndUpdate(
          { email },
          { $set: { out: `${hours}:${minutes}`, attendance: "Absent" } }
        );
      }
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
