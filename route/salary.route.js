import express from "express";
import { checkLogin } from "../middlewares/authentication.js";
import { canModify, canView } from "../middlewares/salary.js";
import {
  getSalary,
  addSalary,
  updateSalary,
  deleteSalary,
} from "../controller/salary.controller.js";
const router = express.Router();

router.get("/getSalary", checkLogin, canView, getSalary);
router.post("/addSalary", checkLogin, canModify, addSalary);
router.put("/updateSalary", checkLogin, canModify, updateSalary);
router.delete("/deleteSalary", checkLogin, canModify, deleteSalary);

export default router;
