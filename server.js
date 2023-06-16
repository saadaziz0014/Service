import "dotenv/config";
import express from "express";
import userRouter from "./route/user.route.js";
import salaryRouter from "./route/salary.route.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import "./db.js";

const app = express();
const loopbackAddress = "127.0.0.1";
app.set("trust proxy", loopbackAddress);

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  req.session.totalwork = 0;
  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/user", userRouter);
app.use("/api/salary", salaryRouter);

app.listen(8800, () => {
  console.log("Backend is Running");
});
