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
  },
  time: [
    {
      in: {
        type: Date,
      },
      out: {
        type: Date,
      },
    },
  ],
});

export default mongoose.model("Attendance", attendanceSchema);
