// src/routes/adminRoutes.js
import express from "express";
import { createUserByAdmin } from "../controllers/adminController.js";
import { verifyToken, requireRole } from "../middlewares/auth.js";
import { getDashboardStats,getAllUsers, getAllStores } from "../controllers/adminController.js";

const router = express.Router();

// Only ADMIN can create users
router.post("/users", verifyToken, requireRole("ADMIN"), createUserByAdmin);
router.get("/dashboard", verifyToken, requireRole("ADMIN"), getDashboardStats);
router.get("/users", verifyToken, requireRole("ADMIN"), getAllUsers);
router.get("/stores", verifyToken, requireRole("ADMIN"), getAllStores);


export default router;