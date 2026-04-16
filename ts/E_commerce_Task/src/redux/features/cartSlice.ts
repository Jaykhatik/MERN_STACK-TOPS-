import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import ls from '../../utils/secureStorage';

// ✅ Cart Item Type
export interface CartItem {
    productId: number;
    userId: number;
    quantity: number;
}

// ✅ State Type
export interface CartState {
    carts: CartItem[];
}

// ✅ Payload Types
export interface CartPayload {
    productId: number;
    userId: number;
}
export interface UpdateQuantityPayload extends CartPayload {
    delta: number;
}

// ✅ Load from storage
const loadCartFromStorage = (): CartItem[] => {
    const data = ls.get("localCart");
    return data || [];
}

// ✅ Initial State
const initialState: CartState = {
    carts: loadCartFromStorage(),
}


const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.carts = action.payload;
        },

        addToCart: (state, action: PayloadAction<CartPayload>) => {
            const { productId, userId } = action.payload;

            const existing = state.carts.find(
                (cart) =>
                    cart.productId === productId && cart.userId === userId
            );

            if (existing) {
                existing.quantity += 1;
            } else {
                state.carts.push({
                    productId,
                    userId,
                    quantity: 1,
                });
            }

            // sync with sessionStorage
            ls.set("localCart", state.carts);
        },
        removeFromCart: (state, action: PayloadAction<CartPayload>) => {
            const { productId, userId } = action.payload;

            state.carts = state.carts.filter(
                (cart) => !(cart.productId === productId && cart.userId === userId)
            );

            ls.set("localCart", state.carts);
        },
        updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
            const { productId, userId, delta } = action.payload;

            state.carts = state.carts.map((cart) => {
                if (cart.productId === productId && cart.userId === userId) {
                    const newQty = cart.quantity + delta;
                    return { ...cart, quantity: newQty > 0 ? newQty : 1 };
                }
                return cart;
            });

            ls.set("localCart", state.carts);
        },
    },
});

export const { setCart, addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
