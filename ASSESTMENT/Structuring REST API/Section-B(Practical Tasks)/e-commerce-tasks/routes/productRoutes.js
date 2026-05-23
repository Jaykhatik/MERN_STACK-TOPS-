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