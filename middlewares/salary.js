import User from "../model/user.model.js";
import Salary from "../model/salary.model.js";

export const canView = async (req, res, next) => {
  try {
    const id = req.id;
    const data = await User.findOne({ _id: id, role: "Admin" });
    const dataSal = await Salary.findOne({ email: data.email });
    if (data) {
      req.admin = true;
      next();
    } else if (dataSal) {
      req.email = data.email;
      next();
    } else {
      res.send("Not Allowed");
    }
  } catch (err) {
    console.log(err);
  }
};

export const canAdd = async (req, res, next) => {
  try {
    const id = req.id;
    const data = await User.findOne({ _id: id, role: "Admin" });
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
