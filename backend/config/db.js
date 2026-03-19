// src/config/db.js
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const db = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

export default db;