# TechStore Backend

This is the backend server for the TechStore E-Commerce application. It provides a robust RESTful API to serve products, handle real-time search filtering, and manage shopping cart calculations.

## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **Cors**

## 🏗️ How It Works

The backend runs as a standalone Express server and manages all the business logic for the E-Commerce platform.

1. **In-Memory Data Store**: Data is stored temporarily in arrays within `data/cart.js` and `data/products.js`. This allows the application to function immediately without requiring a database connection, fulfilling the assignment requirements.
2. **Custom Middleware**: 
   - A global `logger.js` captures and formats the current timestamp, HTTP method, and requested URL for every incoming request.
   - A global `errorHandler.js` acts as a safety net, returning consistent 500 JSON responses if any unhandled errors occur.
3. **Cart Business Logic**: The backend handles all the heavy lifting. When requesting the cart total (`/cart/total`), the server calculates the subtotal, adds a strict 5% delivery charge, and computes the exact final total, sending the formatted payload back to the frontend.

## 🚀 Running Individually

To run the backend individually without using the root concurrent script:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   node server.js
   ```

The backend API will be accessible at `http://localhost:5000`.

---

## 📡 API Documentation

Base URL: `http://localhost:5000`

### 1. Products API

#### `GET /products`
Retrieves exactly 3 premium sample products.
- **Response**: `200 OK`
```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "price": 134900,
    "image": "...",
    "category": "Phones",
    "rating": 4.8,
    "description": "..."
  }
]
```

#### `GET /products/search?q={query}`
Searches and filters products by name (case-insensitive).
- **Query Parameter**: `q` (string) - The search term.
- **Response**: `200 OK`
```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    ...
  }
]
```

### 2. Cart API

#### `GET /cart`
Retrieves all items currently in the cart.
- **Response**: `200 OK`
```json
[
  {
    "product": { ...productData },
    "quantity": 1
  }
]
```

#### `POST /cart/add`
Adds a product to the cart or increases its quantity if it already exists. Sending a negative quantity decreases the quantity, and automatically removes the item from the cart completely if the resulting quantity reaches 0 or below.
- **Body**:
```json
{
  "productId": 1,
  "quantity": 1
}
```
- **Response**: `200 OK` (Returns the updated cart array)

#### `GET /cart/total`
Calculates and returns the cart subtotal, a 5% delivery charge, and the final total. Similar to Zomato bill calculations.
- **Response**: `200 OK`
```json
{
  "subtotal": 134900,
  "deliveryCharge": 6745,
  "total": 141645
}
```

#### `DELETE /cart/:productId`
Removes a specific product from the cart completely.
- **URL Parameter**: `productId` (number)
- **Response**: `200 OK` (Returns the updated cart array)

#### `POST /cart/clear`
Empties the entire cart.
- **Response**: `200 OK`
```json
{
  "message": "Cart cleared",
  "cart": []
}
```
