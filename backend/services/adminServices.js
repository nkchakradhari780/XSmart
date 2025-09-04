import db from "../config/dbConnection.js";
import bcrypt from "bcrypt";

// Create new admin
export const createAdmin = async ({ fullName, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    `INSERT INTO Admins (FullName, Email, PasswordHash, Role)
     VALUES (?, ?, ?, ?)`,
    [fullName, email, hashedPassword, role || "admin"]
  );

  return { AdminId: result.insertId, fullName, email, role };
};

// Get all admins
export const getAllAdmins = async () => {
  const [rows] = await db.query(`SELECT AdminId, FullName, Email, Role, IsActive, CreatedAt, UpdatedAt FROM Admins`);
  return rows;
};

// Get admin by id
export const getAdminById = async (id) => {
  const [rows] = await db.query(
    `SELECT AdminId, FullName, Email, Role, IsActive, CreatedAt, UpdatedAt 
     FROM Admins WHERE AdminId = ?`,
    [id]
  );
  return rows[0];
};

// Update admin
export const updateAdmin = async (id, { fullName, email, role, isActive }) => {
  await db.query(
    `UPDATE Admins SET FullName=?, Email=?, Role=?, IsActive=? WHERE AdminId=?`,
    [fullName, email, role, isActive, id]
  );
  return await getAdminById(id);
};

// Delete admin
export const deleteAdmin = async (id) => {
  await db.query(`DELETE FROM Admins WHERE AdminId=?`, [id]);
  return { message: "Admin deleted successfully" };
};

