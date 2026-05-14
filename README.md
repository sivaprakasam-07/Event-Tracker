# 🎯 Event Tracker System

<p align="center">
  <img src="https://github.com/user-attachments/assets/deb1a603-1f3d-460a-8456-3afefbc9be43" width="300"/>
  <img src="https://github.com/user-attachments/assets/55c48b8f-c58d-4d8b-a890-b587d4cf08e0" width="300"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/8779d900-8c92-4af7-959b-0f3d06deb62a" width="300"/>
  <img src="https://github.com/user-attachments/assets/a80bbf25-0192-43cd-85d3-35b59ca0883c" width="300"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/678d5786-fa74-49f7-afc7-7c1bf81c404a" width="300"/>
  <img src="https://github.com/user-attachments/assets/82eb24ad-ad4a-435e-b894-0ce4d494cfb4" width="300"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/e66a21ee-5b43-42fc-83d5-5157cdbd159b" width="650"/>
</p>

---

# 🚀 Project Overview

Event Tracker System is a modern role-based Event Management Platform designed to streamline event creation, management, and monitoring across multiple departments within an institution.

The system provides separate dashboards and permissions for admins, department heads, and users with secure authentication, protected routes, and real-time event handling.

---

# ✨ Features

## 🔐 Authentication & Authorization

- Secure Login System
- JWT-based Authentication
- Password Hashing using bcrypt
- Role-Based Access Control (RBAC)
- Protected Routes

---

## 👨‍💼 User Roles

### 🛡️ Master Admin

- Full system access
- Manage all users and events
- Monitor Engineering & Technology events

### ⚙️ Super Admin (Engineering)

- Create & manage Engineering events
- Access Engineering dashboard
- Control Engineering department activities

### 💻 Super Admin (Technology)

- Create & manage Technology events
- Access Technology dashboard
- Control Technology department activities

### 🧑‍🏫 Department Heads

- Create and manage events only for their departments
- View events from other departments
- Department-specific control system

### 👤 Users

- View all available events
- Explore event details
- Access event schedules and updates

---

# 🌟 Core Functionalities

- 📅 Event Creation & Management
- 📝 Event Registration System
- 🔎 Event Filtering & Searching
- 📊 Department-wise Event Tracking
- 📱 Fully Responsive UI
- 🎨 Modern Dashboard Design
- ⚡ Real-time Event Updates
- 🔒 Secure Backend APIs
- 🌐 Multi-dashboard Architecture

---

# 🛠️ Tech Stack

## 🎨 Frontend

- React.js
- React Router DOM
- Context API
- Axios
- Material UI
- CSS3

## ⚙️ Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

---

# 🧠 System Architecture

```text
User → Frontend Dashboard → Authentication Middleware → Backend APIs → MongoDB Database
```

---

# 📂 Project Structure

```bash
Event-Tracker/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   ├── services/
│   └── App.jsx
│
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── Middleware/
│   └── server.js
│
└── README.md
```

---

# 🔥 Core Modules

## 📅 Event Management Module

- Create Events
- Update Events
- Delete Events
- Event Scheduling

## 🔐 Authentication Module

- JWT Authentication
- Role Validation
- Protected Routes
- Login System

## 👨‍💼 Admin Dashboard

- Department Management
- User Management
- Event Monitoring
- Analytics Access

## 📱 User Module

- Event Browsing
- Event Registration
- Event Details Viewing
- Responsive User Experience

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/event-tracker.git
```

---

## 2️⃣ Navigate to Project

```bash
cd event-tracker
```

---

# 🔧 Backend Setup

## Install Dependencies

```bash
cd backend
npm install
```

---

## Create `.env` File

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## Start Backend Server

```bash
npm start
```

---

# 💻 Frontend Setup

## Install Dependencies

```bash
cd frontend
npm install
```

---

## Start Frontend

```bash
npm run dev
```

---

# 🔑 Authentication Workflow

```text
User Login → Backend Verification → JWT Token Generation → Protected Dashboard Access
```

---

# 📦 Database Collections

## Engineering Events

```text
createEventEng
```

## Technology Events

```text
createEventTech
```

## Users

```text
users
```

---

# 🧠 RBAC Workflow

| Role | Permissions |
|------|-------------|
| Master Admin | Full Access |
| Super Admin Engineering | Manage Engineering Events |
| Super Admin Technology | Manage Technology Events |
| Department Head | Manage Department Events |
| User | View Events |

---

# 📸 UI Highlights

- Elegant Admin Dashboards
- Department-wise Event Panels
- Responsive Design
- Modern Forms with Material UI
- Smooth Navigation Experience
- Mobile-Friendly Layout
- Dynamic Event Management UI

---

# 🔒 Security Features

- Encrypted Password Storage
- JWT Authentication
- Protected Backend Routes
- Role-Based Route Protection
- Secure API Handling

---

# 📈 Future Improvements

- 📩 Email Notifications
- 📊 Analytics Dashboard
- 📅 Calendar Integration
- 📱 Mobile Application
- 🔔 Real-time Notifications
- 🧾 Event Certificate Generation
- 🌍 Cloud Deployment
- 🤖 AI-based Event Recommendations

---

# 🎯 Use Cases

- College Event Management
- Department Event Coordination
- Technical Symposium Management
- Workshop Registration
- Multi-department Event Tracking

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

# 👨‍💻 Developer

## Sivaprakasam T

Full Stack Developer

- MERN Stack Developer
- UI/UX Enthusiast
- Backend & Authentication Systems
- Modern Web Application Developer

---

# ⭐ Support

If you like this project:

- Give it a ⭐ on GitHub
- Share it with others
- Contribute to improve the project

---

# 📜 License

This project is developed as a professional institutional event management platform.

---

# ❤️ Thank You

Thank you for visiting the Event Tracker project.

Built with passion using the MERN Stack 🚀
