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
    const { ProductName } = req.body;
    const imageBuffer = req.file ? req.file.buffer : null;

    if (!ProductName) {
      return res.status(400).json({ error: "ProductName is required" });
    }

    const product = await createProduct(ProductName, imageBuffer);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
export const fetchProducts = async (req, res) => {
  try {
    const products = await getAllProducts();

    // Convert image buffer to base64 before sending response
    const formattedProducts = products.map((product) => ({
      ...product,
      Image: product.Image ? product.Image.toString("base64") : null,
    }));

    res.json(formattedProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
};


// Get product by ID
export const fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Convert buffer -> base64 for frontend
    if (product.Image) {
      product.Image = product.Image.toString("base64");
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product
export const modifyProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { ProductName } = req.body;
    const imageBuffer = req.file ? req.file.buffer : null;

    const product = await updateProduct(id, ProductName, imageBuffer);
    res.json(product);
  } catch (err) {
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
