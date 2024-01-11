import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../redux/cartRedux";

export default configureStore({
    reducer: {
        cart: cartSlice.reducer, 
    },
});