# TechStore Frontend

This is the frontend implementation of the TechStore E-Commerce application. It is a modern, premium UI built to deliver an exceptional user experience with fast load times and interactive features.

## 🛠️ Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Zustand** (Global State Management)
- **Lucide React** (Icons)
- **Axios** (API Requests)

## 🏗️ How It Works

The frontend operates independently as a Single Page Application (SPA), communicating with the backend via RESTful APIs.

1. **State Management**: Zustand is used in `src/store/useStore.ts` to manage the global state of the application. This includes the `cart`, `products`, `searchQuery`, `cartTotals`, and `toastMessage`. Using Zustand eliminates prop-drilling and keeps the UI perfectly synchronized.
2. **API Service Layer**: All network requests are centralized in `src/services/api.ts` using Axios. This separation of concerns makes it easy to manage base URLs and update endpoints.
3. **Components & UI**:
   - Uses pure CSS (CSS Modules approach) for a premium look with glassmorphism, floating shapes, and smooth micro-interactions.
   - The UI is fully responsive, ensuring perfect scaling on desktop, tablet, and mobile.
   - The **Cart Drawer** dynamically updates the subtotal, calculates a 5% delivery charge, and displays the final total in real-time.
   - Animated **Toast Notifications** are triggered via the Zustand store whenever a user interacts with the cart.

## 🚀 Running Individually

To run the frontend individually without using the root concurrent script:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

The frontend will be accessible at `http://localhost:5173`.
_(Note: To fetch products and interact with the cart, the backend server must be running on port 5000)._

## 📂 Structure

- `/src/components` - Contains reusable UI blocks (Navbar, Hero, ProductCard, CartDrawer, Toast).
- `/src/services` - Axios instances and API route definitions.
- `/src/store` - Global Zustand store definition.
- `index.css` & `App.css` - Global design tokens, variables, and animations.
