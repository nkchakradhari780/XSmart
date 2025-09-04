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


export const adminLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    const { admin, token } = await adminService.loginAdmin(Email, Password);

    // set cookie
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // cookie secure in production
      sameSite: "strict",
      maxAge: 60 * 60 * 1000 // 1h
    });

    res.json({
      message: "Login successful",
      admin: {
        AdminId: admin.AdminId,
        FullName: admin.FullName,
        Email: admin.Email,
        Role: admin.Role
      }
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const adminLogout = async (req, res) => {
  try {
    adminService.logoutAdmin();
    res.clearCookie("admin_token");
    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};