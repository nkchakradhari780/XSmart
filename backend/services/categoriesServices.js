import db from '../config/dbConnection.js';

// Create new category
export async function createCategory(categoryName) {
  const [result] = await db.query(
    'INSERT INTO Categories (CategoryName) VALUES (?)',
    [categoryName]
  );
  return { categoryId: result.insertId, categoryName };
}
 