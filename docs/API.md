# 📡 API Documentation — Student Information & Academic Record App

## Base URL
```
http://localhost:5000/api
```

## Authentication Header
Protected endpoints require a JSON Web Token (JWT) provided in the HTTP `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Auth API

### 1. Admin Login
- **Endpoint:** `POST /api/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1Ni...",
    "admin": {
      "username": "admin",
      "role": "admin"
    }
  }
  ```

---

## 👨‍🎓 Student Management API

### 1. Get All Students
- **Endpoint:** `GET /api/students`
- **Query Params:** `?search=query` (optional - searches name or registerNumber)
- **Access:** Private (JWT required)
- **Response (200 OK):**
  ```json
  {
    "count": 1,
    "students": [
      {
        "_id": "650000000000000000000001",
        "name": "Priya Sharma",
        "registerNumber": "BCA2024001",
        "department": "BCA",
        "year": 2,
        "email": "priya@example.com",
        "phone": "9876543210",
        "address": "123 Main Street, Chennai",
        "createdAt": "2026-09-27T10:00:00.000Z",
        "updatedAt": "2026-09-27T10:00:00.000Z"
      }
    ]
  }
  ```

### 2. Get Dashboard Statistics
- **Endpoint:** `GET /api/students/stats`
- **Access:** Private (JWT required)
- **Response (200 OK):**
  ```json
  {
    "totalStudents": 15,
    "totalDepartments": 4,
    "departments": ["BCA", "MCA", "BSC", "BE"],
    "recentStudents": [...],
    "departmentCounts": [
      { "_id": "BCA", "count": 6 },
      { "_id": "MCA", "count": 4 }
    ]
  }
  ```

### 3. Get Student by ID
- **Endpoint:** `GET /api/students/:id`
- **Access:** Private (JWT required)

### 4. Add Student
- **Endpoint:** `POST /api/students`
- **Access:** Private (JWT required)
- **Request Body:**
  ```json
  {
    "name": "Arun Kumar",
    "registerNumber": "BCA2024002",
    "department": "BCA",
    "year": 3,
    "email": "arun@example.com",
    "phone": "9876543211",
    "address": "45 College Road, Bangalore"
  }
  ```

### 5. Update Student
- **Endpoint:** `PUT /api/students/:id`
- **Access:** Private (JWT required)

### 6. Delete Student
- **Endpoint:** `DELETE /api/students/:id`
- **Access:** Private (JWT required)

---

## 📚 Academic Record API

### 1. Add Academic Record
- **Endpoint:** `POST /api/students/:studentId/academic-records`
- **Access:** Private (JWT required)
- **Request Body:**
  ```json
  {
    "semester": 4,
    "subject": "Data Structures & Algorithms",
    "marks": 88,
    "grade": "A+",
    "attendancePercentage": 92,
    "academicYear": "2025-2026"
  }
  ```

### 2. Get Academic Records by Student
- **Endpoint:** `GET /api/students/:studentId/academic-records`
- **Access:** Private (JWT required)

### 3. Update Academic Record
- **Endpoint:** `PUT /api/academic-records/:id`
- **Access:** Private (JWT required)

### 4. Delete Academic Record
- **Endpoint:** `DELETE /api/academic-records/:id`
- **Access:** Private (JWT required)
