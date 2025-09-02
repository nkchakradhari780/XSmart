import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const runInit = async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  const DbName = process.env.DB_NAME;

  // Create DB if not exists
  await db.execute(`CREATE DATABASE IF NOT EXISTS ${DbName}`);

  // Switch to DB
  await db.changeUser({ database: DbName });

  const sqlFolder = path.resolve("sql");
  const orderedFiles = ["products.sql", "categories.sql", "productCategories.sql"];

  for (const file of orderedFiles) {
    const filePath = path.join(sqlFolder, file);
    const sql = fs.readFileSync(filePath, "utf-8");
    await db.query(sql);
    console.log(`✅ Executed ${file}`);
  }

  await db.end();
  console.log("🎉 Database initialized!");
};

runInit().catch(err => {
  console.error("❌ Error initializing DB:", err);
  process.exit(1);
});
