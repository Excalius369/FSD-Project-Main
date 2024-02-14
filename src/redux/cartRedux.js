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
        // Additional reducers can be defined here
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
        addProduct: (state, action) => {
            // Add logic to add a product to the cart
            const productToAdd = action.payload;
            // Check if the product is already in the cart
            const existingProduct = state.products.find(product => product.id === productToAdd.id);
            if (existingProduct) {
              // Increment quantity if the product is already in the cart
              existingProduct.quantity += 1;
            } else {
              // Add the product to the cart with quantity 1
              state.products.push({ ...productToAdd, quantity: 1 });
            }
            // Recalculate total and quantity if needed
          },
        },
      });
      export const { fetchCartItemsStart, fetchCartItemsSuccess, fetchCartItemsFailure, addProduct } = cartSlice.actions;
export default cartSlice.reducer;
