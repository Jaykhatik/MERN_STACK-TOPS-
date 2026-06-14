# Poster Maker Backend API

This directory contains the Node.js and Express backend for the Poster Maker application. It provides RESTful APIs for fetching templates, saving custom designs, and handling image uploads securely using Multer.

## 🚀 Technologies Used
- **Node.js & Express**: Core server framework
- **TypeScript**: Static typing for robust code
- **Multer**: Middleware for handling `multipart/form-data` (image uploads)
- **CORS & dotenv**: Security and environment variables
- **UUID**: Unique ID generation for saved designs

## 📦 Setup & Installation

Navigate to the `backend/` directory, install dependencies, and start the server:

```bash
cd backend
npm install
npm run dev      # Starts nodemon development server on port 5000
npm start        # Runs compiled production build (node dist/index.js)
```

## 🛠️ API Documentation

### 1. `GET /templates`
Fetches a list of available premium poster templates.
- **Method**: `GET`
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "t1",
      "name": "Minimalist Event",
      "imageUrl": "...",
      "category": "Event",
      "description": "..."
    }
  ]
}
```

### 2. `POST /design`
Combines a template with user-defined text and background color, saving the design.
- **Method**: `POST`
- **Body (`application/json`)**:
  - `templateId` (string, required): ID of the template
  - `text` (string): User text overlay
  - `backgroundColor` (string): Hex color code
- **Response**: Returns the newly created design object containing a unique `designId`.

### 3. `GET /designs`
Retrieves all previously saved poster designs.
- **Method**: `GET`
- **Response**: Array of saved design objects.

### 4. `DELETE /design/:id`
Deletes a specific saved design.
- **Method**: `DELETE`
- **URL Param**: `id` (string) - The `designId` of the design to delete.
- **Response**: `{ "success": true, "message": "Design deleted successfully" }`

### 5. `POST /upload`
Uploads a custom image (e.g., logo) to the server.
- **Method**: `POST`
- **Body (`multipart/form-data`)**:
  - `image` (file): The image file (PNG/JPG)
- **Response**:
```json
{
  "success": true,
  "url": "/uploads/16543210-logo.png"
}
```

### 6. `POST /background`
Global endpoint to update/log a background color change (demonstration endpoint).
- **Method**: `POST`
- **Body**: `{ "backgroundColor": "#ffffff" }`

## 📂 Project Structure
- `src/controllers/apiController.ts`: Contains the core logic for all endpoints.
- `src/routes/api.ts`: Maps endpoints to their respective controllers.
- `src/middlewares/`: Includes global `errorHandler.ts` and `notFound.ts` catch-all middlewares.
- `uploads/`: Auto-generated folder where Multer stores uploaded images.
