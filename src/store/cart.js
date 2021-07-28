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
    putFetchedData(state, action) {
      state.cartItems = action.payload.cartItems;
      state.totalQuantity = action.payload.totalQuantity || 0;
    },
  },
});

export const getCartData = (state) => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await fetch(
        "https://cart-db-c59e3-default-rtdb.firebaseio.com/cartitems.json"
      );
      const data = await response.json();
      return data;
    };

    const data = await getData();
    dispatch(
      cartSliceActions.putFetchedData({
        cartItems: data || [],
        totalQuantity: data != null ? data[0].quantity : 0,
      })
    );
  };
};

export const sendCartData = (cartItems) => {
  return async (dispatch) => {
    dispatch(
      toggleSliceActions.showDataFetchInformation({
        status: "Sending data",
        title: "Sending...",
        message: "Sending data is in process",
      })
    );
    const sendData = async () => {
      const response = await fetch(
        "https://cart-db-c59e3-default-rtdb.firebaseio.com/cartitems.json",
        {
          method: "PUT",
          body: JSON.stringify(cartItems),
        }
      );

      if (!response.ok) {
        throw new Error("An error while fetching data");
      }

      dispatch(
        toggleSliceActions.showDataFetchInformation({
          status: "success",
          title: "Fetching data is done",
          message: "Fetching data is successfully complete",
        })
      );
    };
    try {
      sendData();
    } catch {
      dispatch(
        toggleSliceActions.showDataFetchInformation({
          status: "error",
          title: "Error while fetching data",
          message: "Couldn't connect to server",
        })
      );
    }
  };
};

export const cartSliceActions = cartSlice.actions;
