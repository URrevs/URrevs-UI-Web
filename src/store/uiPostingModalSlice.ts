// import { createSlice } from "@reduxjs/toolkit";

// interface initialState {
//   show: boolean;
//   message: string;
//   showActionBtn: boolean;
//   actionBtnText: string;
//   actionBtnFunction: () => void;
// }

// const initialState: initialState = {
//   show: false,
//   message: "",
//   showActionBtn: false,
//   actionBtnText: "",
//   actionBtnFunction: () => {},
// };

// const snackbarSlice = createSlice({
//   name: "snackbar",
//   initialState: initialState,
//   reducers: {
//     showSnackbar(state, action) {
//       state.show = true;
//       state.message = action.payload.message;
//       state.showActionBtn = action.payload.showActionBtn;
//       state.actionBtnText = action.payload.actionBtnText;
//       state.actionBtnFunction = action.payload.actionBtnFunctoin;
//     },
//     hideSnackbar(state) {
//       state.show = false;
//     },
//   },
// });

// export const snackbarActions = snackbarSlice.actions;
// export const snackbarSliceName = snackbarSlice.name;
// export default snackbarSlice;
