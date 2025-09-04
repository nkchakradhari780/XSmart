import db from "../config/dbConnection.js"; // MySQL2 connection or pool

// Create Material
export const createMaterial = async (MaterialName) => {
  try {
    const [result] = await db.query(
      `INSERT INTO Materials (MaterialName) VALUES (?)`,
      [MaterialName]
    );
    return { MaterialId: result.insertId, MaterialName };
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new Error("Material already exists");
    }
    throw err;
  }
};

// Get All Materials
export const getAllMaterials = async () => {
  const [rows] = await db.query(
    `SELECT * FROM Materials ORDER BY MaterialId DESC`
  );
  return rows;
};

// Get Single Material
export const getMaterialById = async (id) => {
  const [rows] = await db.query(
    `SELECT * FROM Materials WHERE MaterialId = ?`,
    [id]
  );
  if (rows.length === 0) throw new Error("Material not found");
  return rows[0];
};

// Update Material
export const updateMaterial = async (id, MaterialName) => {
  const [result] = await db.query(
    `UPDATE Materials SET MaterialName = ? WHERE MaterialId = ?`,
    [MaterialName, id]
  );
  if (result.affectedRows === 0) throw new Error("Material not found");
  return { MaterialId: id, MaterialName };
};

// Delete Material
export const deleteMaterial = async (id) => {
  const [result] = await db.query(
    `DELETE FROM Materials WHERE MaterialId = ?`,
    [id]
  );
  if (result.affectedRows === 0) throw new Error("Material not found");
  return { message: "Material deleted successfully" };
};
