# StayEZ Frontend Interface

React 19, Vite, and TypeScript frontend featuring a premium Airbnb-style UX.

## 🎨 Core Features
- **Interactive Booking Widget**: A sticky widget component that tracks Check-in/Checkout dates utilizing `date-fns` and captures user information (Name & Email). Clicking reserve dispatches a `POST /reserve` request to the backend and displays a gorgeous success modal presenting the finalized Booking Ticket.
- **Location Search Bar**: Front-and-center search form that takes a location string and automatically queries the backend `GET /rooms/search` endpoint.
- **Wishlist Integration**: Interactive Heart icons that leverage React's `Set` object to track favorites without triggering unnecessary full-page re-renders.
- **Room Modal Overlay**: Click any room to expand it into a beautiful modal displaying high-res galleries, superhost details, and dynamically mapped amenities (Wifi, Pool, etc.) utilizing Lucide-React icons.

## 🚀 Setup
```bash
cd frontend
npm install
npm run dev
```

## 📂 Architecture
- `App.tsx`: The heart of the application handling layout mappings, Hero states, Wishlist stores, and the complete Booking UI lifecycle.
- `services/api.ts`: Dedicated fetch layer keeping UI components clean from raw HTTP requests (now includes `reserveRoom` logic).
- `hooks/useToasts.ts`: Powers the animated notification system.
- `index.css`: Houses all primary variables (`#FF385C`), grid styling, and advanced glassmorphism implementations, updated with fully responsive media queries.
