# 💬 One-to-One Real-Time Chat App

A simple and modern real-time chat application built with **React.js** and **Socket.IO**, supporting private 1:1 messaging.

---

## 🚀 Key Features

* 🔐 **Username Login** – Join using a simple username
* 💬 **One-to-One Messaging** – Private conversations with selected users
* 🟢 **Live User List** – See who’s online in real time
* 🕓 **Message Timestamps** – Every message includes the time sent
* 🔁 **Session Persistence** – Keeps user info with `localStorage`

---

## ⚙️ Tech Stack

### Frontend (React)

* React.js
* React Router DOM
* Socket.IO Client
* Moment.js
* React Icons

### Backend (Node.js)

* Express.js
* Socket.IO
* Nodemon (for development)

---

## 📁 Project Structure

```
├── client/                 # React frontend application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── Components/    # React components
│   │   │   ├── HomePage.js      # Main chat interface
│   │   │   ├── HomePage.css     # Chat styling
│   │   │   ├── JoinChat.js      # User authentication
│   │   │   └── JoinChat.css     # Auth styling
│   │   ├── App.js         # Main application component
│   │   ├── Socket.js      # Socket.IO client configuration
│   │   └── index.js       # Application entry point
│   └── package.json       # Frontend dependencies
└── server/                # Node.js backend server
    ├── index.js           # Socket.IO server implementation
    └── package.json       # Backend dependencies
```

---

## 🛠️ Getting Started

### 📦 Install Dependencies

```bash
# Clone the repo
git clone <repo-url>

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd client
npm install
```

### ▶️ Run the App

```bash
# Start backend 
cd server
nodemon index.js

# Start frontend 
cd client
npm start
```

---

## 📲 How It Works

1. Open `https://one-to-one-chat-app.netlify.app/`
2. Enter a username to join
3. Select a user from the list to start chatting
4. Send real-time messages privately

---

## ⚙️ Configuration
🖥️ Frontend
Runs on: https://one-to-one-chat-app.netlify.app/

🚀 Backend
Runs on: https://socket-server-4lo3.onrender.com

🔌 WebSocket (Socket.IO)
Socket.IO is used for real-time communication.

The frontend connects to the backend Socket.IO server.
---

## ✨ Future Ideas

* Group chats
* File sharing
* Push notifications

---

**Built with ❤️ using React & Socket.IO**

---
