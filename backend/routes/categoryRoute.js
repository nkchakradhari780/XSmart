import express from "express";
import {
  addCategory,
  fetchCategories,
  fetchCategoryById,
  modifyCategory,
  removeCategory,
} from "../controllers/categoriesControllers.js";
import { verifyAdmin } from "../middlewares/authAdmin.js";

const router = express.Router();

router.post("/", verifyAdmin, addCategory);
router.get("/", fetchCategories);
router.get("/:id", fetchCategoryById);
router.put("/:id", verifyAdmin, modifyCategory);
router.delete("/:id", verifyAdmin, removeCategory);

export default router;
