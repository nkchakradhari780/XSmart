
-- Project-Tags (Many-to-Many)
CREATE TABLE IF NOT EXISTS ProjectTags (
    ProjectId INT,
    TagId INT,
    PRIMARY KEY (ProjectId, TagId),
    FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId) ON DELETE CASCADE,
    FOREIGN KEY (TagId) REFERENCES Tags(TagId) ON DELETE CASCADE
);