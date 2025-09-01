import db from '../config/dbConnection.js';

// Create Category
export const createCategory = async (name) => {
  const [result] = await db.query(
    "INSERT INTO categories (CategoryName) VALUES (?)",
    [name]
  );
  return { id: result.insertId, CategoryName: name };
};

// Get all Categories
export const getAllCategories = async () => {
  const [rows] = await db.query("SELECT * FROM categories");
  return rows;
};

// Get Category by ID
export const getCategoryById = async (id) => {
  const [rows] = await db.query("SELECT * FROM categories WHERE CategoryId = ?", [id]);
  return rows[0];
};

// Update Category
export const updateCategory = async (id, name) => {
  await db.query("UPDATE categories SET CategoryName = ? WHERE CategoryId = ?", [
    name,
    id,
  ]);
  return { id, CategoryName: name };
};

// Delete Category
export const deleteCategory = async (id) => {
  await db.query("DELETE FROM categories WHERE CategoryId = ?", [id]);
  return { message: `Category ${id} deleted successfully` };
};