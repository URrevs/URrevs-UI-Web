import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  show: boolean;
}

const initialState: initialState = {
  show: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,
  reducers: {
    showMenu(state, action) {
      state.show = true;
    },
    hideMenu(state) {
      state.show = false;
    },
  },
});

export const menuActions = menuSlice.actions;
export const snackbarSliceName = menuSlice.name;
export default menuSlice;
