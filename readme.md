# SpendFlow — Expense Management System

A full-stack expense management application built with React, Node.js/Express, and MongoDB.

## Features

- User registration and login with JWT authentication
- Secure httpOnly cookie sessions with bcrypt password hashing
- Add, edit, and delete expenses with category and date
- Filter expenses by category and month
- Spending breakdown charts by category
- Per-user data isolation — users only see their own expenses

## Tech Stack

**Frontend:** React (Vite), React Router v6, Recharts

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## Setup

### Backend

```bash
cd api
npm install
```

Create a `.env` file inside the `api/` folder:

```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
```

Then start the server:

```bash
node index.js
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`  
Backend runs on `http://localhost:4000`

## Project Structure

```
expense/
├── api/
│   ├── middleware/        # Auth middleware
│   ├── models/            # User and Expense schemas
│   ├── routes/            # Auth and expense routes
│   └── index.js           # Express server entry point
└── client/
    └── src/
        ├── components/    # Charts, ExpenseForm, ExpenseList, Navbar
        ├── context/       # AuthContext
        └── pages/         # Dashboard, Login, Register
```