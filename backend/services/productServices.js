import db from "../config/dbConnection.js";

// Create product
export const createProduct = async (
  name,
  imageBuffer,
  pdfBuffer,
  pages,
  categoryIds = []
) => {
  try {
    // Insert into Products
    const [result] = await db.query(
      "INSERT INTO Products (ProductName, Image, PdfFile, Pages) VALUES (?, ?, ?, ?)",
      [name, imageBuffer, pdfBuffer, pages]
    );

    const productId = result.insertId;

    console.log("category ids", categoryIds);

    // Insert into ProductCategories if categories are provided
    if (categoryIds.length > 0) {
      const values = categoryIds.map((categoryId) => [productId, categoryId]);
      await db.query(
        "INSERT INTO ProductCategories (ProductId, CategoryId) VALUES ?",
        [values]
      );
    }

    return { ProductId: productId, ProductName: name, Categories: categoryIds };
  } catch (err) {
    throw err;
  }
};

// Get all products (with image blob for performance)
export const getAllProducts = async () => {
  const [rows] = await db.query(
    `SELECT 
        p.ProductId,
        p.ProductName,
        p.Image,
        p.PdfFile,
        p.Pages,
        c.CategoryId,
        c.CategoryName
     FROM Products p
     LEFT JOIN ProductCategories pc ON p.ProductId = pc.ProductId
     LEFT JOIN Categories c ON pc.CategoryId = c.CategoryId`
  );
  return rows;
};

// Get product by ID (with image blob)
export const getProductById = async (id) => {
  const [rows] = await db.query(
    `SELECT 
        p.ProductId,
        p.ProductName,
        p.Image,
        p.PdfFile,
        p.Pages,
        c.CategoryId,
        c.CategoryName
     FROM Products p
     LEFT JOIN ProductCategories pc ON p.ProductId = pc.ProductId
     LEFT JOIN Categories c ON pc.CategoryId = c.CategoryId
     WHERE p.ProductId = ?`,
    [id]
  );
  return rows;
};
// Update product (with optional image + pdf + categories)
export const updateProduct = async (
  id,
  name,
  imageBuffer,
  pdfBuffer,
  pages,
  categoryIds = null
) => {
  // --- Update Product ---
  if (imageBuffer && pdfBuffer) {
    await db.query(
      "UPDATE Products SET ProductName = ?, Image = ?, PdfFile = ?, Pages = ? WHERE ProductId = ?",
      [name, imageBuffer, pdfBuffer, pages, id]
    );
  } else if (imageBuffer) {
    await db.query(
      "UPDATE Products SET ProductName = ?, Image = ? WHERE ProductId = ?",
      [name, imageBuffer, id]
    );
  } else if (pdfBuffer) {
    await db.query(
      "UPDATE Products SET ProductName = ?, PdfFile = ?, Pages = ? WHERE ProductId = ?",
      [name, pdfBuffer, pages, id]
    );
  } else {
    await db.query("UPDATE Products SET ProductName = ? WHERE ProductId = ?", [
      name,
      id,
    ]);
  }

  // --- Update Categories only if provided ---
  if (Array.isArray(categoryIds)) {
    // Clear old categories
    await db.query("DELETE FROM ProductCategories WHERE ProductId = ?", [id]);

    if (categoryIds.length > 0) {
      // Build dynamic VALUES (?, ?) list
      const values = categoryIds.map((catId) => [id, catId]);
      const placeholders = values.map(() => "(?, ?)").join(", ");
      const flatValues = values.flat();

      await db.query(
        `INSERT INTO ProductCategories (ProductId, CategoryId) VALUES ${placeholders}`,
        flatValues
      );
    }
  }

  return { ProductId: id, ProductName: name, CategoryIds: categoryIds || [] };
};

// Delete product
export const deleteProduct = async (id) => {
  await db.query("DELETE FROM Products WHERE ProductId = ?", [id]);
  await db.query("DELETE FROM ProductCategories WHERE ProductId = ?", [id]);
  return { message: `Product ${id} deleted successfully` };
};
