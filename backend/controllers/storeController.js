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



export const getStores = (req, res) => {
  const user_id = req.user.id;
  const { search, sortBy = "name", order = "ASC" } = req.query;

  let sql = `
    SELECT 
      s.id,
      s.name,
      s.address,
      IFNULL(AVG(r.rating), 0) AS overall_rating,
      MAX(CASE WHEN r.user_id = ? THEN r.rating END) AS user_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
  `;

  const params = [user_id];


  if (search) {
    sql += ` WHERE s.name LIKE ? OR s.address LIKE ?`;
    params.push(`%${search}%`, `%${search}%`);
  }

  sql += ` GROUP BY s.id`;

  const allowedSort = ["name", "address", "overall_rating"];
  const allowedOrder = ["ASC", "DESC"];

  if (allowedSort.includes(sortBy) && allowedOrder.includes(order.toUpperCase())) {
    sql += ` ORDER BY ${sortBy} ${order}`;
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

export const getOwnerDashboard = (req, res) => {
  const ownerId = req.user.id;

  const sql = `
    SELECT 
      s.id AS store_id,
      s.name AS store_name,
      u.name AS user_name,
      u.email,
      r.rating
    FROM stores s
    JOIN ratings r ON s.id = r.store_id
    JOIN users u ON r.user_id = u.id
    WHERE s.owner_id = ?
  `;

  db.query(sql, [ownerId], (err, results) => {
    if (err) return res.status(500).json(err);

    const avgSql = `
      SELECT IFNULL(AVG(r.rating),0) AS avgRating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE s.owner_id = ?
    `;

    db.query(avgSql, [ownerId], (err2, avgResult) => {
      if (err2) return res.status(500).json(err2);

      res.json({
        average_rating: avgResult[0].avgRating,
        users: results,
      });
    });
  });
};