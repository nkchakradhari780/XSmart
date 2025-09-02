import db from '../config/dbConnection.js'


// Create product
export const createProduct = async (name, imageBuffer) => {
  const [result] = await db.query(
    "INSERT INTO Products (ProductName, Image) VALUES (?, ?)",
    [name, imageBuffer]
  );
  return { ProductId: result.insertId, ProductName: name };
};

// Get all products (without image blob for performance)
export const getAllProducts = async () => {
  const [rows] = await db.query(
    "SELECT * FROM Products"
  );
  return rows;
};

// Get product by ID (with image blob)
export const getProductById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM Products WHERE ProductId = ?",
    [id]
  );
  return rows[0];
};

// Update product (with optional image)
export const updateProduct = async (id, name, imageBuffer) => {
  if (imageBuffer) {
    await db.query(
      "UPDATE Products SET ProductName = ?, Image = ? WHERE ProductId = ?",
      [name, imageBuffer, id]
    );
  } else {
    await db.query(
      "UPDATE Products SET ProductName = ? WHERE ProductId = ?",
      [name, id]
    );
  }
  return { ProductId: id, ProductName: name };
};

// Delete product
export const deleteProduct = async (id) => {
  await db.query("DELETE FROM Products WHERE ProductId = ?", [id]);
  return { message: `Product ${id} deleted successfully` };
};