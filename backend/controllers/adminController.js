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