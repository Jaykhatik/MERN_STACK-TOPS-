# TechStore E-Commerce Application

A complete modern E-Commerce web application featuring a premium UI/UX design and a robust Node.js backend. This project was built to satisfy the professional assignment requirements, demonstrating proficiency in full-stack development, UI/UX design, and clean architecture.

## 🚀 Features

### ✅ Frontend
- **React 19 + TypeScript + Vite** — Fast, modern, type-safe SPA
- **Zustand** — Global state for `products`, `cart`, `cartTotals`, `searchQuery`, `isCartOpen`, `toastMessage`
- **Live Search** — Navbar search bar calls `GET /products/search?q=` on every keystroke and updates the product grid instantly
- **Cart Drawer** — Slides in from the right with: real-time bill calculations (subtotal, 5% delivery charge, total).
- **Toast Notifications**: Custom beautiful slide-in animated notifications replacing standard alerts.
- **Responsive**: Fully responsive design (Desktop, Tablet, Mobile).

### Backend (Node.js & Express)

- **RESTful API**: Structured routes for products and cart operations.
- **Custom Middleware**: Global logging middleware capturing Timestamp, HTTP Method, and URL.
- **Data Management**: In-memory data store for products and dynamic cart operations.
- **Error Handling**: Graceful global error handler and 404 fallback.
- **Cart Calculations**: Automated calculation of subtotal, delivery charges, and final total.

## 📂 Project Structure

```
shop-backend/
│
├── backend/                  # Node.js + Express server
│   ├── data/                 # In-memory storage (cart.js, products.js)
│   ├── middleware/           # Custom middleware (logger.js, errorHandler.js)
│   ├── routes/               # API routes (cart.js, products.js)
│   ├── package.json
│   └── server.js             # Entry point
│
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/       # Reusable UI components (Navbar, Hero, etc.)
│   │   ├── services/         # Axios API service configuration
│   │   ├── store/            # Zustand global state (useStore.ts)
│   │   ├── App.tsx           # Main application component
│   │   ├── App.css           # Global layout styles
│   │   └── index.css         # Global variables, themes & utils
│   └── package.json
│
├── package.json              # Root package (runs concurrently)
└── README.md
```

## 🛠️ Installation & Setup

1. **Clone or Extract the repository**:
   Navigate to the root `shop-backend` folder.

2. **Install all dependencies**:
   ```bash
   npm run install:all
   ```
   _(This script automatically installs root dependencies, then installs frontend and backend dependencies)._

## 🚦 Running the Application

To run both the Frontend and Backend simultaneously:

```bash
npm start
```

Alternatively, to run them separately:

- **Backend**: `cd backend && npm start` (Runs on `http://localhost:5000`)
- **Frontend**: `cd frontend && npm run dev` (Runs on `http://localhost:5173`)

## 📖 API Documentation

### Products

- `GET /products` - Returns 3 sample premium products.
- `GET /products/search?q={query}` - Returns products matching the search query (case-insensitive).

### Cart

- `GET /cart` - Returns current cart items.
- `POST /cart/add` - Adds an item to the cart or increases quantity if it already exists. Sending a negative quantity decreases it, and the item is removed if quantity drops to 0 or below.
  - Body: `{ "productId": 1, "quantity": 1 }`
- `GET /cart/total` - Returns calculated totals.
  - Response: `{ "subtotal": 134900, "deliveryCharge": 6745, "total": 141645 }`
- `DELETE /cart/:productId` - Removes an item from the cart.
- `POST /cart/clear` - Clears the entire cart.

## 🔮 Future Improvements

- Integrate a real database (MongoDB / PostgreSQL) using Prisma or Mongoose.
- Implement User Authentication (JWT).
- Add Stripe or Razorpay payment gateway integration.
- Implement persistent cart storage using LocalStorage or User Database.
- Add Dark Mode toggle functionality.
