import db from "../config/dbConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // store in .env


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


// 🔑 Login service
export const loginAdmin = async (Email, Password) => {
  const [rows] = await db.query(
    "SELECT * FROM Admins WHERE Email = ? AND IsActive = TRUE LIMIT 1",
    [Email]
  );

  if (rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const admin = rows[0];

  const match = await bcrypt.compare(Password, admin.PasswordHash);
  if (!match) {
    throw new Error("Invalid email or password");
  }

  // generate JWT
  const token = jwt.sign(
    { AdminId: admin.AdminId, Role: admin.Role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { admin, token };
};

// 🚪 Logout service (no DB changes, just clear cookie)
export const logoutAdmin = () => {
  return true;
};
