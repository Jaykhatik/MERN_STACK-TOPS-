# Insta-clone

A premium, Instagram-inspired social media application built with Node.js, Express, React, Vite, and TypeScript.

## Features
- **Feed**: View posts with dynamic images, captions, and like counts.
- **Profile**: View user stats (followers, following, posts) and bio.
- **Stories**: Horizontal scrolling stories bar with hover animations.
- **Likes**: Double-tap or click heart icon to like, complete with animations and optimistic UI updates.
- **Create Post**: Modal for creating new posts via image URL. Real-time updates feed.
- **Search**: Real-time filtering of feed posts by caption or username.
- **Responsive**: Adapts perfectly to desktop, tablet, and mobile viewing.

## Folder Structure
```
insta-clone/
├── backend/           # Node.js + Express backend
│   ├── src/           # Source code (index.ts, data.ts)
│   ├── package.json   # Dependencies
│   └── tsconfig.json  # TypeScript config
└── frontend/          # React + Vite + TypeScript frontend
    ├── src/           # Components, Types, App logic, Styling
    ├── package.json   # Dependencies
    └── index.html     # Entry point
```

## Installation & Running

### 1. Backend
```bash
cd backend
npm install
npx ts-node src/index.ts
```
The backend runs on `http://localhost:5000`.

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend runs on `http://localhost:5173`.

## API Documentation
- `GET /profile` - Returns the current user's profile.
- `GET /feed` - Returns the list of all posts.
- `POST /post` - Creates a new post. Body: `{ "imageUrl": "...", "caption": "..." }`
- `POST /like` - Increments a post's like count. Body: `{ "postId": "..." }`
