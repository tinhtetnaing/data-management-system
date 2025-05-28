# Next.js data management system with Express and MongoDB

A modern, responsive data management application built with Next.js, Express and MongoDB. This template provides a quick start for building full-stack web applications with authentication and CRUD functionality.

## Features

- 🔐 User Authentication
- 📱 Responsive Material-UI Dashboard
- 🎯 Collapsible Navigation Menu
- 🔄 CRUD Operations
- 🗄️ MongoDB Integration
- 🚀 Express Backend
- 🛡️ Protected Routes
- 📊 Data Management Interface

## Tech Stack

- **Frontend:**
  - Material Kit React
  - Next.js
  - React
  - JWT Authentication

- **Backend:**
  - Express.js
  - MongoDB with Mongoose
  - Node.js

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/tinhtetnaing/data-management-system.git
cd quickstart-template-nextjs-express-mongoose-crudify-mongodb
```

2. Install dependencies:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd client
npm install
```

3. Environment Setup:
Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Start the development servers:
```bash
# Start the backend server
npm start

# In a separate terminal, start the frontend
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
├── client/                 # Frontend Next.js application
│   ├── components/        # React components
│   ├── layouts/          # Page layouts
│   ├── pages/            # Next.js pages
│   └── styles/           
├── server/                # Backend Express application
│   ├── controllers/      # Route controllers
│   ├── models/          # Mongoose models
│   └── routes/          # Express routes
└── package.json          # Project dependencies
```

## Features in Detail

### Authentication
- JWT-based authentication
- Protected routes
- Automatic redirect to login for unauthorized access

### Dashboard Layout
- Collapsible sidebar menu
- Responsive design for mobile and desktop
- Clean Material-UI interface
- Logout functionality

### Data Management
- CRUD operations for items
- Data table with sorting and filtering
- Secure API endpoints

## Acknowledgments

- Next.js Documentation
- Material-UI Team
- MongoDB Documentation
- Express.js Team
