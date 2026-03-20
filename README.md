# Roxiler Store Rating Portal

Role-based full stack web app to manage stores and ratings.

## Live Links
- Frontend: https://roxiler-eta.vercel.app/
- Backend API Base: https://roxiler-gymf.onrender.com/api

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MySQL
- Authentication: JWT + role-based authorization

## Features

### Authentication
- Register user
- Login user
- Update password

### Admin
- View dashboard stats (users, stores, ratings)
- Create users with roles (ADMIN, USER, OWNER)
- Create stores
- View/filter/sort users
- View/filter/sort stores

### User
- View all stores
- Search stores by name/address
- Sort stores
- Submit rating
- Update own rating

### Store Owner
- View average rating for owned stores
- View users and ratings for owned stores

## Test Credentials
- Password for seeded users: Password@123
- Admin: frank@example.com
- Owners: diana@example.com, eve@example.com
- Users: alice@example.com, bob@example.com, charlie@example.com

## Project Structure
- Backend: backend
- Frontend: frontend

## Local Setup

### Backend
1. cd backend
2. npm install
3. Create .env using backend/.env.example
4. node server.js

### Frontend
1. cd frontend
2. npm install
3. Create .env using frontend/.env.example
4. npm run dev

## Environment Variables

### Backend
Use either:
- DATABASE_URL=mysql://user:password@host:port/database

Or split variables:
- db_host
- db_port
- db_user
- db_password
- db_database

Production:
- JWT_SECRET
- CORS_ORIGIN
- PORT

### Frontend
- VITE_API_URL=https://roxiler-gymf.onrender.com/api

## Seed Mock Data

Use this when setting up the project on a fresh database.

1. Create an empty MySQL database.
2. Run schema from backend/db/schema.sql.
3. Configure backend DB connection in backend/.env using either DATABASE_URL or db_host, db_port, db_user, db_password, db_database.
4. From backend folder, run:
	node db/seed.js



## API Summary
All APIs are under /api.

- Auth: /api/auth/register, /api/auth/login, /api/auth/update-password
- Admin: /api/admin/dashboard, /api/admin/users, /api/admin/stores
- Stores: /api/stores, /api/stores/owner-dashboard
- Ratings: /api/ratings

## Deployment
- Backend: Render (root directory: backend)
- Frontend: Vercel (root directory: frontend)
- Database: Railway MySQL

