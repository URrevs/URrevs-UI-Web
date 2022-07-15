import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  show: boolean;
  message: string;
  showActionBtn: boolean;
  actionBtnText: string;
  actionNavPath: string;
  actionBtnFunction: () => void;
  newTab: boolean;
}

const initialSnackbarSliceState: initialState = {
  show: false,
  message: "",
  showActionBtn: false,
  actionBtnText: "",
  actionNavPath: "",
  actionBtnFunction: () => {},
  newTab: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: initialSnackbarSliceState,
  reducers: {
    showSnackbar(state, action) {
      state.show = true;
      state.message = action.payload.message;
      state.showActionBtn = action.payload.showActionBtn;
      state.actionBtnText = action.payload.actionBtnText;
      state.actionBtnFunction = action.payload.actionBtnFunction;
      state.actionNavPath = action.payload.actionNavPath;
      state.newTab = action.payload.newTab;
    },
    hideSnackbar(state) {
      state.show = false;
    },
  },
});

export const snackbarActions = snackbarSlice.actions;
export const snackbarSliceName = snackbarSlice.name;
export default snackbarSlice;
