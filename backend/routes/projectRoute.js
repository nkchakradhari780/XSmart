import express from "express";
import multer from "multer";
import * as projectController from "../controllers/projectController.js";

const router = express.Router();
const upload = multer(); // memory storage, use diskStorage if needed

// Create Project with multiple images
router.post(
  "/create",
  upload.array("images", 5),
  projectController.createProject
);
router.put(
  "/:id",
  upload.array("images", 5),
  projectController.updateProjectById
);
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.get("/latest/pr", projectController.getLatestProjects);
router.delete("/:id", projectController.deleteProjectById);

export default router;
