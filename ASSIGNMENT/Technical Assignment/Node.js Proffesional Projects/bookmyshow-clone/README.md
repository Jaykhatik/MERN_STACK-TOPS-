# BookMyShow Clone Application

A premium, full-stack Movie Ticket Booking application designed to replicate the core experience of BookMyShow. It is built natively with React 19, TypeScript, Vite, Node.js, and Express.

## 🌟 Project Overview
This repository contains a full-stack, dual-architecture monorepo separated cleanly into `frontend` and `backend` directories. 

The application provides a seamless cinema booking experience. Users can land on a beautifully animated storefront, instantly search for current blockbusters with zero latency (using a debounced typing mechanism), select an interactive seat map, and successfully book a ticket. The backend actively blocks duplicate bookings and permanently stores successful transactions.

## 📂 Architecture & Navigation

This project utilizes isolated environments. Detailed documentation on how each specific segment operates internally can be found inside their respective directories:

1. [**Frontend Documentation (`/frontend/README.md`)**](./frontend/README.md)
   *Detailed explanation of the UI workings, including the interactive seat map logic, real-time debounced searching, and the glassmorphism design system.*
2. [**Backend Documentation (`/backend/README.md`)**](./backend/README.md)
   *Comprehensive layout of the RESTful API, documenting all routes (`/movies`, `/search-movies`, `/book-ticket`), AI-assisted validation logic, and middlewares.*

## 🚀 Quick Start & Setup
To experience the entire application locally, you must run both the backend API and frontend client simultaneously.

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

Your backend API will safely listen on `http://localhost:5000` while the React application will be accessible at `http://localhost:5173`.

## 🛠️ Tech Stack Highlights
- **Frontend**: React 19, TypeScript, Vite, Vanilla CSS (Glassmorphism), Framer Motion, Custom Hooks (`useDebounce`, `useToasts`)
- **Backend**: Node.js, Express, TypeScript, UUID

## ✨ Features at a Glance
- High-fidelity UI mimicking modern booking platforms.
- Interactive seat selection UI (Green = Available, Red = Booked, Blue = Selected).
- Strict API validation blocking duplicate bookings.
- Animated toast notifications and dynamic rendering.
- Clean Architecture with strict TypeScript implementation across both domains.
