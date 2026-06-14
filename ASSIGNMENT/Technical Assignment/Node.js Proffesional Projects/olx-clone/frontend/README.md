# OLX Clone Frontend Interface

React 19, Vite, and TypeScript frontend featuring a modern marketplace UX.

## 🎨 Core Features
- **Live Debounced Search**: Intercepts keystrokes inside `App.tsx` utilizing a custom `useDebounce` hook. It pauses for 300ms before making a `GET /search` request, ensuring optimal server load.
- **Sell Product Modal**: A comprehensive form capturing Title, Description, Price, and Category. Features an interactive Dropzone for Image uploads which sends a `FormData` payload to the backend `POST /upload`.
- **Wishlist Integration**: Interactive Heart icons toggle products inside a local React `Set` state, allowing immediate visual feedback.
- **Toasts**: A custom `useToasts` hook providing sleek, `framer-motion` animated popup alerts instead of native browser `window.alert()`.

## 🚀 Setup
```bash
cd frontend
npm install
npm run dev
```

## 📂 Architecture
- `App.tsx`: Main structural component managing layout, state, and modals.
- `services/api.ts`: Dedicated fetch layer keeping UI components clean from raw HTTP requests.
- `hooks/`: Houses `useDebounce.ts` and `useToasts.ts`.
- `index.css`: CSS Variables powering the "Light Mode Only", Glassmorphism UI components.
