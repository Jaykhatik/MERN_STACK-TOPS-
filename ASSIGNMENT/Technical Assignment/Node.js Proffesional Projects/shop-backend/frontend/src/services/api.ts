import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const getProducts = () => api.get('/products');
export const searchProducts = (query: string) => api.get(`/products/search?q=${query}`);
export const getCart = () => api.get('/cart');
export const addToCart = (productId: number, quantity: number) => api.post('/cart/add', { productId, quantity });
export const getCartTotal = () => api.get('/cart/total');
export const removeFromCart = (productId: number) => api.delete(`/cart/${productId}`);
export const clearCart = () => api.post('/cart/clear');
export const getProductsByCategory = (category: string) => api.get(`/products/category/${encodeURIComponent(category)}`);

export default api;
