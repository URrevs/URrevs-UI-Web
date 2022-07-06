import { createSlice } from "@reduxjs/toolkit";

interface initiaMenuSliceState {
  show: boolean;
}

const initialState: initiaMenuSliceState = {
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
export const MenuSliceName = menuSlice.name;
export default menuSlice;
