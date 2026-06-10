const express = require('express');
const router = express.Router();
const products = require('../data/products');

// GET /products - Return all products (assignment says exactly 3 sample products)
router.get('/', (req, res) => {
    res.json(products);
});

// GET /products/search?q=
router.get('/search', (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.json([]);
    }
    const lowerQuery = query.toLowerCase();
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(lowerQuery));
    res.json(filteredProducts);
});

module.exports = router;
