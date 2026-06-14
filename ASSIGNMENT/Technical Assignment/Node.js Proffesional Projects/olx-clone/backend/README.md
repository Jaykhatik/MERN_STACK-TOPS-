# OLX Clone Backend API

Node.js and Express backend providing RESTful APIs for the OLX clone application, including robust file handling.

## 🚀 Technologies
- **Node.js & Express**: Core framework
- **TypeScript**: Static typing
- **Multer**: Handling `multipart/form-data`
- **UUID**: Unique ID tracking for products and files.

## 📦 Setup
```bash
cd backend
npm install
npm run dev
```

## 🛠️ API Documentation

### 1. `GET /products`
Fetches a list of hardcoded items available on the marketplace.
- **Response**: `{ "success": true, "data": [...] }`

### 2. `POST /add-product`
Creates a new listing.
- **Body**: `{ "title": "iPhone", "category": "Mobiles", "price": 500, ... }`
- **Response**: Returns the updated memory store of products.

### 3. `GET /products/:id` & `DELETE /products/:id`
Fetch details of a single product or entirely remove the listing. Returns 404 if not found.

### 4. `POST /upload`
Handles image uploads strictly for new listings.
**Security Implementations**:
- **UUID Renaming**: `file.originalname` is discarded. Files are assigned a `uuidv4()` to prevent Directory Traversal attacks and filename collisions.
- **MIME Type Filter**: Strict checking ensures ONLY `image/jpeg, png, webp, gif` are uploaded. Blocks disguised malicious scripts.
- **5MB File Size Limit**: Prevents Denial of Service (DoS) attacks from massive, resource-hogging file uploads.
- **Response**: `{ "success": true, "url": "/uploads/uuid.png" }`

### 5. `GET /search?q=`
Real-time filtering of products matching the query against `title`, `description`, or `category`.
