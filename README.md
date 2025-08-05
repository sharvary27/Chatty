# ✨ Full Stack Realtime Chat App

A modern full-stack real-time chat application built with MERN, Socket.io, and JWT, designed for secure and instant communication with a polished UI.

## 🔥 Features

- 🔐 **Authentication & Authorization** – Secure login/signup using JWT tokens
- 💬 **Real-time Messaging** – Bi-directional communication via Socket.io
- 🟢 **Online User Status** – Instantly reflects active users
- 📦 **Global State Management** – Powered by Zustand for smooth data flow
- ☁️ **Media Upload Support** – Integrated with Cloudinary for image sharing
- 🎨 **Beautiful UI** – Styled with TailwindCSS and Daisy UI
- 🐞 **Robust Error Handling** – Gracefully manages client/server errors
- 🚀 **Free Deployment Ready** – Optimized for production hosting

## 🛠 Tech Stack

- **Frontend**: React, Zustand, TailwindCSS, Daisy UI
- **Backend**: Node.js, Express, MongoDB, Socket.io
- **Authentication**: JSON Web Tokens (JWT)
- **Media**: Cloudinary

## 📁 .env Configuration

Create a `.env` file in the root directory and include:

```env
MONGODB_URI=your_mongodb_uri
PORT=5001
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
