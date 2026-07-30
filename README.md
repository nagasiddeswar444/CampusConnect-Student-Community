# 🎓 CampusConnect – Student Community Platform

CampusConnect is a full-stack web application designed to provide a collaborative digital platform for students. It allows students to create and share blogs and videos, interact through likes and comments, join communities, and manage their profiles.

The application also includes an admin module for managing student registrations and platform access.

## ✨ Features

### 👨‍🎓 Student Features
- Student registration and secure login
- JWT-based authentication and authorization
- Create and manage student profiles
- Upload and update profile photos
- Create, edit, view, and delete blogs
- Upload and manage videos
- Like and comment on blogs
- Like and comment on videos
- Search blogs and videos
- Create and join student communities
- View notifications
- Forgot password and password creation functionality

### 👨‍💼 Admin Features
- Secure admin login
- View student registrations
- Approve or reject student accounts
- Manage registered students
- Admin profile management

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- HTML
- CSS
- Axios

### Backend
- ASP.NET Core Web API
- C#
- REST APIs
- Dapper ORM

### Database
- Microsoft SQL Server
- Stored Procedures

### Authentication & Security
- JWT Authentication
- BCrypt Password Hashing
- Role-based access control

## 🏗️ Project Structure

```text
CampusConnect
│
├── CampusConnect.API
│   ├── Controllers
│   ├── DTOs
│   ├── Data
│   ├── Helpers
│   ├── Models
│   ├── Repositories
│   ├── Services
│   └── Program.cs
│
├── campusconnect-ui
│   ├── public
│   └── src
│       ├── components
│       ├── pages
│       ├── services
│       └── styles
│
└── CampusConnect.slnx
```

## 🔄 Application Workflow

1. A student registers on CampusConnect.
2. The administrator reviews the registration.
3. After approval, the student can access the platform.
4. Students can create blogs, upload videos, and participate in communities.
5. Students can interact with content through likes and comments.
6. Admins manage student registrations and platform access.

## 💻 Architecture

The backend follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Dapper
    ↓
SQL Server
```

This separation helps maintain clean and organized backend code.

## 🚀 Running the Project Locally

### Backend

1. Open `CampusConnect.slnx` in Visual Studio.
2. Configure the SQL Server connection string in `appsettings.json`.
3. Configure the required JWT and email settings.
4. Run the ASP.NET Core Web API.

### Frontend

Navigate to:

```bash
cd campusconnect-ui
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

## 📌 Future Enhancements

- Cloud deployment
- Real-time notifications
- Enhanced community features
- Improved content recommendation
- Cloud-based media storage

## 👩‍💻 Project Type

Full-Stack Web Application developed as part of an internship project.
