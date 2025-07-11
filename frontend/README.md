# 📝 Blogsphere

Blogsphere is a full-stack MERN (MongoDB, Express, React, Node.js) blog web application that allows users to register, log in, create blog posts, edit, delete, and engage with blog content. It features user authentication, profile management, dynamic routing, and a clean, responsive UI powered by Tailwind CSS.

---

## 🚀 Features

- 👤 User Authentication (Register, Login, Logout)
- ✍️ Create, Edit, and Delete Blog Posts
- 💬 Create, Edit, and Delete Comments on Posts
- 📄 View Blog Details with Rich Text Content
- 🔐 Protected Routes for Authenticated Users
- 📦 RESTful API using Express & MongoDB
- 🔍 Blog Categories and Search Functionality
- 🎨 Responsive UI with Tailwind CSS
- 🗂 Organized File Structure with React Router
- 🍪 Cookie-based Session Management

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- `bcrypt` – Password Hashing
- `jsonwebtoken (JWT)` – Secure Login
- `multer` – Image Upload Handling
- `dotenv` – Environment Configuration

---

## 📁 Folder Structure

Blogsphere/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── images/
│ └── index.js
├── frontend/
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── contexts/
│ └── App.jsx

---

## 🔧 Installation

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

---

### Backend Setup

```bash
cd backend
npm install
npm run start
```bash

Create a .env file in the backend/ directory:


MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Frontend Setup

cd frontend
npm install
npm run dev
🔒 Environment Variables
Variable	Description
MONGO_URL	MongoDB Database URI
JWT_SECRET	Secret key for JWT Authentication
PORT	Backend server port (default: 5000)

🙋‍♂️ Author
Muazzam Hussain

📜 License
This project is open-source and available under the MIT License.
