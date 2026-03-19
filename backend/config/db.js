// src/config/db.js
import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const databaseUrl = process.env.DATABASE_URL;

let dbConfig;

if (databaseUrl) {
  const parsed = new URL(databaseUrl);

  dbConfig = {
    host: parsed.hostname,
    port: Number(parsed.port || 3306),
    user: decodeURIComponent(parsed.username || ""),
    password: decodeURIComponent(parsed.password || ""),
    database: parsed.pathname.replace(/^\//, ""),
  };
} else {
  dbConfig = {
    host: process.env.db_host || process.env.DB_HOST,
    port: Number(process.env.db_port || process.env.DB_PORT || 3306),
    user: process.env.db_user || process.env.DB_USER,
    password: process.env.db_password || process.env.DB_PASSWORD,
    database: process.env.db_database || process.env.DB_DATABASE,
  };
}

const db = mysql.createConnection(dbConfig);

export default db;