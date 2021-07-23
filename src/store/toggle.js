import { createSlice } from "@reduxjs/toolkit";

const toggleInitialState = { cartIsShown: false };

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: toggleInitialState,
  reducers: {
    toggleShowStatus(state) {
      state.cartIsShown = !state.cartIsShown;
    },
  },
});

export const toggleSliceActions = toggleSlice.actions;
