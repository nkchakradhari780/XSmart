import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/categoriesServices.js";

// Create Category
export const addCategory = async (req, res) => {
  try {
    const { CategoryName } = req.body;
    if (!CategoryName) {
      return res.status(400).json({ error: "CategoryName is required" });
    }
    const category = await createCategory(CategoryName);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Categories
export const fetchCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Category by ID
export const fetchCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Category
export const modifyCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { CategoryName } = req.body;
    if (!CategoryName) {
      return res.status(400).json({ error: "CategoryName is required" });
    }
    const category = await updateCategory(id, CategoryName);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Category
export const removeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteCategory(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};