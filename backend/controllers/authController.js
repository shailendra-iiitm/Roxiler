// src/controllers/authController.js
import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    let { name, email, password, address } = req.body;

    email = email.toLowerCase();

    const hashed = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (name, email, password, address)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, hashed, address], (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "User registered successfully" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = (req, res) => {
  let { email, password } = req.body;

  email = email.toLowerCase();

  const sql = `SELECT * FROM users WHERE email = ?`;

  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0)
      return res.status(400).json({ msg: "User not found" });

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "SECRET_KEY"
    );

    res.json({ token, role: user.role });
  });
};