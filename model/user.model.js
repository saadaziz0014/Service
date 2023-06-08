import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Employee", "Manager", "HR"],
    default: "Employee",
  },
  token: String,
});

userSchema.methods.generateToken = async function () {
  try {
    const myToken = jwt.sign({ _id: this._id }, process.env.JWTK);
    this.token = myToken;
    await this.save();
    return myToken;
  } catch (err) {
    console.log(err);
  }
};

export default mongoose.model("User", userSchema);
