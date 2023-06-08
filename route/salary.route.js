import express from "express";
import { checkLogin } from "../middlewares/authentication.js";
import { canAdd, canView } from "../middlewares/salary.js";
import { getSalary, addSalary } from "../controller/salary.controller.js";
const router = express.Router();

router.get("/getSalary", checkLogin, canView, getSalary);
router.post("/addSalary", checkLogin, canAdd, addSalary);

export default router;
