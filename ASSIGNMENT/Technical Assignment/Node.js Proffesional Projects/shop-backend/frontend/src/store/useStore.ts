import { create } from 'zustand';
import * as api from '../services/api';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    description: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

interface AppState {
    products: Product[];
    cart: CartItem[];
    cartTotals: { subtotal: number; deliveryCharge: number; total: number };
    searchQuery: string;
    isCartOpen: boolean;
    toastMessage: string | null;
    setSearchQuery: (query: string) => void;
    showToast: (message: string) => void;
    hideToast: () => void;
    fetchProducts: () => Promise<void>;
    searchProducts: (query: string) => Promise<void>;
    fetchCart: () => Promise<void>;
    fetchCartTotals: () => Promise<void>;
    addToCart: (productId: number, quantity: number) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
    setIsCartOpen: (isOpen: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
    products: [],
    cart: [],
    cartTotals: { subtotal: 0, deliveryCharge: 0, total: 0 },
    searchQuery: '',
    isCartOpen: false,
    toastMessage: null,

    setSearchQuery: (query) => set({ searchQuery: query }),
    setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
    showToast: (message) => {
        set({ toastMessage: message });
        setTimeout(() => set({ toastMessage: null }), 3000);
    },
    hideToast: () => set({ toastMessage: null }),

    fetchProducts: async () => {
        try {
            const res = await api.getProducts();
            set({ products: res.data });
        } catch (error) {
            console.error("Error fetching products", error);
        }
    },

    searchProducts: async (query) => {
        try {
            const res = await api.searchProducts(query);
            set({ products: res.data });
        } catch (error) {
            console.error("Error searching products", error);
        }
    },

    fetchCart: async () => {
        try {
            const res = await api.getCart();
            set({ cart: res.data });
        } catch (error) {
            console.error("Error fetching cart", error);
        }
    },

    fetchCartTotals: async () => {
        try {
            const res = await api.getCartTotal();
            set({ cartTotals: res.data });
        } catch (error) {
            console.error("Error fetching cart totals", error);
        }
    },

    addToCart: async (productId, quantity) => {
        try {
            await api.addToCart(productId, quantity);
            const { fetchCart, fetchCartTotals } = useStore.getState();
            await fetchCart();
            await fetchCartTotals();
        } catch (error) {
            console.error("Error adding to cart", error);
        }
    },

    removeFromCart: async (productId) => {
        try {
            await api.removeFromCart(productId);
            const { fetchCart, fetchCartTotals } = useStore.getState();
            await fetchCart();
            await fetchCartTotals();
        } catch (error) {
            console.error("Error removing from cart", error);
        }
    }
}));
