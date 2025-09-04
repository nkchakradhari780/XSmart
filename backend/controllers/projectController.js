import * as projectService from "../services/projectServices.js";

export const createProject = async (req, res) => {
  try {
    const {
      ProjectName,
      Description,
      Associates,
      CompletionYear,
      TagIds,
      MaterialIds,
    } = req.body;

    // Parse arrays (from string in form-data)
    const parsedTagIds = TagIds ? JSON.parse(TagIds) : [];
    const parsedMaterialIds = MaterialIds ? JSON.parse(MaterialIds) : [];

    // Handle uploaded images (binary)
    let Images = [];
    if (req.files && req.files.length > 0) {
      Images = req.files.map((file) => file.buffer); // store as Buffer
    }

    if (!ProjectName) {
      return res.status(400).json({ error: "ProjectName is required" });
    }

    const project = await projectService.createProject({
      ProjectName,
      Description,
      Associates,
      CompletionYear,
      TagIds: parsedTagIds,
      MaterialIds: parsedMaterialIds,
      Images,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    console.error("Error in createProject controller:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const project = await projectService.getProjectById(id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      message: "Project fetched successfully",
      result: project,
    });
  } catch (err) {
    console.error("Error in getProjectById controller:", err);
    res.status(500).json({ error: err.message });
  }
};


export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();

    res.status(200).json({
      message: "Projects fetched successfully",
      result: projects,
    });
  } catch (err) {
    console.error("Error in getAllProjects controller:", err);
    res.status(500).json({ error: err.message });
  }
};


export const updateProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      ProjectName,
      Description,
      Associates,
      CompletionYear,
      TagIds,
      MaterialIds,
    } = req.body;

    // Parse arrays
    const parsedTagIds = TagIds ? JSON.parse(TagIds) : [];
    const parsedMaterialIds = MaterialIds ? JSON.parse(MaterialIds) : [];

    // Handle uploaded images (binary)
    let Images = [];
    if (req.files && req.files.length > 0) {
      Images = req.files.map((file) => file.buffer);
    }

    if (!ProjectName) {
      return res.status(400).json({ error: "ProjectName is required" });
    }

    const project = await projectService.updateProjectById(id, {
      ProjectName,
      Description,
      Associates,
      CompletionYear,
      TagIds: parsedTagIds,
      MaterialIds: parsedMaterialIds,
      Images,
    });

    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (err) {
    console.error("Error in updateProjectById controller:", err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const result = await projectService.deleteProjectById(id);

    if (!result) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      result,
    });
  } catch (err) {
    console.error("Error in deleteProjectById controller:", err);
    res.status(500).json({ error: err.message });
  }
};


export const getLatestProjects = async (req, res) => {
  try {
    const projects = await projectService.getLatestProjects();

    res.status(200).json({
      message: "Latest 3 projects fetched successfully",
      result: projects,
    });
  } catch (err) {
    console.error("Error in getLatestProjects controller:", err);
    res.status(500).json({ error: err.message });
  }
};

