import express from "express";
import * as tagController from "../controllers/tagControllers.js";

const router = express.Router();

router.post("/", tagController.createTag);     // Create
router.get("/", tagController.getAllTags);     // Read All
router.get("/:id", tagController.getTagById);  // Read One
router.put("/:id", tagController.updateTag);   // Update
router.delete("/:id", tagController.deleteTag);// Delete

export default router;
