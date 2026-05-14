<img width="1918" height="981" alt="image" src="https://github.com/user-attachments/assets/deb1a603-1f3d-460a-8456-3afefbc9be43" />
<img width="1918" height="977" alt="image" src="https://github.com/user-attachments/assets/55c48b8f-c58d-4d8b-a890-b587d4cf08e0" />
<img width="1918" height="976" alt="image" src="https://github.com/user-attachments/assets/8779d900-8c92-4af7-959b-0f3d06deb62a" />
<img width="1918" height="981" alt="image" src="https://github.com/user-attachments/assets/a80bbf25-0192-43cd-85d3-35b59ca0883c" />
<img width="1918" height="977" alt="image" src="https://github.com/user-attachments/assets/678d5786-fa74-49f7-afc7-7c1bf81c404a" />
<img width="1918" height="977" alt="image" src="https://github.com/user-attachments/assets/82eb24ad-ad4a-435e-b894-0ce4d494cfb4" />
<img width="1918" height="977" alt="image" src="https://github.com/user-attachments/assets/e66a21ee-5b43-42fc-83d5-5157cdbd159b" />








# 🎯 Event Tracker System

A modern, role-based Event Management Platform built to streamline event creation, management, and monitoring for multiple departments within an institution. The system provides separate dashboards and permissions for admins, department heads, and users with secure authentication and real-time event handling.

---

# 🚀 Features

## 🔐 Authentication & Authorization

* Secure Login System
* JWT-based Authentication
* Password Hashing using bcrypt
* Role-Based Access Control (RBAC)
* Protected Routes

## 👨‍💼 User Roles

### 🛡️ Master Admin

* Full system access
* Manage all users and events
* Monitor Engineering & Technology events

### ⚙️ Super Admin (Engineering)

* Create & manage Engineering events
* Access Engineering dashboard
* Control Engineering department activities

### 💻 Super Admin (Technology)

* Create & manage Technology events
* Access Technology dashboard
* Control Technology department activities

### 🧑‍🏫 Department Heads

* Create and manage events only for their departments
* View events from other departments
* Department-specific control system

### 👤 Users

* View all available events
* Explore event details
* Access event schedules and updates

---

# ✨ Core Functionalities

* 📅 Event Creation & Management
* 📝 Event Registration System
* 🔎 Event Filtering & Searching
* 📊 Department-wise Event Tracking
* 📱 Fully Responsive UI
* 🎨 Modern Dashboard Design
* ⚡ Real-time Event Updates
* 🔒 Secure Backend APIs
* 🌐 Multi-dashboard Architecture

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Context API
* Axios
* Material UI
* CSS3

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

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

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/event-tracker.git
```

## 2️⃣ Navigate into the Project

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

## Create `.env` File

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

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

## Start Frontend

```bash
npm run dev
```

---

# 🔑 Authentication Flow

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

| Role                    | Permissions               |
| ----------------------- | ------------------------- |
| Master Admin            | Full Access               |
| Super Admin Engineering | Manage Engineering Events |
| Super Admin Technology  | Manage Technology Events  |
| Department Head         | Manage Department Events  |
| User                    | View Events               |

---

# 📸 UI Highlights

* Elegant Admin Dashboards
* Department-wise Event Panels
* Responsive Design
* Modern Forms with Material UI
* Smooth Navigation Experience

---

# 🔒 Security Features

* Encrypted Password Storage
* JWT Authentication
* Protected Backend Routes
* Role-Based Route Protection
* Secure API Handling

---

# 📈 Future Improvements

* 📩 Email Notifications
* 📊 Analytics Dashboard
* 📅 Calendar Integration
* 📱 Mobile App Version
* 🔔 Real-time Notifications
* 🧾 Event Certificate Generation
* 🌍 Cloud Deployment

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

* MERN Stack Developer
* UI/UX Enthusiast
* Backend & Authentication Systems
* Modern Web Application Developer

---

# ⭐ Support

If you like this project:

* Give it a ⭐ on GitHub
* Share it with others
* Contribute to improve it

---

# 📜 License

This project is developed for educational and institutional purposes.

---

# ❤️ Thank You

Thank you for visiting the Event Tracker project.

Built with passion using the MERN Stack 🚀
