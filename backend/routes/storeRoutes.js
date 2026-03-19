// src/routes/storeRoutes.js
import express from "express";
import { createStore } from "../controllers/storeController.js";
import { verifyToken, requireRole } from "../middlewares/auth.js";
import { getStores } from "../controllers/storeController.js";
const router = express.Router();

// Only ADMIN can create store
router.post("/", verifyToken, requireRole("ADMIN"), createStore);
router.get("/",verifyToken, getStores);
export default router;