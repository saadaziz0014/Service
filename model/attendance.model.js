import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  attendances: [
    {
      day: {
        type: Number,
      },
      totalHours: {
        type: Number,
      },
      marked: {
        type: String,
      },
    },
  ],
});

export default mongoose.model("Attendance", attendanceSchema);
