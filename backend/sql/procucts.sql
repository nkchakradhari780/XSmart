CREATE TABLE IF NOT EXISTS Products (
    ProductId INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    Description TEXT,
    Image LONGBLOB, -- store actual image bytes
    PartnerStatus VARCHAR(100),
    IsFeatured BOOLEAN DEFAULT 0,
    DetailsLink VARCHAR(500)
);