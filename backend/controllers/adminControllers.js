import * as adminService from "../services/adminServices.js";

// Create
export const createAdmin = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const admin = await adminService.createAdmin(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read all
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read one
export const getAdminById = async (req, res) => {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
export const updateAdmin = async (req, res) => {
  try {
    const updated = await adminService.updateAdmin(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
export const deleteAdmin = async (req, res) => {
  try {
    const result = await adminService.deleteAdmin(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

