# Finance Tracker Backend

This is the backend for the Finance Tracker application built with Node.js and Express. It handles authentication, transaction management, budget tracking, and report generation.

## Setup
1. Install dependencies: `npm install`
2. Create a `.env` file with the following variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secret key for JWT
   - `PORT`: Port number (default: 5000)
3. Run the server: `npm start` or `npm run dev` for development with nodemon

## API Endpoints
- `/api/auth/signup`: Register a new user
- `/api/auth/login`: Login a user
- `/api/auth/logout`: Logout a user (client-side token removal)
- `/api/dashboard/overview`: Get dashboard overview
- `/api/transactions`: CRUD operations for transactions
- `/api/budgets`: CRUD operations for budgets
- `/api/reports`: Get financial reports

## Dependencies
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors