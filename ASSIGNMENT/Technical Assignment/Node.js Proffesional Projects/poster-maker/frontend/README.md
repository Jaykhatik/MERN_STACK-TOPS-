# Poster Maker Frontend Interface

This directory contains the user interface for the Canva-inspired Poster Maker application, built with React 19, Vite, and TypeScript. It features a highly interactive canvas editor, drag-and-drop uploads, and a sleek glassmorphic design system.

## 🎨 Features & UX
- **Real-time Live Canvas Editor**: Changes to text and background colors are immediately reflected on the main poster canvas.
- **Framer Motion Animations**: Buttery smooth component entrances, modal scaling, and floating effects throughout the interface.
- **Interactive UI Panel**: Dynamic left-sidebar for quick access to Templates, Text Editing, Color Pickers, Image Uploading, and viewing Saved Designs.
- **Drag & Drop Elements**: Uploaded images/logos and text blocks can be dragged around the poster canvas intuitively.
- **Custom Hook Toasts**: Reusable animated notification system replacing intrusive browser alerts.

## 🚀 Setup & Installation

Navigate to the `frontend/` directory, install dependencies, and run Vite:

```bash
cd frontend
npm install
npm run dev
```
The application will launch on `http://localhost:5173`. Ensure your backend server is also running for full functionality.

## 📂 Component Architecture

- `App.tsx`: Main structural container managing global state, active sidebar tabs, and the live preview canvas.
- `components/Navbar.tsx`: Sticky top navigation bar.
- `components/Hero.tsx`: Animated introductory hero section.
- `components/Sidebar.tsx`: Icon-based left sidebar for tool selection.
- `services/api.ts`: Centralized fetch service handling all communication with the Node.js backend.
- `hooks/useToasts.ts`: Custom React hook managing an array of temporal notification toasts.
- `App.css` & `index.css`: Vanilla CSS implementations of a robust, token-based design system featuring glassmorphism and modern micro-interactions.

## 💡 How It Works
1. **Selection**: Users browse the Template Gallery and select a base design.
2. **Customization**: Users input custom text and pick background colors using the editor panel.
3. **Uploads**: Users click the upload zone to pass a logo file to the backend via Multer. The returned URL is mapped immediately onto the canvas as a draggable element.
4. **Saving**: Users click the "Save Design" button, executing a `POST` request to the backend. The design safely lands in the "My Designs" sidebar tab!
