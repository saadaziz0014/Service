import User from "../model/user.model.js";
import Salary from "../model/salary.model.js";

export const canView = async (req, res, next) => {
  try {
    const id = req.id;
    const data = await User.findOne({ _id: id });
    const dataSal = await Salary.findOne({ email: data.email });
    if (data.role == "Admin" || data.role == "HR") {
      req.admin = true;
      next();
    } else if (dataSal) {
      req.email = dataSal.email;
      next();
    } else {
      res.send("Not Allowed or Not in Pay roll");
    }
  } catch (err) {
    console.log(err);
  }
};

export const canModify = async (req, res, next) => {
  try {
    const id = req.id;
    const data = await User.findOne({
      _id: id,
      role: "Admin",
    });
    if (data) {
      req.admin = true;
      next();
    } else {
      res.send("Not Allowed");
    }
  } catch (err) {
    console.log(err);
  }
};

export const canRemove = async (req, res, next) => {
  try {
    const id = req.id;
    const user = await User.findOne({ _id: id, role: "Admin" });
  } catch (err) {
    console.log(err);
  }
};
