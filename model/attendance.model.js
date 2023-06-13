import mongoose from "mongoose";
import { Schema } from "mongoose";

const attendanceSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  attendance: {
    type: String,
    enum: ["Present", "Half Day", "Absent"],
    default: "Absent",
  },
  in: {
    type: String,
  },
  out: {
    type: String,
  },
});

export default mongoose.model("Attendance", attendanceSchema);
