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
    const { ProductName, CategoryIds } = req.body;

    if (!ProductName) {
      return res.status(400).json({ error: "ProductName is required" });
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
        return res.status(400).json({ error: "Invalid CategoryIds format" });
      }
    }

    // Call service to create product
    const product = await createProduct(
      ProductName,
      imageBuffer,
      pdfBuffer,
      categories
    );

    res.status(201).json(product);
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
          Image: row.Image ? row.Image.toString("base64") : null,
          PdfFile: row.PdfFile ? row.PdfFile.toString("base64") : null,
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
    res.status(200).json({ response: "Products Featched Success Fully", result: products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID
export const fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await getProductById(id);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Build product with categories
    const product = {
      ProductId: rows[0].ProductId,
      ProductName: rows[0].ProductName,
      Image: rows[0].Image ? rows[0].Image.toString("base64") : null,
      PdfFile: rows[0].PdfFile ? rows[0].PdfFile.toString("base64") : null,
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

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update product
export const modifyProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { ProductName, CategoryIds } = req.body;

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
      categoryIds
    );

    res.json(product);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete product
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProduct(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
