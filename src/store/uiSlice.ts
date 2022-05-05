import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  registration: boolean;
}

const initialState: initialState = {
  registration: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleRegistration(state) {
      state.registration = !state.registration;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiSliceName = uiSlice.name;
export default uiSlice;
