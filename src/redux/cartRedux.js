import { createSlice } from "@reduxjs/toolkit";
import { removeCartItem } from './cartActions'; // Import removeCartItem action creator

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

 removeProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product.product._id !== productId
      );
    },
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
        // Product already exists in the cart, increase its quantity
        state.products[existingProductIndex].quantity += 1;
      } else {
        // Product doesn't exist in the cart, add it with quantity 1
        state.products.push({ ...productToAdd, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const productToUpdate = state.products.find(
        (product) => product.product._id === productId
      );
      if (productToUpdate) {
        productToUpdate.quantity = newQuantity;
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product.product._id !== productId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Remove the deleted product from state
        state.products = state.products.filter(product => product._id !== action.payload);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const {
  fetchCartItemsStart,
  fetchCartItemsSuccess,
  fetchCartItemsFailure,
  addProductToCart,
  updateQuantity,
  removeProduct
} = cartSlice.actions;

export default cartSlice.reducer;
