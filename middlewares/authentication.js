import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const checkLogin = async (req, res, next) => {
  try {
    const loginToken = req.cookies.loginToken;
    const verify = jwt.verify(loginToken, process.env.JWTK);
    if (verify) {
      const data = User.findOne({ _id: verify._id, token: loginToken });
      if (data) {
        req.id = data._conditions._id;
        req.user = data;
        next();
      } else {
        res.send("Not Authenticated");
      }
    }
  } catch (err) {
    console.log(err);
  }
};
