# StayEZ Backend API

Node.js and Express backend providing RESTful APIs for the StayEZ platform.

## 🚀 Technologies
- **Node.js & Express**: Core routing framework.
- **TypeScript**: Static typing for models and controllers.
- **UUID**: Unique ID tracking for accommodations and booking tickets.

## 📦 Setup
```bash
cd backend
npm install
npm run dev
```

## 🛠️ API Documentation

### 1. `GET /`
Root endpoint verifying server health.
- **Response**: `"Welcome to StayEZ"`

### 2. `GET /rooms`
Fetches all realistic room objects modeled under the `Room` class.
- **Response**: `{ "success": true, "data": [...] }`

### 3. `GET /rooms/search?location=`
Filters available rooms based on location strings. Case insensitive.
- **Query Params**: `location` (e.g., "Goa", "Mumbai")
- **Response**: `{ "success": true, "data": [...] }`

### 4. `POST /reserve`
Accepts a booking payload, validates required user data, attaches a dynamic pricing model, generates a `UUID`, and saves the reservation in-memory.
- **Body**: `{ "roomId": "r1", "name": "John Doe", "email": "john@email.com", "checkIn": "...", "checkOut": "...", "guests": 2 }`
- **Response**: `{ "success": true, "message": "Reservation successful", "data": { ...ticket } }`

### 5. `GET /rooms/featured` & `GET /rooms/popular`
Fetches rooms strictly based on rating values (e.g., `rating >= 4.8` or sorting highest to lowest).

### 6. `GET /rooms/:id`
Fetches details of a single room. Returns `404` if not found.

## 🛡️ Error Handling
- **404 Middleware**: Safely catches unmapped routes.
- **Global Error Handler**: Wraps execution to prevent crashing and returns unified `500` JSON payloads.
