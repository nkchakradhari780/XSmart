-- Project Images (Stores multiple images per project)
CREATE TABLE IF NOT EXISTS ProjectImages (
    ImageId INT AUTO_INCREMENT PRIMARY KEY,
    ProjectId INT NOT NULL,
    Image LONGBLOB NOT NULL,  -- or store image URL as VARCHAR if preferred
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId) ON DELETE CASCADE
);