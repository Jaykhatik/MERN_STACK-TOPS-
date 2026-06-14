# Poster Maker Application

A premium, full-stack, Canva-inspired Poster Maker application built with React 19, TypeScript, Vite, Node.js, Express, and Multer.

## 🌟 Project Overview
The Poster Maker application is a robust dual-architecture monorepo separated into `frontend` and `backend` directories. It allows users to browse professional template layouts, mix custom colors, write text, and upload custom logos to composite unique marketing posters right in the browser. 

Once satisfied, users can seamlessly save their designs directly to the Node.js server and view/manage them in a custom "My Designs" gallery.

## 📂 Architecture & Navigation

This repository is split into two primary segments. Detailed documentation for each environment is available inside their respective directories:

1. [**Frontend Documentation (`/frontend/README.md`)**](./frontend/README.md)
   *Details on the React 19 UI, Vite configuration, Framer Motion animations, canvas mechanics, and styling.*
2. [**Backend Documentation (`/backend/README.md`)**](./backend/README.md)
   *Details on the Node.js/Express server, Multer image upload handling, API endpoints, and validation logic.*

## 🚀 Quick Start
To get the entire application running locally, you must run both the backend and frontend simultaneously.

**Terminal 1 (Backend Server):**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm install
npm run dev
```

Your API will be listening on `http://localhost:5000` and the React application will be accessible at `http://localhost:5173`.

## 🛠️ Tech Stack Highlights
- **Frontend**: React 19, TypeScript, Vite, Vanilla CSS (Glassmorphism), Framer Motion, Lucide React
- **Backend**: Node.js, Express, TypeScript, Multer, UUID, CORS

## ✨ Features at a Glance
- Highly interactive and responsive Canva-style Canvas.
- Drag-and-drop elements on the poster.
- Dynamic color pickers and instant text binding.
- Image uploads powered securely by backend Multer processing.
- Persistent saved design gallery directly mapped from the backend.
- Sleek animated custom notification toasts.
- Professional error handling and API validation.
