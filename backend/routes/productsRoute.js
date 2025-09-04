import express from "express";
import multer from "multer";
import {
  addProduct,
  fetchProducts,
  fetchProductById,
  modifyProduct,
  removeProduct,
  fetchLatestProducts
} from "../controllers/productControllers.js";

import { verifyAdmin } from "../middlewares/authAdmin.js";

const router = express.Router();
const upload = multer(); // store in memory

const multiUpload = upload.fields([
  { name: "Image", maxCount: 1 },
  { name: "PdfFile", maxCount: 1 }
]);

router.post("/", verifyAdmin, multiUpload, addProduct);
router.get("/", fetchProducts);
router.get("/:id", fetchProductById);
router.get("/latest/three", fetchLatestProducts);
router.put("/:id", verifyAdmin, multiUpload, modifyProduct);
router.delete("/:id", verifyAdmin, removeProduct);

export default router;
