import db from "../config/db.js";

export const addOrUpdateRating = (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.id;

  // check if already rated
  const checkSql = `
    SELECT * FROM ratings WHERE user_id = ? AND store_id = ?
  `;

  db.query(checkSql, [user_id, store_id], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length > 0) {
      // update
      const updateSql = `
        UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?
      `;

      db.query(updateSql, [rating, user_id, store_id], (err2) => {
        if (err2) return res.status(500).json(err2);

        return res.json({ message: "Rating updated" });
      });
    } else {
      // insert
      const insertSql = `
        INSERT INTO ratings (user_id, store_id, rating)
        VALUES (?, ?, ?)
      `;

      db.query(insertSql, [user_id, store_id, rating], (err3) => {
        if (err3) return res.status(500).json(err3);

        return res.json({ message: "Rating added" });
      });
    }
  });
};