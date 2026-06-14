# BookMyShow Frontend Interface

This directory houses the user interface for the BookMyShow clone, beautifully engineered with React 19, Vite, and TypeScript. It prioritizes premium UX with glassmorphism, fluid animations, and real-time interactive components.

## 🎨 Core Features & Workings

### 1. **Interactive Seat Selection**
The frontend generates a dynamic 32-seat grid map simulating a cinema screen. 
- **How it works**: When a user clicks "Book Tickets" on a movie, the `App.tsx` immediately fires a `GET /bookings` request to the backend. It maps existing bookings for that specific movie and renders those seats as **Red/Booked**.
- **User Interaction**: Users can click any available **White** seat to turn it **Blue (Selected)**. Clicking a Red seat is blocked.

### 2. **Debounced Real-Time Search**
The Navbar contains a search input that doesn't rely on a "Submit" button.
- **How it works**: A custom hook `useDebounce` wraps the user's keystrokes, pausing for `300ms` after they stop typing before firing a `GET /search-movies?q=` API call. This prevents API spamming while delivering instant results directly to the grid.

### 3. **Premium UI & Animations**
- **Glassmorphism**: The sticky Navbar and select UI elements utilize `backdrop-filter: blur(16px)` and translucent backgrounds to achieve an authentic modern aesthetic.
- **Framer Motion**: Smooth component mounting, floating hero titles, modal scale-ins, and animated custom Toast notifications are completely powered by Framer Motion.

## 🚀 Setup & Installation

Navigate to the `frontend/` directory, install dependencies, and run Vite:

```bash
cd frontend
npm install
npm run dev
```
The application will launch on `http://localhost:5173`. Make sure the Node.js backend is running concurrently to fetch movies and process bookings!

## 📂 Component Architecture
- `App.tsx`: Central hub managing the global state (Movies, Search Query, Booking Modal, API calls).
- `components/Navbar.tsx`: Sticky top navigation bar containing the search input.
- `components/Hero.tsx`: Animated introductory hero section urging users to book.
- `services/api.ts`: Centralized fetch service mapping directly to the Express backend.
- `hooks/useDebounce.ts`: Custom React hook handling input delay for searching.
- `hooks/useToasts.ts`: Custom React hook managing automated popup alerts for success/failure.
- `index.css`: Vanilla CSS implementations of the design system (CSS variables, modal overlays, seat grids).
