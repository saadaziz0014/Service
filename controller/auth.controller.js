import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const secureP = await bcrypt.hash(password, 10);
    const myUser = new User({
      email,
      password: secureP,
      role,
    });

    const result = await myUser.save();

    if (result) {
      res.send("User Registered");
    } else {
      res.send("Error");
    }
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userF = await User.findOne({ email });
    if (!userF) {
      res.send("User Not Found");
    } else {
      const resultM = await bcrypt.compare(password, userF.password);
      if (resultM) {
        const token = await userF.generateToken();
        res.cookie("loginToken", token, {
          expires: new Date(Date.now() + 20 * 60000),
          httpOnly: true,
        });
        res.send("Logged In");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("loginToken", { path: "/" });
    res.send("Logout");
  } catch (err) {
    console.log(err);
  }
};
