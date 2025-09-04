import express from "express";
import * as materialController from "../controllers/materialControllers.js";
import { verifyAdmin } from "../middlewares/authAdmin.js";
const router = express.Router();

router.post("/create", verifyAdmin, materialController.createMaterial);      
router.get("/:id", materialController.getMaterialById);   
router.get("/", materialController.getAllMaterials);      
router.put("/:id", verifyAdmin, materialController.updateMaterial);    
router.delete("/:id", verifyAdmin, materialController.deleteMaterial); 

export default router;
