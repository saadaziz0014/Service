import express from "express";
import { login, logout, register } from "../controller/auth.controller.js";
import { checkAdmin } from "../middlewares/authentication.js";
const router = express.Router();

router.post("/register", checkAdmin, register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
