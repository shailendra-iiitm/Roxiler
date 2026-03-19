// src/config/db.js
import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const db = mysql.createConnection({
  host: process.env.db_host,
  port: Number(process.env.db_port || 3306),
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
});

export default db;