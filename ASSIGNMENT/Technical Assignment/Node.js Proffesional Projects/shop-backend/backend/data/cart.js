// In-memory cart
let cart = [];

module.exports = {
    getCart: () => cart,
    setCart: (newCart) => { cart = newCart; },
    clearCart: () => { cart = []; }
};
