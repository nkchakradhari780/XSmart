import express from "express";
import { adminLogin, adminLogout } from "../controllers/adminControllers.js";
import { verifyAdmin } from "../middlewares/authAdmin.js";
const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", verifyAdmin, adminLogout);

export default router;
