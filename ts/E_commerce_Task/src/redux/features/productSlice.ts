import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "../../services/cartService"; 
import { ProductType } from "../../types/product";


// ✅ State Type
interface ProductState {
  data: ProductType[];
  loading: boolean;
  error: string | null;
}


// ✅ async thunk (API call)
export const fetchProducts = createAsyncThunk<ProductType[]>(
  "products/fetchProducts",
  async () => {
    const data = await getProducts();
    return data;
  }
);

// ✅ Initial State Typed
const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default productSlice.reducer;