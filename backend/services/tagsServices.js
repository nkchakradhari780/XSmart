import db from '../config/dbConnection.js'; // your MySQL2 pool/connection

// Create Tag
export const createTag = async (TagName) => {
  try {
    const [result] = await db.query(
      `INSERT INTO Tags (TagName) VALUES (?)`,
      [TagName]
    );
    return { TagId: result.insertId, TagName };
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new Error("Tag already exists");
    }
    throw err;
  }
};

// Get All Tags
export const getAllTags = async () => {
  const [rows] = await db.query(`SELECT * FROM Tags ORDER BY TagId DESC`);
  return rows;
};

// Get Single Tag
export const getTagById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM Tags WHERE TagId = ?`, [id]);
  if (rows.length === 0) throw new Error("Tag not found");
  return rows[0];
};

// Update Tag
export const updateTag = async (id, TagName) => {
  const [result] = await db.query(
    `UPDATE Tags SET TagName = ? WHERE TagId = ?`,
    [TagName, id]
  );
  if (result.affectedRows === 0) throw new Error("Tag not found");
  return { TagId: id, TagName };
};

// Delete Tag
export const deleteTag = async (id) => {
  const [result] = await db.query(`DELETE FROM Tags WHERE TagId = ?`, [id]);
  if (result.affectedRows === 0) throw new Error("Tag not found");
  return { message: "Tag deleted successfully" };
};
