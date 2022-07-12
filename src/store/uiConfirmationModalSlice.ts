import { createSlice } from "@reduxjs/toolkit";
interface initialState {
  show: boolean;
  title: string;
  warningText: string;
  yesAction: () => void;
  noAction: () => void;
}
const initialConfirmationState: initialState = {
  show: false,
  title: "",
  warningText: "",
  yesAction: () => {},
  noAction: () => {},
};

const confirmationSlice = createSlice({
  name: "confirmation",
  initialState: initialConfirmationState,
  reducers: {
    showConfirmation: (state, action) => {
      state.show = true;
      state.title = action.payload.title;
      state.warningText = action.payload.warningText;
      state.yesAction = action.payload.yesAction;
      state.noAction = action.payload.noAction;
    },
    hideConfirmation: (state) => {
      state.show = false;
    },
  },
});

export const confirmationActions = confirmationSlice.actions;
export const confirmationSliceName = confirmationSlice.name;
export default confirmationSlice;
