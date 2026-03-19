CREATE DATABASE store_rating_app;
USE store_rating_app;

-- USERS
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  address VARCHAR(400),
  role ENUM('ADMIN','USER','OWNER') DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- STORES
CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60),
  email VARCHAR(100),
  address VARCHAR(400),
  owner_id INT,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- RATINGS
CREATE TABLE ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  store_id INT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, store_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
);