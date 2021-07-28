import { createSlice } from "@reduxjs/toolkit";
import { toggleSliceActions } from "./toggle";

const cartInitialState = { cartItems: [], totalQuantity: 0 };

export const cartSlice = createSlice({
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
    remove(state, action) {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.title === action.payload.title
      );
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.title !== action.payload.title
        );
      } else {
        existingItem.quantity--;
        existingItem.total -= action.payload.price;
      }
      state.totalQuantity--;
    },
  },
});

const fetchData = (cartItems) => {
  return async (dispatch) => {
    dispatch(
      toggleSliceActions.showDataFetchInformation({
        status: "Sending data",
        title: "Sending...",
        message: "Sending data in process",
      })
    );
  };
  const sendData = async () => {
    const response = await fetch(
      "https://cart-db-c59e3-default-rtdb.firebaseio.com/",
      {
        method: "PUT",
        body: JSON.stringify(cartItems),
      }
    );
  };
};

export const cartSliceActions = cartSlice.actions;
