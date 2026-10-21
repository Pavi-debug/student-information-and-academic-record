# 🏗️ Architecture Design — Student Information & Academic Record App

## Overview
This document describes the architectural flow and system design of the application.

## High Level Architecture
```text
[ Browser / User Interface ]
            │
            ▼ (HTTP / JSON)
[ React 18 + Vite Frontend ]
            │
            ▼ (Axios Client + JWT Interceptor)
[ Express REST API Backend ]
            │
            ├── Auth Routes & Middleware (JWT Authorization)
            ├── Student Controller & Service Layer
            └── Academic Record Controller & Service Layer
            │
            ▼ (Mongoose ODM)
[ MongoDB Database ]
```

## Communication Sequence Flow
```text
User Action ──► React Page Component ──► Service API Client ──► HTTP Request (Bearer JWT)
                                                                      │
                                                                      ▼
User UI Update ◄── React State Update ◄── JSON Data Response ◄── Express Route / Controller ◄── Mongoose ODM ◄── MongoDB
```

## Data Models
1. **Student**: Stores student bio, register number, department, year, email, phone, address.
2. **AcademicRecord**: Stores marks, grade, attendance percentage, semester, and subject linked to a student.
