import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slide/cartSlice";
import userReducer from "./slide/userSlice";


export const store = configureStore({
  reducer: {
    cart :cartReducer,
    user :userReducer
  }
});