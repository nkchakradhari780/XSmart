import express from "express";
import multer from "multer";
import {
  addProduct,
  fetchProducts,
  fetchProductById,
  modifyProduct,
  removeProduct,
} from "../controllers/productControllers.js";

const router = express.Router();
const upload = multer(); // store in memory

router.post("/", upload.single("Image"), addProduct);
router.get("/", fetchProducts);
router.get("/:id", fetchProductById);
router.put("/:id", upload.single("Image"), modifyProduct);
router.delete("/:id", removeProduct);

export default router;
