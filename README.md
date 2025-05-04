# 📌 Pinterest Clone

A full-stack Pinterest-inspired web application where users can discover, save, and share image-based content through customizable boards. 
This project features AI-powered image tag generation and collaborative boards for a dynamic content-sharing experience.


## 🧠 Features

- 🔐 **User Authentication** – Secure login/signup with Firebase Authentication.
- 📤 **Image Upload** – Upload images and organize them as pins on boards.
- 🧠 **AI-Based Tag Prediction** – Automatically generates relevant tags for uploaded images using a machine learning model.
- 🗂️ **Boards** – Create, edit, and manage personal boards to categorize pins.
- 👥 **Collaborative Boards** – Invite others to contribute and manage shared boards.
- 🔍 **Search by Tags** – Instantly find pins using smart, auto-generated tags.
- 🖼️ **Responsive UI** – Sleek and modern interface built using React and Tailwind CSS.

---

## 🛠️ Tech Stack

### 🧩 Frontend
- **React.js**
- **Tailwind CSS**
- **React Router**
- **Firebase Authentication**

### 🔧 Backend
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** (for API authentication)
- **Cloudinary** (for image hosting)
- **Custom ML Model API** – For AI-based image tag prediction

---

## 📂 Folder Structure (Basic Overview)

pinterest-clone/
│
├── client/ # React Frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── utils/
│ └── App.jsx
│
├── server/ # Node.js Backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── index.js
│
└── README.md

### 🔻 Clone the repository

```bash
git clone https://github.com/yash1022/pinterest-clone.git
cd pinterest-clone

```
FRONTEND-SETUP

cd FRONTEND
npm install
npm run dev

BACKEND-SETUP

cd BACKEND
npm install
node index.js
