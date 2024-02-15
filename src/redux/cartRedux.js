import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: null,
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    fetchCartItemsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCartItemsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    },
    fetchCartItemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addProductToCart: (state, action) => {
      const productToAdd = action.payload;
      const existingProductIndex = state.products.findIndex(product => product._id === productToAdd._id);
      
      if (existingProductIndex !== -1) {
        // Increment quantity if the product is already in the cart
        state.products[existingProductIndex].quantity += 1;
      } else {
        // Add the product to the cart with quantity 1
        state.products.push({ ...productToAdd, quantity: 1 });
      }
      // Recalculate total and quantity if needed
    },
  },
});

export const { fetchCartItemsStart, fetchCartItemsSuccess, fetchCartItemsFailure, addProductToCart } = cartSlice.actions;

export default cartSlice.reducer;
