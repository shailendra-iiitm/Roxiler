// src/controllers/storeController.js
import db from "../config/db.js";

export const createStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  const sql = `
    INSERT INTO stores (name, email, address, owner_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, address, owner_id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Store created successfully" });
  });
};