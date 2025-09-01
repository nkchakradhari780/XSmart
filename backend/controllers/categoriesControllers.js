import { createCategory } from '../services/categoriesServices.js';

export async function addCategory(req, res) {
  try {
    const { CategoryName } = req.body;
    const newCategory = await createCategory(CategoryName);
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
