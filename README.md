#  Blog Site — MERN Stack

A full-stack blogging application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

The project is being developed to provide a simple and structured blogging platform where users can register, log in, manage their profiles, and create, read, update, and delete blog posts.

---

##  Project Overview

The Blog Site is a web application designed around two main areas:

- User authentication and profile management
- Blog post management using CRUD operations

The backend follows a modular architecture using controllers, routes, models, middleware, and database configuration.

The project is being developed step-by-step as part of my backend and MERN stack learning journey.

---

##  Tech Stack

### Frontend
- React.js
- JavaScript
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs

### Development Tools
- VS Code
- Postman
- Git
- GitHub
- Nodemon

---

##  Features

###  User Features

- User registration
- Email validation
- Duplicate email checking
- Password hashing using bcrypt
- User login
- User profile retrieval
- Secure password handling

### 📝 Blog Features

- Create a blog
- Get all blogs
- Get a single blog
- Update a blog
- Delete a blog
- MongoDB-based blog storage

###  Authentication

The application uses `bcryptjs` to securely hash user passwords before storing them in MongoDB.

Passwords are never returned in the user response.

---

##  Project Structure

```text
Blog/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── blogController.js
│   └── userController.js
│
├── models/
│   ├── Blog.js
│   └── User.js
│
├── routes/
│   ├── blogRoutes.js
│   └── userRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md


#  System Architecture

Blogify follows a **client-server architecture** based on the MERN stack. The application separates the frontend presentation layer, backend API layer, business logic, and database layer.

##  High-Level Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                           │
│                                                              │
│                    React.js Frontend                         │
│                                                              │
│   ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │
│   │   Login    │  │   Register │  │   Blog Dashboard   │   │
│   └────────────┘  └────────────┘  └────────────────────┘   │
│                                                              │
│   ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │
│   │ Blog Feed  │  │ Blog Editor│  │  User Profile      │   │
│   └────────────┘  └────────────┘  └────────────────────┘   │
│                                                              │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           │ HTTP / REST API
                           │ JSON
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                       SERVER SIDE                            │
│                                                              │
│                     Node.js + Express                       │
│                                                              │
│   ┌──────────────────────────────────────────────────────┐   │
│   │                    API ROUTES                        │   │
│   │                                                      │   │
│   │  /api/users/register                                 │   │
│   │  /api/users/login                                    │   │
│   │  /api/users/profile                                  │   │
│   │                                                      │   │
│   │  /api/blogs                                          │   │
│   │  /api/blogs/:id                                      │   │
│   └──────────────────────────┬───────────────────────────┘   │
│                              │                               │
│                              ▼                               │
│   ┌──────────────────────────────────────────────────────┐   │
│   │                  CONTROLLERS                          │   │
│   │                                                      │   │
│   │  userController.js                                   │   │
│   │  blogController.js                                   │   │
│   │                                                      │   │
│   │  • Validation                                        │   │
│   │  • Authentication                                    │   │
│   │  • Business Logic                                    │   │
│   │  • Error Handling                                    │   │
│   └──────────────────────────┬───────────────────────────┘   │
│                              │                               │
│                              ▼                               │
│   ┌──────────────────────────────────────────────────────┐   │
│   │                     MODELS                            │   │
│   │                                                      │   │
│   │  User.js                     Blog.js                 │   │
│   │                                                      │   │
│   │  Mongoose Schemas & Database Operations              │   │
│   └──────────────────────────┬───────────────────────────┘   │
│                              │                               │
└──────────────────────────────┼───────────────────────────────┘
                               │
                               │ Mongoose
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                         DATABASE                             │
│                                                              │
│                       MongoDB                                │
│                                                              │
│       ┌──────────────────┐     ┌──────────────────┐         │
│       │  Users Collection│     │  Blogs Collection│         │
│       │                  │     │                  │         │
│       │  name            │     │  blogTitle       │         │
│       │  email           │     │  blogBody        │         │
│       │  password        │     │  author          │         │
│       │  bio             │     │  createdAt       │         │
│       │  timestamps      │     │  updatedAt       │         │
│       └──────────────────┘     └──────────────────┘         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
