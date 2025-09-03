-- Project-Materials (Many-to-Many)
CREATE TABLE IF NOT EXISTS ProjectMaterials (
    ProjectId INT,
    MaterialId INT,
    PRIMARY KEY (ProjectId, MaterialId),
    FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId) ON DELETE CASCADE,
    FOREIGN KEY (MaterialId) REFERENCES Materials(MaterialId) ON DELETE CASCADE
);