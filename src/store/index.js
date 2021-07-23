import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartInitialState = { cartItems: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    add(state, action) {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.title === action.payload.title
      );
      if (!existingItem) {
        state.cartItems.push({
          title: action.payload.title,
          quantity: 1,
          price: action.payload.price,
          total: action.payload.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.total += action.payload.price;
      }
      state.totalQuantity++;
    },
    remove(state) {
      state.cartItems.reduce();
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export default store;
