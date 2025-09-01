import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
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


//show tables
// console.log(await db.execute("show tables"))

export default db;
