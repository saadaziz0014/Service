import "dotenv/config";
import express from "express";
import userRouter from "./route/user.route.js";
import salaryRouter from "./route/salary.route.js";
import cookieParser from "cookie-parser";
import "./db.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/user", userRouter);
app.use("/api/salary", salaryRouter);

app.listen(8800, () => {
  console.log("Backend is Running");
});
