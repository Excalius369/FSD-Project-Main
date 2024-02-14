import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  auth: {
    isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true',
    isAdmin: sessionStorage.getItem('isAdmin') === 'true', // Update isAdmin state based on sessionStorage
  },
  cart: {
    loading: false,
    error: null,
    products: [],
    quantity: 0,
    total: 0,
  },
};

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/cart/user/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState.cart,
  reducers: {
    // Additional reducers can be defined here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
        // Calculate quantity and total here if needed
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState.auth,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setLoggedOut(state) {
      state.isLoggedIn = false;
    },
    setAdmin(state, action) {
      state.isAdmin = action.payload;
    },
  },
});

export const { setLoggedIn, setLoggedOut, setAdmin } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectCart = (state) => state.cart;

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      username,
      password,
    });
    const data = response.data;
    sessionStorage.setItem('isLoggedIn', true);
    sessionStorage.setItem('isAdmin', data.isAdmin);
    dispatch(setLoggedIn(true));
    dispatch(setAdmin(data.isAdmin));
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    // Perform logout logic, clear sessionStorage, and dispatch setLoggedOut
    sessionStorage.clear();
    dispatch(setLoggedOut());
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const fetchCart = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    if (auth.isLoggedIn) {
      dispatch(fetchCartItems());
    }
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});
