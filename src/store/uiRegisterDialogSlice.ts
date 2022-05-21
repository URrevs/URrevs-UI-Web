import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  registration: boolean;
}

const initialState: initialState = {
  registration: false,
};

const regDialogSlice = createSlice({
  name: "regDialog",
  initialState: initialState,
  reducers: {
    toggleRegistration(state) {
      state.registration = !state.registration;
    },
  },
});

export const regDialogActions = regDialogSlice.actions;
export const uiSliceName = regDialogSlice.name;
export default regDialogSlice;
