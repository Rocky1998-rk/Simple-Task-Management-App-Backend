# Simple Task Management App – Backend

This is the backend of a Simple Task Management Application built using **Node.js, Express.js, and MongoDB**.  
It provides APIs for user authentication and task management.

---

## 🚀 Features

- User Signup & Login (JWT Authentication)
- Create, Read, Update & Delete Tasks
- Mark tasks as completed
- Protected routes using middleware
- MongoDB database integration

---

## 🛠 Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT (JSON Web Token)  
- bcryptjs  
- dotenv  

---

## 📂 Project Structure

Simple-Task-Management-App
│
├── client/                     # Frontend (React App)
│
├── server/                     # Backend (Node + Express)
│   │
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── authController.js    # Signup & Login logic
│   │   └── taskController.js    # Task CRUD operations
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js    # JWT authentication middleware
│   │
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Task.js              # Task schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes
│   │   └── taskRoutes.js        # Task routes
│   │
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js                # Main backend entry file
│
└── README.md
