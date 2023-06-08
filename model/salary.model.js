import mongoose from "mongoose";
import { Schema } from "mongoose";

const salarySchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Salary", salarySchema);
