# 🎓 EduManage — Student Information & Academic Record System

A full-stack MERN web application for managing student profiles and academic performance records, built with a modern React 18 + Vite frontend and Node.js + Express + Mongoose backend.

---

## 📋 Project Overview

EduManage provides a full administration platform for college administrators:
- **Admin Authentication:** Secure JWT-based admin login
- **Student Information Management:** Complete CRUD (Add, View, Edit, Delete) for student profiles
- **Academic Record Tracking:** Manage student marks, grades, semesters, and attendance percentages
- **Search & Filter:** Instant search by student name or register number
- **Analytics Dashboard:** Department breakdown charts, recent registrations, and stat counters

---

## 🛠️ Technology Stack

### Frontend
- **React.js 18** — Component-driven UI library
- **Vite** — Build tool and dev server
- **React Router DOM v6** — Client-side navigation & route protection
- **Axios** — HTTP client with request/response interceptors
- **Phosphor Icons** — Icon system

### Backend
- **Node.js** — Server runtime (`"type": "module"`)
- **Express.js** — Web application framework
- **Mongoose** — MongoDB object modeling (ODM)
- **JWT (jsonwebtoken)** — Stateless authentication
- **bcryptjs** — Password hashing
- **CORS & dotenv** — Cross-origin security and environment configuration

### Database
- **MongoDB** — NoSQL database storage

---

## 📁 Project Structure

```text
student-information-and-academic-record-app/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration (db.js)
│   │   ├── controllers/     # Business logic (auth, student, academic)
│   │   ├── middleware/      # Auth & global error middleware
│   │   ├── models/          # Mongoose Schemas (Student, AcademicRecord)
│   │   ├── routes/          # Express route handlers
│   │   └── app.js           # Express app setup
│   ├── .env                 # Local environment variables
│   ├── .env.example         # Environment template
│   ├── package.json         # Backend scripts & dependencies
│   └── server.js            # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── css/             # Modularized design system
│   │   │   ├── variables.css
│   │   │   ├── base.css
│   │   │   ├── layout.css
│   │   │   ├── components.css
│   │   │   ├── pages.css
│   │   │   └── main.css
│   │   ├── pages/           # Application screens
│   │   ├── services/        # API client modules
│   │   ├── App.jsx          # Router & route guards
│   │   ├── main.jsx         # React root entry
│   │   └── index.css        # CSS entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── API.md               # API documentation
│   └── ARCHITECTURE.md      # System architecture specification
│
├── .env.example             # Global environment template
├── .gitignore               # Git ignore rules
├── package.json             # Root workspace runner
└── README.md                # Project documentation
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB (local service or MongoDB Atlas)

### Step 1: Install Dependencies
From the project root:
```bash
npm run install:all
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/student_management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CLIENT_URL=http://localhost:5173
```

---

## ▶️ Running the Application

### Option A: Run Both Backend & Frontend Concurrently (Recommended)
From the root directory:
```bash
npm run dev
```

### Option B: Run Services Individually
```bash
# Terminal 1 — Backend
npm run dev:backend

# Terminal 2 — Frontend
npm run dev:frontend
```

Access the web interface at **http://localhost:5173**.

---

## 📄 License

This project is for educational and administrative purposes.
