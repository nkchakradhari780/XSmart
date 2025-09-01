import express from "express";
import {
  addCategory,
  fetchCategories,
  fetchCategoryById,
  modifyCategory,
  removeCategory,
} from "../controllers/categoriesControllers.js";

const router = express.Router();

router.post("/", addCategory);
router.get("/", fetchCategories);
router.get("/:id", fetchCategoryById);
router.put("/:id", modifyCategory);
router.delete("/:id", removeCategory);

export default router;
