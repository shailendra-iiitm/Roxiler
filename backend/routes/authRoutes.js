// src/routes/authRoutes.js
import express from "express";
import { register, login , updatePassword } from "../controllers/authController.js";
import { verifyToken} from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-password", verifyToken, updatePassword);

export default router;