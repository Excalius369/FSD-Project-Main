import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchCartItemsStart, fetchCartItemsSuccess, fetchCartItemsFailure } from './cartRedux';
import { removeProduct } from './cartRedux';



// Ensure consistency in base URL
axios.defaults.baseURL = 'http://localhost:3000/api';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId, thunkAPI) => {
    try {
      thunkAPI.dispatch(fetchCartItemsStart());
      const response = await axios.get(`/cart/user/${userId}`);
      thunkAPI.dispatch(fetchCartItemsSuccess(response.data));
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(fetchCartItemsFailure(error.message));
      throw error; // Throw the error to propagate it correctly
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      const response = await axios.post('/cart', { user: userId, product: productId, quantity });
      return response.data;
    } catch (error) {
      throw error; // Throw the error to propagate it correctly
    }
  }
);

// Action creators
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (productId, thunkAPI) => {
    try {
      await axios.delete(`/cart/${productId}`);
      thunkAPI.dispatch(removeProduct(productId)); // Dispatch removeProduct action to update Redux store state immediately
      return productId; // Return the productId for removal from state
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ cartItemId, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`/cart/${cartItemId}`, updatedData);
      return response.data;
    } catch (error) {
      throw error; // Throw the error to propagate it correctly
    }
  }
);


