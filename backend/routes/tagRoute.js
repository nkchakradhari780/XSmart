import express from "express";
import * as tagController from "../controllers/tagControllers.js";
import { verifyAdmin } from "../middlewares/authAdmin.js";
const router = express.Router();

router.post("/", verifyAdmin, tagController.createTag);     
router.get("/", tagController.getAllTags);     
router.get("/:id", tagController.getTagById);  
router.put("/:id", verifyAdmin, tagController.updateTag);   
router.delete("/:id", verifyAdmin, tagController.deleteTag);

export default router;
