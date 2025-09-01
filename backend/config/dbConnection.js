import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
dotenv.config()

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
});


const DbName = process.env.DB_NAME;

//Creating Database
await db.execute(`CREATE DATABASE IF NOT EXISTS ${DbName}`)

// Switch to the DB
await db.changeUser({database: DbName})


const sqlFolder = path.resolve("sql");

const orderedFiles = [
  "procucts.sql",
  "categories.sql",
  "productCategories.sql"
];

const runAllSqlFilesInOrder = async () => {
  try{
    for (const file of orderedFiles) {
      const filePath = path.join(sqlFolder, file)
      const sql = fs.readFileSync(filePath, "utf-8");

      console.log(`Running ${file}`)
      await db.query(sql);
      console.log(`${file} executed successfully`)
    }

    process.exit()
  }
  catch(err) {
    console.log(`Error Running SQL: ${err.message}`)
    process.exit(1);
  }
}

runAllSqlFilesInOrder()

//show tables
// console.log(await db.execute("show tables"))

export default db;
