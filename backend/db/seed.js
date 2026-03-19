import bcrypt from "bcrypt";
import db from "../config/db.js";

const mockUsers = [
  { name: "Alice Johnson", email: "alice@example.com", password: "Password@123", address: "123 Main St", role: "USER" },
  { name: "Bob Smith", email: "bob@example.com", password: "Password@123", address: "456 Oak Ave", role: "USER" },
  { name: "Charlie Brown", email: "charlie@example.com", password: "Password@123", address: "789 Pine Rd", role: "USER" },
  { name: "Diana Prince", email: "diana@example.com", password: "Password@123", address: "321 Elm St", role: "OWNER" },
  { name: "Eve Williams", email: "eve@example.com", password: "Password@123", address: "654 Maple Dr", role: "OWNER" },
  { name: "Frank Miller", email: "frank@example.com", password: "Password@123", address: "987 Cedar Ln", role: "ADMIN" },
];

const mockStores = [
  { name: "Fresh Market", email: "market@example.com", address: "100 Market St", owner_id: 4 },
  { name: "Corner Shop", email: "corner@example.com", address: "200 Corner Ave", owner_id: 5 },
  { name: "Mega Store", email: "mega@example.com", address: "300 Mega Blvd", owner_id: 4 },
  { name: "Quick Stop", email: "quickstop@example.com", address: "400 Quick Lane", owner_id: 5 },
];

const mockRatings = [
  { user_id: 1, store_id: 1, rating: 5 },
  { user_id: 1, store_id: 2, rating: 4 },
  { user_id: 2, store_id: 1, rating: 4 },
  { user_id: 2, store_id: 3, rating: 5 },
  { user_id: 3, store_id: 2, rating: 3 },
  { user_id: 3, store_id: 4, rating: 4 },
  { user_id: 1, store_id: 3, rating: 4 },
  { user_id: 2, store_id: 4, rating: 5 },
];

function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

async function seedDatabase() {
  try {
    console.log("Starting database seed...");

    await runQuery("DELETE FROM ratings");
    await runQuery("DELETE FROM stores");
    await runQuery("DELETE FROM users");

    await runQuery("ALTER TABLE users AUTO_INCREMENT = 1");
    await runQuery("ALTER TABLE stores AUTO_INCREMENT = 1");
    await runQuery("ALTER TABLE ratings AUTO_INCREMENT = 1");

    for (const user of mockUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await runQuery(
        "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
        [user.name, user.email, hashedPassword, user.address, user.role]
      );
    }

    for (const store of mockStores) {
      await runQuery(
        "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
        [store.name, store.email, store.address, store.owner_id]
      );
    }

    for (const rating of mockRatings) {
      await runQuery(
        "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
        [rating.user_id, rating.store_id, rating.rating]
      );
    }

    console.log("Seed complete. Users, stores, and ratings reset.");
    db.end(() => process.exit(0));
  } catch (error) {
    console.error("Seed failed:", error.message);
    db.end(() => process.exit(1));
  }
}

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }

  seedDatabase();
});
