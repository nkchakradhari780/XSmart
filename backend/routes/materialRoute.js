import express from "express";
import * as materialController from "../controllers/materialControllers.js";

const router = express.Router();

router.post("/", materialController.createMaterial);      // Create
router.get("/", materialController.getAllMaterials);      // Read All
router.get("/:id", materialController.getMaterialById);   // Read One
router.put("/:id", materialController.updateMaterial);    // Update
router.delete("/:id", materialController.deleteMaterial); // Delete

export default router;
