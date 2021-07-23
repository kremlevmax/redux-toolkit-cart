import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart";
import { toggleSlice } from "./toggle";

export const store = configureStore({
  reducer: { cart: cartSlice.reducer, toggle: toggleSlice.reducer },
});

export default store;
