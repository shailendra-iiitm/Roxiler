// src/controllers/adminController.js
import db from "../config/db.js";
import bcrypt from "bcrypt";

export const createUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    // only allow valid roles
    if (!["ADMIN", "USER", "OWNER"].includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (name, email, password, address, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [name, email.toLowerCase(), hashed, address, role],
      (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: `${role} created successfully` });
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getDashboardStats = (req, res) => {
  const stats = {};

  const usersSql = `SELECT COUNT(*) AS totalUsers FROM users`;
  const storesSql = `SELECT COUNT(*) AS totalStores FROM stores`;
  const ratingsSql = `SELECT COUNT(*) AS totalRatings FROM ratings`;

  db.query(usersSql, (err, usersResult) => {
    if (err) return res.status(500).json(err);

    stats.totalUsers = usersResult[0].totalUsers;

    db.query(storesSql, (err2, storesResult) => {
      if (err2) return res.status(500).json(err2);

      stats.totalStores = storesResult[0].totalStores;

      db.query(ratingsSql, (err3, ratingsResult) => {
        if (err3) return res.status(500).json(err3);

        stats.totalRatings = ratingsResult[0].totalRatings;

        res.json(stats);
      });
    });
  });
};

export const getAllUsers = (req, res) => {
  const { name, email, address, role, sortBy = "name", order = "ASC" } = req.query;

  let sql = `SELECT id, name, email, address, role FROM users WHERE 1=1`;
  const params = [];

  if (name) {
    sql += ` AND name LIKE ?`;
    params.push(`%${name}%`);
  }

  if (email) {
    sql += ` AND email LIKE ?`;
    params.push(`%${email}%`);
  }

  if (address) {
    sql += ` AND address LIKE ?`;
    params.push(`%${address}%`);
  }

  if (role) {
    sql += ` AND role = ?`;
    params.push(role);
  }

  const allowedSort = ["name", "email", "address", "role"];
  const allowedOrder = ["ASC", "DESC"];

  if (allowedSort.includes(sortBy) && allowedOrder.includes(order.toUpperCase())) {
    sql += ` ORDER BY ${sortBy} ${order}`;
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

export const getAllStores = (req, res) => {
  const { name, email, address, sortBy = "name", order = "ASC" } = req.query;

  let sql = `
    SELECT 
      s.id,
      s.name,
      s.email,
      s.address,
      IFNULL(AVG(r.rating), 0) AS rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE 1=1
  `;

  const params = [];

  if (name) {
    sql += ` AND s.name LIKE ?`;
    params.push(`%${name}%`);
  }

  if (email) {
    sql += ` AND s.email LIKE ?`;
    params.push(`%${email}%`);
  }

  if (address) {
    sql += ` AND s.address LIKE ?`;
    params.push(`%${address}%`);
  }

  sql += ` GROUP BY s.id`;

  const allowedSort = ["name", "email", "address", "rating"];
  const allowedOrder = ["ASC", "DESC"];

  if (allowedSort.includes(sortBy) && allowedOrder.includes(order.toUpperCase())) {
    sql += ` ORDER BY ${sortBy} ${order}`;
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};