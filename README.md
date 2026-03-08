# 🚕 UCab — Cab Booking Web Application

A full-stack cab booking system built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). UCab lets users book rides, track drivers, and make secure payments through an interactive interface with role-based access control.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Step-by-Step Setup Guide](#step-by-step-setup-guide)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Roles & Access](#roles--access)
- [Database Schema](#database-schema)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### User Features
- Register / Login with JWT authentication
- Browse available cabs filtered by type (Mini, Sedan, SUV, Luxury, XL)
- Book a cab with pickup, destination, date, and payment method
- View estimated fare before confirming
- View and cancel bookings in real-time
- Secure password hashing with bcryptjs

### Admin Features
- Separate admin login portal
- Dashboard with live statistics (total bookings, revenue, status breakdown)
- Add, edit, and delete cabs with image upload
- Manage all users (view, edit, activate/deactivate, delete)
- View and update booking statuses
- Full CRUD operations on fleet

---

## 🛠 Tech Stack

| Layer      | Technology               |
|------------|--------------------------|
| Frontend   | React.js (Vite), Bootstrap 5, Bootstrap Icons |
| Backend    | Node.js, Express.js      |
| Database   | MongoDB with Mongoose ODM |
| Auth       | JWT (JSON Web Tokens), bcryptjs |
| File Upload| Multer                   |
| HTTP Client| Axios                    |
| Routing    | React Router v6          |

---

## 📁 Project Structure

```
ucab/
├── client/                     # React frontend
│   ├── src/
│   │   ├── api.js              # Axios instance with auth interceptors
│   │   ├── App.jsx             # Routes and protected routes
│   │   ├── main.jsx            # Entry point
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global auth state (user & admin)
│   │   ├── components/
│   │   │   ├── Unav.jsx        # User navigation bar
│   │   │   └── Anav.jsx        # Admin navigation bar
│   │   └── pages/
│   │       ├── Home.jsx        # Public landing page
│   │       ├── user/
│   │       │   ├── Login.jsx
│   │       │   ├── Register.jsx
│   │       │   ├── Uhome.jsx       # User dashboard
│   │       │   ├── Cabs.jsx        # Browse & filter cabs
│   │       │   ├── BookCab.jsx     # Booking form with fare estimate
│   │       │   └── Mybookings.jsx  # View & cancel bookings
│   │       └── admin/
│   │           ├── Alogin.jsx
│   │           ├── Aregister.jsx
│   │           ├── Ahome.jsx       # Admin dashboard with stats
│   │           ├── Users.jsx       # Manage all users
│   │           ├── UserEdit.jsx    # Edit user details
│   │           ├── Bookings.jsx    # Manage all bookings
│   │           ├── Acabs.jsx       # Manage fleet
│   │           ├── Acabedit.jsx    # Edit cab details
│   │           └── Addcar.jsx      # Add new cab
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/                     # Node.js backend
    ├── server.js               # Entry point, middleware, routes
    ├── db/
    │   └── config.js           # MongoDB connection
    ├── models/
    │   ├── AdminSchema.js
    │   ├── UserSchema.js
    │   ├── CarSchema.js
    │   └── MyBookingSchema.js
    ├── controllers/
    │   ├── adminController.js
    │   ├── userController.js
    │   ├── carController.js
    │   └── bookingController.js
    ├── routes/
    │   ├── adminRoutes.js
    │   ├── userRoutes.js
    │   ├── carRoutes.js
    │   └── bookingRoutes.js
    ├── middlewares/
    │   ├── authMiddleware.js   # JWT verification (user & admin)
    │   └── multer.js           # File upload config
    ├── uploads/                # Uploaded car images stored here
    ├── .env.example
    └── package.json
```

---

## ✅ Prerequisites

Make sure you have the following installed on your system:

| Tool        | Version  | Download |
|-------------|----------|----------|
| Node.js     | v16+     | https://nodejs.org |
| npm         | v8+      | (comes with Node.js) |
| MongoDB     | v6+      | https://www.mongodb.com/try/download/community |
| Git         | latest   | https://git-scm.com |

Optional but recommended:
- **VS Code** — Code editor
- **Postman** — API testing
- **MongoDB Compass** — Visual DB explorer

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Download / Clone the Project

```bash
# If using git:
git clone <your-repo-url>
cd ucab

# Or extract the ZIP and open a terminal in the ucab/ folder
```

### Step 2: Start MongoDB

Make sure MongoDB is running on your machine.

**On macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**On Windows:**
- Open Services → Find "MongoDB" → Start
- OR run: `mongod` in a terminal

**On Linux:**
```bash
sudo systemctl start mongod
```

You can verify it's running by opening MongoDB Compass and connecting to `mongodb://localhost:27017`.

---

### Step 3: Set Up the Backend (Server)

Open a terminal and navigate to the server folder:

```bash
cd ucab/server
```

Install all dependencies:

```bash
npm install
```

Create the environment file. Copy the example and fill in your values:

```bash
cp .env.example .env
```

Open the `.env` file and set your values:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/ucab
JWT_SECRET=ucab_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Important:** Change `JWT_SECRET` to a long random string in production.

Start the backend server:

```bash
# For development (auto-restarts on save):
npm run dev

# For production:
npm start
```

✅ You should see:
```
🚕 UCab Server running on http://localhost:8000
✅ MongoDB Connected: localhost
```

---

### Step 4: Set Up the Frontend (Client)

Open a **new terminal** (keep the server terminal running) and navigate to the client folder:

```bash
cd ucab/client
```

Install all dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

✅ You should see:
```
VITE v5.x.x  ready in X ms
➜  Local:   http://localhost:5173/
```

---

### Step 5: Open the Application

Open your browser and go to:

```
http://localhost:5173
```

You will see the UCab landing page.

---

### Step 6: Create Your First Admin Account

1. Go to `http://localhost:5173/admin/register`
2. Register with your admin credentials
3. You'll be logged in and redirected to the admin dashboard

---

### Step 7: Add Cabs to the Fleet

1. In the admin dashboard, click **"Add Cab"**
2. Fill in cab details (name, model, plate number, seats, price per km, etc.)
3. Optionally upload a cab photo
4. Click **"Add Cab"** to save

---

### Step 8: Test as a User

1. Go to `http://localhost:5173/register`
2. Create a user account
3. Browse cabs at `/cabs`
4. Book a ride and check your bookings at `/mybookings`

---

## 🌍 Environment Variables

| Variable     | Description                          | Example |
|--------------|--------------------------------------|---------|
| `PORT`       | Port for Express server              | `8000` |
| `MONGO_URI`  | MongoDB connection string            | `mongodb://localhost:27017/ucab` |
| `JWT_SECRET` | Secret key for signing JWT tokens    | `my_secret_key_abc123` |
| `CLIENT_URL` | Allowed origin for CORS              | `http://localhost:5173` |

---

## 📡 API Documentation

Base URL: `http://localhost:8000/api`

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check if API is running |

### User Routes (`/api/users`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | None | Register new user |
| POST | `/login` | None | User login |
| GET | `/profile` | User | Get user profile |
| PUT | `/profile` | User | Update user profile |

### Admin Routes (`/api/admin`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | None | Register admin |
| POST | `/login` | None | Admin login |
| GET | `/users` | Admin | Get all users |
| GET | `/users/:id` | Admin | Get single user |
| PUT | `/users/:id` | Admin | Update user |
| DELETE | `/users/:id` | Admin | Delete user |

### Car Routes (`/api/cars`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | None | Get all cars (filter: `?cabType=SUV&isAvailable=true`) |
| GET | `/:id` | None | Get single car |
| POST | `/` | Admin | Add new car |
| PUT | `/:id` | Admin | Update car |
| DELETE | `/:id` | Admin | Delete car |

### Booking Routes (`/api/bookings`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/stats` | Admin | Get booking stats for dashboard |
| GET | `/my` | User | Get current user's bookings |
| GET | `/` | Admin | Get all bookings |
| GET | `/:id` | User | Get single booking |
| POST | `/` | User | Create new booking |
| PUT | `/:id` | Admin | Update booking status |
| PUT | `/:id/cancel` | User | Cancel a booking |

### Authentication

For protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

---

## 👥 Roles & Access

| Feature | User | Admin |
|---------|------|-------|
| Browse cabs | ✅ | ✅ |
| Book a ride | ✅ | ❌ |
| View own bookings | ✅ | ❌ |
| Cancel own booking | ✅ | ❌ |
| View all users | ❌ | ✅ |
| Manage cabs (CRUD) | ❌ | ✅ |
| View all bookings | ❌ | ✅ |
| Update booking status | ❌ | ✅ |
| Dashboard stats | ❌ | ✅ |

---

## 🗄 Database Schema

### User
```
name, email, password (hashed), phone, profileImage, role, isActive, timestamps
```

### Admin
```
name, email, password (hashed), role, timestamps
```

### Car
```
name, model, plateNumber, seats, cabType, pricePerKm, image, isAvailable,
driverName, driverPhone, rating, timestamps
```

### Booking
```
user (ref), car (ref), pickup, destination, bookingDate,
estimatedDistance, estimatedFare, status, paymentStatus, paymentMethod, notes, timestamps
```

**Booking Status Flow:** `Pending → Confirmed → In Progress → Completed`
(Admin can also set it to `Cancelled`)

---

## 🔧 Troubleshooting

**MongoDB connection fails:**
- Make sure MongoDB service is running (`mongod` or system service)
- Check the `MONGO_URI` in your `.env` file
- Try connecting with MongoDB Compass to verify

**Port already in use:**
- Change `PORT=8000` to another port (e.g., `8001`) in `.env`
- Or kill the process: `lsof -i :8000` then `kill -9 <PID>`

**CORS errors:**
- Make sure `CLIENT_URL=http://localhost:5173` in server `.env` matches your React port

**npm install fails:**
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Ensure Node.js version is v16+: `node --version`

**Images not displaying:**
- Check that the `/uploads` folder exists inside `server/`
- The Vite proxy in `vite.config.js` forwards `/uploads` requests to the backend

---

## 📦 Build for Production

### Backend
The server is production-ready. Deploy to any Node.js host (Railway, Render, Heroku, VPS).

### Frontend
```bash
cd client
npm run build
# Output goes to client/dist/ — deploy to Vercel, Netlify, or serve statically
```

---

## 🧑‍💻 Development Tips

- Use **Postman** to test API endpoints before building frontend
- Use **MongoDB Compass** to visually inspect your data
- Backend uses `nodemon` for auto-restart during development
- Vite hot-reloads React on every save — no need to refresh manually
- JWT tokens expire in 7 days — users/admins must log in again after that

---

*Built with ❤️ using the MERN Stack*
