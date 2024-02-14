import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchCartItemsStart, fetchCartItemsSuccess, fetchCartItemsFailure } from './cartRedux';

axios.defaults.baseURL = 'http://localhost:3000/api/cart'; // Replace with your actual backend URL

export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (userId, thunkAPI) => {
      try {
        thunkAPI.dispatch(fetchCartItemsStart());
        const response = await axios.get(`/user/${userId}`);
        thunkAPI.dispatch(fetchCartItemsSuccess(response.data));
      } catch (error) {
        thunkAPI.dispatch(fetchCartItemsFailure(error.message));
      }
    }
  );

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      const response = await axios.post('/api/cart', { user_id: userId, product_id: productId, quantity });
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
      await axios.delete(`/api/cart/${cartItemId}`);
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
      const response = await axios.put(`/api/cart/${cartItemId}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
