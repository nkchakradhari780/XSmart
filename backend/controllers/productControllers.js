import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/productServices.js";

// Create product
export const addProduct = async (req, res) => {
  try {
    const { ProductName, CategoryIds, Pages } = req.body;

    if (!ProductName) {
      return res
        .status(400)
        .json({ success: false, error: "ProductName is required" });
    }

    // File uploads: assuming multer handles multiple fields
    const imageBuffer = req.files?.Image ? req.files.Image[0].buffer : null;
    const pdfBuffer = req.files?.PdfFile ? req.files.PdfFile[0].buffer : null;

    // CategoryIds may come as JSON string from Postman
    let categories = [];
    if (CategoryIds) {
      try {
        categories = Array.isArray(CategoryIds)
          ? CategoryIds
          : JSON.parse(CategoryIds);
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid CategoryIds format" });
      }
    }

    // Call service to create product
    const product = await createProduct(
      ProductName,
      imageBuffer,
      pdfBuffer,
      Pages,
      categories
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Product Created Successfully.",
        product,
      });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all products
export const fetchProducts = async (req, res) => {
  try {
    const rows = await getAllProducts();

    // Group products with their categories
    const productsMap = {};

    rows.forEach((row) => {
      if (!productsMap[row.ProductId]) {
        productsMap[row.ProductId] = {
          ProductId: row.ProductId,
          ProductName: row.ProductName,
          Pages: row.Pages,
          Image: row.Image ? row.Image.toString("base64") : null,
          PdfFile: row.PdfFile ? row.PdfFile.toString("base64") : null,
          Updated_at: row.Updated_at,
          Categories: [],
        };
      }

      if (row.CategoryId) {
        productsMap[row.ProductId].Categories.push({
          CategoryId: row.CategoryId,
          CategoryName: row.CategoryName,
        });
      }
    });

    const products = Object.values(productsMap);
    res
      .status(200)
      .json({
        success: true,
        message: "Products Featched Success Fully",
        result: products,
      });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get product by ID
export const fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await getProductById(id);

    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // Build product with categories
    const product = {
      ProductId: rows[0].ProductId,
      ProductName: rows[0].ProductName,
      Pages: rows[0].Pages,
      Image: rows[0].Image ? rows[0].Image.toString("base64") : null,
      PdfFile: rows[0].PdfFile ? rows[0].PdfFile.toString("base64") : null,
      Updated_at: rows[0].Updated_at,
      Categories: [],
    };

    rows.forEach((row) => {
      if (row.CategoryId) {
        product.Categories.push({
          CategoryId: row.CategoryId,
          CategoryName: row.CategoryName,
        });
      }
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Product Fetched Successfully",
        product,
      });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update product
export const modifyProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { ProductName, CategoryIds, Pages } = req.body;

    // Multer with .fields gives arrays in req.files
    const imageBuffer = req.files?.Image ? req.files.Image[0].buffer : null;
    const pdfBuffer = req.files?.PdfFile ? req.files.PdfFile[0].buffer : null;

    let categoryIds = null;
    if (CategoryIds !== undefined) {
      try {
        categoryIds = Array.isArray(CategoryIds)
          ? CategoryIds
          : JSON.parse(CategoryIds);
      } catch (err) {
        console.error("CategoryIds parse error:", err);
        categoryIds = [];
      }
    }

    const product = await updateProduct(
      id,
      ProductName,
      imageBuffer,
      pdfBuffer,
      Pages,
      categoryIds
    );

    res.status(200).json({ success: true, product });
  } catch (err) {
    if (err.message === "Product not found") {
      return res.status(404).json({ error: err.message });
    }
    console.error("Error updating product:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete product
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProduct(id);
    res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully." });
  } catch (err) {
    if (err.message === "Product not found") {
      return res.status(404).json({ success: false, error: err.message });
    }
    res.status(500).json({ success: false, error: err.message });
  }
};
