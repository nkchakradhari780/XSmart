import db from "../config/dbConnection.js";

// Create Project
export const createProject = async (projectData) => {
  const {
    ProjectName,
    Description,
    Associates,
    CompletionYear,
    TagIds = [],
    MaterialIds = [],
    Images = [],
  } = projectData;

  try {
    // Insert into Projects
    const [projectResult] = await db.query(
      `INSERT INTO Projects (ProjectName, Description, Associates, CompletionYear)
       VALUES (?, ?, ?, ?)`,
      [ProjectName, Description, Associates, CompletionYear]
    );

    const projectId = projectResult.insertId;

    // Insert Project-Tags
    if (Array.isArray(TagIds) && TagIds.length > 0) {
      const tagValues = TagIds.map((tagId) => [projectId, tagId]);
      await db.query(
        `INSERT INTO ProjectTags (ProjectId, TagId) VALUES ?`,
        [tagValues]
      );
    }

    // Insert Project-Materials
    if (Array.isArray(MaterialIds) && MaterialIds.length > 0) {
      const materialValues = MaterialIds.map((matId) => [projectId, matId]);
      await db.query(
        `INSERT INTO ProjectMaterials (ProjectId, MaterialId) VALUES ?`,
        [materialValues]
      );
    }

    // Insert Project-Images (binary data)
    if (Array.isArray(Images) && Images.length > 0) {
      const validImages = Images.filter((img) => img);
      if (validImages.length > 0) {
        const imageValues = validImages.map((img) => [projectId, img]);
        await db.query(
          `INSERT INTO ProjectImages (ProjectId, Image) VALUES ?`,
          [imageValues]
        );
      }
    }

    return { ProjectId: projectId, ProjectName };
  } catch (err) {
    console.error("Error in createProject service:", err);
    throw err;
  }
};


export const getProjectById = async (projectId) => {
  try {
    // Fetch project details
    const [projects] = await db.query(
      `SELECT * FROM Projects WHERE ProjectId = ?`,
      [projectId]
    );

    if (projects.length === 0) {
      return null;
    }

    const project = projects[0];

    // Fetch tags
    const [tags] = await db.query(
      `SELECT t.TagId, t.TagName
       FROM ProjectTags pt
       JOIN Tags t ON pt.TagId = t.TagId
       WHERE pt.ProjectId = ?`,
      [projectId]
    );

    // Fetch materials
    const [materials] = await db.query(
      `SELECT m.MaterialId, m.MaterialName
       FROM ProjectMaterials pm
       JOIN Materials m ON pm.MaterialId = m.MaterialId
       WHERE pm.ProjectId = ?`,
      [projectId]
    );

    // Fetch images (binary → base64)
    const [images] = await db.query(
      `SELECT Image FROM ProjectImages WHERE ProjectId = ?`,
      [projectId]
    );

    const imageBase64 = images.map((img) =>
      img.Image ? Buffer.from(img.Image).toString("base64") : null
    );

    return {
      ...project,
      Tags: tags,
      Materials: materials,
      Images: imageBase64,
    };
  } catch (err) {
    console.error("Error in getProjectById service:", err);
    throw err;
  }
};


export const getAllProjects = async () => {
  try {
    // Fetch all projects
    const [projects] = await db.query(`SELECT * FROM Projects`);

    // For each project, fetch related tags, materials, and images
    const result = await Promise.all(
      projects.map(async (project) => {
        const projectId = project.ProjectId;

        // Tags
        const [tags] = await db.query(
          `SELECT t.TagId, t.TagName
           FROM ProjectTags pt
           JOIN Tags t ON pt.TagId = t.TagId
           WHERE pt.ProjectId = ?`,
          [projectId]
        );

        // Materials
        const [materials] = await db.query(
          `SELECT m.MaterialId, m.MaterialName
           FROM ProjectMaterials pm
           JOIN Materials m ON pm.MaterialId = m.MaterialId
           WHERE pm.ProjectId = ?`,
          [projectId]
        );

        // Images (binary → base64)
        const [images] = await db.query(
          `SELECT Image FROM ProjectImages WHERE ProjectId = ?`,
          [projectId]
        );

        const imageBase64 = images.map((img) =>
          img.Image ? Buffer.from(img.Image).toString("base64") : null
        );

        return {
          ...project,
          Tags: tags,
          Materials: materials,
          Images: imageBase64,
        };
      })
    );

    return result;
  } catch (err) {
    console.error("Error in getAllProjects service:", err);
    throw err;
  }
};

export const updateProjectById = async (projectId, projectData) => {
  const {
    ProjectName,
    Description,
    Associates,
    CompletionYear,
    TagIds = [],
    MaterialIds = [],
    Images = [],
  } = projectData;

  try {
    // Update main project details
    await db.query(
      `UPDATE Projects
       SET ProjectName = ?, Description = ?, Associates = ?, CompletionYear = ?
       WHERE ProjectId = ?`,
      [ProjectName, Description, Associates, CompletionYear, projectId]
    );

    // --- Update Tags ---
    await db.query(`DELETE FROM ProjectTags WHERE ProjectId = ?`, [projectId]);
    if (Array.isArray(TagIds) && TagIds.length > 0) {
      const tagValues = TagIds.map((tagId) => [projectId, tagId]);
      await db.query(
        `INSERT INTO ProjectTags (ProjectId, TagId) VALUES ?`,
        [tagValues]
      );
    }

    // --- Update Materials ---
    await db.query(`DELETE FROM ProjectMaterials WHERE ProjectId = ?`, [projectId]);
    if (Array.isArray(MaterialIds) && MaterialIds.length > 0) {
      const materialValues = MaterialIds.map((matId) => [projectId, matId]);
      await db.query(
        `INSERT INTO ProjectMaterials (ProjectId, MaterialId) VALUES ?`,
        [materialValues]
      );
    }

    // --- Update Images (binary) ---
    await db.query(`DELETE FROM ProjectImages WHERE ProjectId = ?`, [projectId]);
    if (Array.isArray(Images) && Images.length > 0) {
      const validImages = Images.filter((img) => img);
      if (validImages.length > 0) {
        const imageValues = validImages.map((img) => [projectId, img]);
        await db.query(
          `INSERT INTO ProjectImages (ProjectId, Image) VALUES ?`,
          [imageValues]
        );
      }
    }

    return { ProjectId: projectId, ProjectName };
  } catch (err) {
    console.error("Error in updateProjectById service:", err);
    throw err;
  }
};

export const deleteProjectById = async (projectId) => {
  try {
    // First check if project exists
    const [projects] = await db.query(
      `SELECT * FROM Projects WHERE ProjectId = ?`,
      [projectId]
    );

    if (projects.length === 0) {
      return null; // Not found
    }

    // Delete project (will cascade to related tables if FK is set up)
    await db.query(`DELETE FROM Projects WHERE ProjectId = ?`, [projectId]);

    return { ProjectId: projectId, deleted: true };
  } catch (err) {
    console.error("Error in deleteProjectById service:", err);
    throw err;
  }
};

