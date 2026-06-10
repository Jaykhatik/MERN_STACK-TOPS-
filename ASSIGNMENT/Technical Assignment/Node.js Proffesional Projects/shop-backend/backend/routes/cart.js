const express = require('express');
const router = express.Router();
const products = require('../data/products');
let { getCart, setCart, clearCart } = require('../data/cart');

// GET /cart
router.get('/', (req, res) => {
    res.json(getCart());
});

// POST /cart/add
// Implement addToCart(productId, quantity)
router.post('/add', (req, res) => {
    const { productId, quantity } = req.body;
    
    if (!productId || !quantity) {
        return res.status(400).json({ error: "productId and quantity are required" });
    }

    const product = products.find(p => p.id === parseInt(productId));
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    let cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.product.id === parseInt(productId));

    if (existingItemIndex > -1) {
        // Increase quantity
        cart[existingItemIndex].quantity += parseInt(quantity);
        // Remove if quantity drops to 0 or below
        if (cart[existingItemIndex].quantity <= 0) {
            cart.splice(existingItemIndex, 1);
        }
    } else {
        if (parseInt(quantity) > 0) {
            // Add new item
            cart.push({
                product: product,
                quantity: parseInt(quantity)
            });
        }
    }

    setCart(cart);
    res.json(cart);
});

// GET /cart/total
// Calculate subtotal, deliveryCharge = subtotal * 0.05, total = subtotal + deliveryCharge
router.get('/total', (req, res) => {
    const cart = getCart();
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.product.price * item.quantity;
    });

    const deliveryCharge = subtotal * 0.05;
    const total = subtotal + deliveryCharge;

    res.json({
        subtotal,
        deliveryCharge,
        total
    });
});

// DELETE /cart/:productId
router.delete('/:productId', (req, res) => {
    const { productId } = req.params;
    let cart = getCart();
    cart = cart.filter(item => item.product.id !== parseInt(productId));
    setCart(cart);
    res.json(cart);
});

// POST /cart/clear
router.post('/clear', (req, res) => {
    clearCart();
    res.json({ message: "Cart cleared", cart: getCart() });
});

module.exports = router;
