import express, { application } from "express";

import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import storeRoutes from "./storeRoutes.js";
import ratingRoutes from "./ratingRoutes.js";

const router = express.Router();

// mount all routes here
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/stores", storeRoutes);
router.use("/ratings", ratingRoutes);


export default router;