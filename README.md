
# Task Management System

## Overview

This project is a simple MERN (MongoDB, Express, React, Node.js) stack application with user authentication and task management functionalities. It includes three main pages:
- **Login:** Allows users to log in to the application.
- **Register:** Allows new users to create an account.
- **Task Management:** Allows users to manage their tasks.

### Deployed link :
https://task-management-system-ebon-five.vercel.app/register

Sample Snapshots:

### Task page
![image](https://github.com/user-attachments/assets/469c2489-8504-4b39-9e55-10ae15fe83c8)

### Login Page
![image](https://github.com/user-attachments/assets/ba378c87-da67-4a66-bcc7-f14715105378)

### Register Page
![image](https://github.com/user-attachments/assets/2c4fc260-058d-4893-8bf0-b6c30bf9f851)


## Features

- **User Authentication:** Users can register and log in to the application.
- **Task Management:** Authenticated users can create, read, update, and delete tasks.

## Project Structure

```
/Task-management-system
│
├── frontend/              # React frontend
│   ├── public/            # Public files
│   ├── src/               # Source files
│   │   ├── actions/       # Redux actions
│   │   ├── components/    # React components
│   │   ├── reducers/      # Redux reducers
│   │   ├── store/         # Redux store
│   │   ├── App.js         # Main React component
│   │   └── index.js       # Entry point
│   └── package.json       # Frontend dependencies
│
├── backend/                # Node.js backend
│   ├── controllers/       # Controllers for handling requests
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Middleware (e.g., authentication middleware)
│   ├── server.js          # Entry point
│   └── package.json       # Backend dependencies
│
├── .gitignore              # Git ignore file
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)
- MongoDB (local or remote)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sudhanshu7352/Task-management-system.git
   cd Task-management-system
   ```

2. **Install server dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install client dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables:**

   - Create a `.env` file in the `backend` directory and add your MongoDB connection string:

     ```env
     PORT=5000
     MONGODB_URI=<mongo-URI>
     JWT_SECRET=your-jwt-secret
     ```

5. **Run the development server:**

   - Start the backend server:

     ```bash
     cd backend
     npm start
     ```

   - In a separate terminal, start the frontend server:

     ```bash
     cd frontend
     npm start
     ```

   The application will be available at `http://localhost:3000` by default.

## Usage

### Login

- Navigate to `/login` to log in to the application.
- Enter your email and password and click "Login".

### Register

- Navigate to `/register` to create a new account.
- Fill in the registration form and click "Register".

### Task Management

- After logging in, navigate to `/` to manage your tasks.
- You can create, read, update, and delete tasks.

## API Endpoints

### Authentication

- **POST /api/users/register:** Register a new user.
- **POST /api/users/login:** Log in a user.
- **GET /api/users/verify:** Token Verification.
### Tasks

- **GET /api/tasks:** Retrieve all tasks for the logged-in user.
- **POST /api/tasks:** Create a new task.
- **PUT /api/tasks/:id:** Update a task.
- **DELETE /api/tasks/:id:** Delete a task.

## Technologies Used

- **Frontend:**
  - React
  - Redux
  - Material-UI

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT (JSON Web Tokens)

