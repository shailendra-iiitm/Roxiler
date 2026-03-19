import express from "express";
import { createStore } from "../controllers/storeController.js";
import { verifyToken, requireRole } from "../middlewares/auth.js";
import { getStores, getOwnerDashboard} from "../controllers/storeController.js";

const router = express.Router();

router.post("/", verifyToken, requireRole("ADMIN"), createStore);
router.get("/",verifyToken, getStores);
router.get("/owner-dashboard", verifyToken, requireRole("OWNER"), getOwnerDashboard);

export default router;