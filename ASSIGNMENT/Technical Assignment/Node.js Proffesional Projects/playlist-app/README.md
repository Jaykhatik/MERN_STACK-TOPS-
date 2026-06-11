# Playlist Management Application

A premium, Spotify-inspired web application for managing your music playlist. Built with modern web technologies including React 19, TypeScript, Vite, Node.js, and Express.

![Playlist App](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Express](https://img.shields.io/badge/Express-4.19-green)

## 📁 Project Structure

```
playlist-app/
│
├── backend/
│   ├── package.json
│   ├── server.js       # Express server entry point
│   └── song.js         # Song model and initial data
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx     # Main application component
│   │   ├── index.css   # Global styles and animations
│   │   └── main.tsx    # React entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── package.json        # Root package for concurrent execution
└── README.md
```

## ✨ Features

### Backend
- **RESTful API**: Clean Express server handling CRUD operations
- **Memory Storage**: Utilizes an array to store `Song` class instances
- **Validation**: Strict validation for song creation (title required, positive duration)
- **Error Handling**: Global error handler and 404 fallback
- **Search**: Built-in query parameter support for title searching

### Frontend
- **Premium UI**: Modern glassmorphism design with soft shadows and rounded cards
- **Real-time Search**: Filter songs instantly while typing without page reload
- **Animations**: Smooth fade, slide, scale, hover, and ripple transitions
- **Custom Notifications**: Animated, auto-dismissing toast messages
- **Loading States**: Skeleton loaders for initial data fetching
- **Responsive**: Fully adaptable layout for Desktop, Tablet, and Mobile
- **Accessibility**: Semantic HTML and clean component architecture

### Bonus Features Included
- Animated floating background notes
- Custom scrollbar and "Back to Top" button
- Song count counter in the header
- Duration formatting

## 🚀 Installation & Setup

1. **Clone/Download the repository** and navigate to the project root:
   ```bash
   cd playlist-app
   ```

2. **Install all dependencies** for both frontend and backend from the root:
   ```bash
   npm run install-all
   ```

## 💻 How to Run

### Run Full Stack (Concurrent)
From the root directory (`playlist-app/`), run:
```bash
npm start
```
This will start both the backend server (on port 5000) and the Vite frontend development server simultaneously.

### Run Backend Individually
```bash
cd backend
npm run dev
```
Server runs at: `http://localhost:5000`

### Run Frontend Individually
```bash
cd frontend
npm run dev
```

## 📚 API Documentation

| Method | Endpoint | Description | Body / Query |
|--------|----------|-------------|--------------|
| GET | `/` | Welcome message | None |
| GET | `/songs` | Get all songs | `?search=query` (optional) |
| POST | `/songs` | Add a new song | `{ title: "...", artist: "...", duration: 300 }` |
| DELETE | `/songs/:title` | Delete a song | URL Parameter |

## 🔮 Future Improvements
- **Persistent Database**: Integrate MongoDB or PostgreSQL instead of in-memory array
- **Authentication**: Add user accounts and private playlists
- **Audio Player**: Integrate Web Audio API to actually play song previews
- **Drag & Drop**: Allow reordering songs within the playlist
- **Dark Mode**: Add an automatic dark theme toggle
