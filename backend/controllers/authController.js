// src/controllers/authController.js
import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        let { name, email, password, address } = req.body;

        email = email.toLowerCase();

        if (name.length < 10 || name.length > 60) {
            return res.status(400).json({ msg: "Name must be 20-60 characters" });
        }

        if (address.length > 400) {
            return res.status(400).json({ msg: "Address too long" });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                msg: "Password must be 8-16 chars with uppercase & special char",
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        const sql = `
      INSERT INTO users (name, email, password, address)
      VALUES (?, ?, ?, ?)
    `;

        db.query(sql, [name, email, hashed, address], (err, result) => {
            if (err) {
                console.error("Register DB error:", err);
                return res.status(500).json({ msg: "Server error" });
            }

            res.json({ message: "User registered successfully" });
        });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

export const login = (req, res) => {
    let { email, password } = req.body;

    email = email.toLowerCase();

    const sql = `SELECT * FROM users WHERE email = ?`;

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error("Login DB error:", err);
            return res.status(500).json({ msg: "Server error" });
        }

        if (results.length === 0)
            return res.status(400).json({ msg: "Invalid email or password" });

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return res.status(400).json({ msg: "Invalid email or password" });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET
        );

        res.json({ token, role: user.role });
    });
};

export const updatePassword = async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const sql = `SELECT password FROM users WHERE id = ?`;

    db.query(sql, [userId], async (err, result) => {
        if (err) {
            console.error("Update password DB error:", err);
            return res.status(500).json({ msg: "Server error" });
        }

        if (!result || result.length === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

        const user = result[0];

        const match = await bcrypt.compare(oldPassword, user.password);

        if (!match)
            return res.status(400).json({ msg: "Old password incorrect" });

        const hashed = await bcrypt.hash(newPassword, 10);

        db.query(
            `UPDATE users SET password = ? WHERE id = ?`,
            [hashed, userId],
            (err2) => {
                if (err2) {
                    console.error("Password update DB error:", err2);
                    return res.status(500).json({ msg: "Server error" });
                }

                res.json({ message: "Password updated successfully" });
            }
        );
    });
};