// src/routes/adminRoutes.js
import express from "express";
import { createUserByAdmin } from "../controllers/adminController.js";
import { verifyToken, requireRole } from "../middlewares/auth.js";

const router = express.Router();

// Only ADMIN can create users
router.post("/users", verifyToken, requireRole("ADMIN"), createUserByAdmin);

export default router;