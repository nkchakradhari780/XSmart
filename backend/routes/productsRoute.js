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

const multiUpload = upload.fields([
  { name: "Image", maxCount: 1 },
  { name: "PdfFile", maxCount: 1 }
]);

router.post("/", multiUpload, addProduct);
router.get("/", fetchProducts);
router.get("/:id", fetchProductById);
router.put("/:id", multiUpload, modifyProduct);
router.delete("/:id", removeProduct);

export default router;
