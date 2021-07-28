import { createSlice } from "@reduxjs/toolkit";

const toggleInitialState = { cartIsShown: false, dataFetchInformation: null };

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: toggleInitialState,
  reducers: {
    toggleShowStatus(state) {
      state.cartIsShown = !state.cartIsShown;
    },
    showDataFetchInformation(state, action) {
      state.dataFetchInformation = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const toggleSliceActions = toggleSlice.actions;
