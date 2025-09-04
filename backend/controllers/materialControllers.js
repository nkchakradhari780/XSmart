import * as materialService from "../services/materialsServices.js";

// Create
export const createMaterial = async (req, res) => {
  try {
    const { MaterialName } = req.body;

    if (!MaterialName) {
      return res.status(400).json({ error: "MaterialName is required" });
    }

    const material = await materialService.createMaterial(MaterialName);
    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read All
export const getAllMaterials = async (req, res) => {
  try {
    const materials = await materialService.getAllMaterials();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read One
export const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await materialService.getMaterialById(id);
    res.json(material);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Update
export const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { MaterialName } = req.body;
    if (!MaterialName) {
      return res.status(400).json({ error: "MaterialName is required" });
    }

    const material = await materialService.updateMaterial(id, MaterialName);
    res.json(material);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Delete
export const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await materialService.deleteMaterial(id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
