import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchCartItemsStart, fetchCartItemsSuccess, fetchCartItemsFailure } from './cartRedux';

// Ensure consistency in base URL
axios.defaults.baseURL = 'http://localhost:3000/api';


export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId, thunkAPI) => {
    try {
      thunkAPI.dispatch(fetchCartItemsStart());
      const response = await axios.get(`/cart/user/${userId}`);
      
      // Assuming the response structure is an object with a 'products' key containing an array of products
      thunkAPI.dispatch(fetchCartItemsSuccess(response.data.products)); // Dispatch only products array
    } catch (error) {
      thunkAPI.dispatch(fetchCartItemsFailure(error.message));
    }
  }
);


export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      const response = await axios.post('/cart', { userId, productId, quantity });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (cartItemId, thunkAPI) => {
    try {
      await axios.delete(`/cart/${cartItemId}`);
      return cartItemId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
