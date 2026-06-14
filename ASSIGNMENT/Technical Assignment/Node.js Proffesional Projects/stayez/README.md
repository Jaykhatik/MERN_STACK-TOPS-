# StayEZ Application

A premium, full-stack vacation rental platform designed to replicate the core experience of Airbnb. Built natively with React 19, TypeScript, Vite, Node.js, and Express.

## 🌟 Project Overview
This repository contains a full-stack monorepo separated cleanly into `frontend` and `backend` directories.

The application allows users to search for destinations globally, filter accommodations by location, view high-quality image galleries, and process real-time mock reservations. The backend handles the validation of booking requests, generates UUID tickets, and securely stores transactions.

## 📂 Architecture & Navigation

1. [**Frontend Documentation (`/frontend/README.md`)**](./frontend/README.md)
   *Detailed explanation of the UI workings, including the interactive Booking Widget, Wishlist toggles, Date Formatting via `date-fns`, and the Airbnb-inspired styling system.*
2. [**Backend Documentation (`/backend/README.md`)**](./backend/README.md)
   *Comprehensive layout of the REST API, outlining endpoints like `/rooms`, `/rooms/search?location=`, and the full `/reserve` booking pipeline.*

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
- **Full Booking Pipeline**: Input user details directly into the Sticky Booking Widget to receive a confirmed Reservation Ticket from the server containing your ID and Price calculations.
- **Location Search**: Front-and-center Hero search functionality mimicking Airbnb's primary CTA.
- **Detailed Room Modals**: Features high-res image galleries, host info, and amenities.
- **Custom Wishlist Engine**: Stores favorites seamlessly using a native React `Set`.
- **Premium UI**: Custom-built Glassmorphism engine, Animated Toast notifications, and Hover lifting cards.
- **Robust Backend**: Express application fully equipped with Global Error Handling and `404` middlewares.
