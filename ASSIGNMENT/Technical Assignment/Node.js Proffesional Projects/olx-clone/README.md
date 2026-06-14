# OLX Clone Application

A premium, full-stack Marketplace application designed to replicate the core experience of OLX. Built with React 19, TypeScript, Vite, Node.js, Express, and Multer.

## 🌟 Project Overview
This repository contains a full-stack monorepo separated cleanly into `frontend` and `backend` directories.

The application allows users to browse an extensive category of products, perform debounced live searches, and add new listings dynamically. It supports secure, validated image uploads using Multer on the backend and features a modern UI with glassmorphism styling and Framer Motion animations.

## 📂 Architecture & Navigation

1. [**Frontend Documentation (`/frontend/README.md`)**](./frontend/README.md)
   *Detailed explanation of the UI, including the debounced searching, Wishlist integration, Sell Modal with Drag & Drop image uploading, and the glassmorphism design system.*
2. [**Backend Documentation (`/backend/README.md`)**](./backend/README.md)
   *Comprehensive layout of the RESTful API, outlining endpoints like `/products`, `/add-product`, `/upload`, and the heavily secured Multer image storage configuration.*

## 🚀 Quick Start & Setup
You must run both the backend API and frontend client simultaneously.

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

The Backend runs on `http://localhost:5000` and the React App on `http://localhost:5173`.

## ✨ Features at a Glance
- Debounced live search with instantaneous filtering.
- Fully functional "Sell Product" modal featuring secure image uploading.
- Premium UI elements with Glassmorphism, interactive Category Grid, and Hover lifting.
- Express Backend fully equipped with Global Error Handling and 404 middlewares.
- In-memory data store mimicking a NoSQL database for rapid prototyping.
