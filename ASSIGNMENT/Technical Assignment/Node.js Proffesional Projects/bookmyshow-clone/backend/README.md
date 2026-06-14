# BookMyShow Backend API

This directory contains the Node.js and Express backend for the BookMyShow clone. It provides a RESTful architecture for managing movies, executing real-time searches, and handling complex movie ticket bookings with AI-assisted seat validation.

## 🚀 Technologies Used
- **Node.js & Express**: Core server framework.
- **TypeScript**: Static typing for robustness.
- **UUID**: Unique ID generation for booking tickets.
- **CORS & Dotenv**: Cross-origin requests and environment management.

## 📦 Setup & Installation

Navigate to the `backend/` directory, install dependencies, and start the server:

```bash
cd backend
npm install
npm run dev      # Starts nodemon development server on port 5000
npm run build    # Compiles TypeScript to the /dist folder
npm start        # Runs compiled production build (node dist/index.js)
```

## 🛠️ API Documentation

### 1. `GET /movies`
Fetches a list of hardcoded, upcoming blockbuster movies.
- **Method**: `GET`
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "m1",
      "title": "Dune: Part Two",
      "language": "English",
      "releaseDate": "2024-03-01",
      "poster": "...",
      "genre": "Sci-Fi/Action",
      "rating": "8.8/10"
    }
  ]
}
```

### 2. `GET /search-movies?q=`
Real-time search endpoint. It accepts a query parameter `q` and performs a case-insensitive `Array.filter()` on the movie titles.
- **Method**: `GET`
- **Query Params**: `q` (string) - The search keyword.
- **Response**: Returns an array of matched movie objects.

### 3. `POST /book-ticket`
The core booking endpoint. It accepts the user's booking choices and applies **AI-Assisted Seat Validation** to ensure a seat hasn't already been taken for a specific movie before confirming the ticket.
- **Method**: `POST`
- **Body (`application/json`)**:
  - `movieId` (string, required): ID of the selected movie.
  - `seatNumber` (string, required): e.g., "A3" or "D5".
  - `userEmail` (string, required): Email for confirmation.
- **Validation**: If `seatNumber` is already found in the `bookedSeats` memory for the provided `movieId`, it throws `400 Bad Request` with message `Seat already booked`.
- **Response**: 
```json
{
  "success": true,
  "message": "Booking confirmed",
  "data": {
    "id": "uuid-string",
    "movieId": "m1",
    "seatNumber": "A3",
    "userEmail": "test@test.com",
    "bookedAt": "2026-06-14T10:00:00.000Z"
  }
}
```

### 4. `GET /bookings`
Retrieves all successful ticket bookings currently held in server memory. Useful for the frontend to paint unavailable seats red.
- **Method**: `GET`
- **Response**: Array of active booking objects.

### 5. `DELETE /booking/:id`
Deletes/Cancels a specific ticket booking.
- **Method**: `DELETE`
- **URL Params**: `id` (string) - The unique booking ID.

## 🛡️ Error Handling
- **Global Error Handler**: Automatically intercepts thrown errors and returns a consistent `500 Internal Server Error` (or other appropriate status) as JSON.
- **404 Middleware**: Safely catches requests to unknown endpoints and returns `{ "success": false, "message": "Not Found - /unknown-route" }`.
