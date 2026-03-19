// src/routes/ratingRoutes.js
import express from "express";
import { addOrUpdateRating } from "../controllers/ratingController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyToken, addOrUpdateRating);

export default router;