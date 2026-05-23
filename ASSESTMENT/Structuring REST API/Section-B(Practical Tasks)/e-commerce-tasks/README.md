# E-Commerce Product & Category API

<!-- 

Section B: Practical Tasks
1. Category & Product CRUD: Develop an Express.js server with distinct route files
for /categories and /products. Implement standard HTTP methods—GET,
POST, PUT, and DELETE—to manage the catalog structure.------------------------------------------------completed
2. MongoDB Integration: Establish a connection using Mongoose to define
schemas for both Categories and Products. Use ref and populate() to create
a relational link between a product and its specific category.----------------------------------------completed
3. JWT Admin Authentication: Protect sensitive routes (like adding or deleting
products) using JSON Web Tokens (JWT). Create a middleware to verify the
token in the request header and check for "admin" privileges before granting
access.
4. Multer Image Upload: Integrate the Multer middleware to handle
multipart/form-data. Configure storage settings to save product images to
a local /uploads folder and store the resulting file path in the MongoDB
document.
 -->


## Project Overview

This project is a RESTful E-Commerce API built using Express.js, MongoDB, and Mongoose.

The application provides:

* Product CRUD APIs
* Category CRUD APIs
* MongoDB integration using Mongoose
* Relationship between Products and Categories using `ref`
* Data fetching using `populate()`
* RESTful API architecture

This project demonstrates a professional backend structure commonly used in real-world applications.

---

# Technologies Used

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| Node.js    | JavaScript runtime              |
| Express.js | Backend framework               |
| MongoDB    | NoSQL database                  |
| Mongoose   | MongoDB ODM                     |
| Nodemon    | Auto restart development server |
| Postman    | API testing                     |

---

# Task 1: Category & Product CRUD API

## Objective

Develop an Express.js server with:

* Separate route files for Products and Categories
* CRUD operations using:

  * GET
  * POST
  * PUT
  * DELETE

---

# Step 1: Create Project Folder

```bash
mkdir ecommerce-api
cd ecommerce-api
```

---

# Step 2: Initialize Node.js Project

```bash
npm init -y
```

This creates a `package.json` file.

---

# Step 3: Install Required Packages

## Install Express

```bash
npm install express
```

## Install Nodemon

```bash
npm install --save-dev nodemon
```

---

# Step 4: Create Project Structure

```bash
ecommerce-api/
│
├── routes/
│   ├── productRoutes.js
│   └── categoryRoutes.js
│
├── server.js
├── package.json
```

---

# Step 5: Create Express Server

## server.js

```js
const express = require("express");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

# Step 6: Create Product Routes

## routes/productRoutes.js

```js
const express = require("express");

const router = express.Router();

let products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
];

// GET All Products
router.get("/", (req, res) => {
  res.json(products);
});

// GET Single Product
router.get("/:id", (req, res) => {
  const product = products.find(
    (p) => p.id == req.params.id
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});

// POST Create Product
router.post("/", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product created",
    product: newProduct,
  });
});

// PUT Update Product
router.put("/:id", (req, res) => {
  const product = products.find(
    (p) => p.id == req.params.id
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;

  res.json({
    message: "Product updated",
    product,
  });
});

// DELETE Product
router.delete("/:id", (req, res) => {
  products = products.filter(
    (p) => p.id != req.params.id
  );

  res.json({
    message: "Product deleted",
  });
});

module.exports = router;
```

---

# Step 7: Create Category Routes

## routes/categoryRoutes.js

```js
const express = require("express");

const router = express.Router();

let categories = [
  {
    id: 1,
    name: "Electronics",
  },
];

// GET All Categories
router.get("/", (req, res) => {
  res.json(categories);
});

// GET Single Category
router.get("/:id", (req, res) => {
  const category = categories.find(
    (c) => c.id == req.params.id
  );

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.json(category);
});

// POST Create Category
router.post("/", (req, res) => {
  const newCategory = {
    id: categories.length + 1,
    name: req.body.name,
  };

  categories.push(newCategory);

  res.status(201).json({
    message: "Category created",
    category: newCategory,
  });
});

// PUT Update Category
router.put("/:id", (req, res) => {
  const category = categories.find(
    (c) => c.id == req.params.id
  );

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  category.name = req.body.name || category.name;

  res.json({
    message: "Category updated",
    category,
  });
});

// DELETE Category
router.delete("/:id", (req, res) => {
  categories = categories.filter(
    (c) => c.id != req.params.id
  );

  res.json({
    message: "Category deleted",
  });
});

module.exports = router;
```

---

# Task 1 API Testing

## Run Server

```bash
node server.js
```

OR

```bash
npx nodemon server.js
```

---

# API Endpoints

## Product APIs

| Method | Endpoint      | Purpose            |
| ------ | ------------- | ------------------ |
| GET    | /products     | Get all products   |
| GET    | /products/:id | Get single product |
| POST   | /products     | Create product     |
| PUT    | /products/:id | Update product     |
| DELETE | /products/:id | Delete product     |

---

## Category APIs

| Method | Endpoint        | Purpose             |
| ------ | --------------- | ------------------- |
| GET    | /categories     | Get all categories  |
| GET    | /categories/:id | Get single category |
| POST   | /categories     | Create category     |
| PUT    | /categories/:id | Update category     |
| DELETE | /categories/:id | Delete category     |

---

# Task 2: MongoDB Integration Using Mongoose

## Objective

Upgrade the project by:

* Connecting MongoDB
* Using Mongoose schemas
* Creating Product & Category models
* Using `ref`
* Using `populate()`
* Creating relational structure

---

# Step 1: Install Mongoose

```bash
npm install mongoose
```

---

# Step 2: Update Project Structure

```bash
ecommerce-api/
│
├── config/
│   └── db.js
│
├── models/
│   ├── Category.js
│   └── Product.js
│
├── routes/
│   ├── categoryRoutes.js
│   └── productRoutes.js
│
├── server.js
├── package.json
```

---

# Step 3: Create MongoDB Connection

## config/db.js

```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/ecommerceDB"
    );

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

# Step 4: Update server.js

```js
const express = require("express");

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

# Step 5: Create Category Schema

## models/Category.js

```js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Category",
  categorySchema
);
```

---

# Step 6: Create Product Schema

## models/Product.js

```js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);
```

---

# Understanding ref

```js
ref: "Category"
```

This creates a relationship between:

* Product
* Category

Each product stores the ObjectId of a category.

---

# Step 7: Update Category Routes

## routes/categoryRoutes.js

```js
const express = require("express");

const router = express.Router();

const Category = require("../models/Category");

// CREATE Category
router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET All Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
```

---

# Step 8: Update Product Routes

## routes/productRoutes.js

```js
const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

// CREATE Product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET All Products with Category
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category");

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
```

---

# Understanding populate()

```js
.populate("category")
```

This replaces category ObjectId with complete category data.

---

# Without populate()

```json
{
  "name": "Laptop",
  "category": "6650ab1234xyz"
}
```

---

# With populate()

```json
{
  "name": "Laptop",
  "price": 50000,
  "category": {
    "_id": "6650ab1234xyz",
    "name": "Electronics"
  }
}
```

---

# Step 9: Start MongoDB

Ensure MongoDB server is running.

If using MongoDB Compass:

```text
mongodb://127.0.0.1:27017
```

---

# Step 10: Run Project

## Run Using Node

```bash
node server.js
```

## Run Using Nodemon

```bash
npx nodemon server.js
```

---

# Expected Output

```bash
MongoDB Connected
Server running on port 3000
```

---

# Testing APIs Using Postman

## Create Category

### POST

```http
http://localhost:3000/categories
```

### Body

```json
{
  "name": "Electronics"
}
```

---

# Create Product

### POST

```http
http://localhost:3000/products
```

### Body

```json
{
  "name": "Laptop",
  "price": 50000,
  "category": "PASTE_CATEGORY_ID"
}
```

---

# Get Products with Category

### GET

```http
http://localhost:3000/products
```

---

# Final Data Flow

```text
Category Created
      ↓
Category ID Stored in Product
      ↓
populate() Fetches Category Data
      ↓
Frontend Receives Complete Product + Category Information
```

---

# Advantages of This Architecture

| Feature              | Benefit                          |
| -------------------- | -------------------------------- |
| Separate Route Files | Modular structure                |
| MongoDB Integration  | Permanent data storage           |
| Mongoose Schemas     | Structured data modeling         |
| ref                  | Relationship between collections |
| populate()           | Fetch related data easily        |
| REST APIs            | Industry-standard architecture   |
| Express Middleware   | Better scalability               |

---

# Real-World Applications

This backend architecture is commonly used in:

* E-Commerce applications
* Food delivery systems
* Social media platforms
* Inventory management systems
* Admin dashboards

---

# Conclusion

This project demonstrates how to build a professional RESTful E-Commerce API using:

* Node.js
* Express.js
* MongoDB
* Mongoose

The application supports:

* Product CRUD
* Category CRUD
* Database integration
* Relational data handling using ref and populate()

This structure follows modern backend development practices and provides a scalable foundation for real-world applications.
