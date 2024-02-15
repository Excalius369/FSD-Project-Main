import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { fetchCartItemsStart, fetchCartItemsSuccess, fetchCartItemsFailure } from './cartRedux';  // Add this import statement

const initialState = {
  isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true',
  isAdmin: false,
  cart: {
    loading: false,
    error: null,
    products: [],
    quantity: 0,
    total: 0,
  },
};

// Define getUserId function to retrieve user ID from session storage
const getUserId = () => {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    console.error('User ID not found in session storage.');
    return null;
  }
  return userId;
};

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId, thunkAPI) => {
    try {
      thunkAPI.dispatch(fetchCartItemsStart());  // Dispatch the start action
      const response = await axios.get(`/api/cart/user/${userId}`);
      thunkAPI.dispatch(fetchCartItemsSuccess(response.data));  // Dispatch the success action
    } catch (error) {
      thunkAPI.dispatch(fetchCartItemsFailure(error.message));  // Dispatch the failure action
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
  initialState: initialState,
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
export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async ({ userId, productId }) => {
    try {
      // Make a POST request to add the product to the cart
      const response = await axios.post(`/api/cart`, {
        user: userId,
        product: productId,
        quantity: 1, // Assuming the default quantity is 1
      });
      return response.data; // Return the updated cart data
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const fetchCart = () => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    if (auth.isLoggedIn) {
      const userId = getUserId(); // Retrieve the userId
      if (userId) { // Check if userId is not null
        dispatch(fetchCartItems(userId)); // Pass the userId to fetchCartItems
      } else {
        console.error('User ID is undefined.');
      }
    }
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};
export const selectCart = (state) => state.cart;

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});
