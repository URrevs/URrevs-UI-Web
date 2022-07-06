import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  show: boolean;
  tab: number;
  id: string;
  name: string;
  type: string;
}

const initialPostingSliceState: initialState = {
  show: false,
  tab: 0,
  id: "",
  name: "",
  type: "",
};

const postingModalSlice = createSlice({
  name: "postingModal",
  initialState: initialPostingSliceState,
  reducers: {
    showPostingModal(state, action) {
      state.show = true;
      state.tab = action.payload.tab;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.type = action.payload.type;
    },
    initializePostingModal(state, action) {
      state.tab = action.payload.tab;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.type = action.payload.type;
    },
    switchTab(state, action) {
      state.tab = action.payload.tab;
    },
    hidePostingModal(state) {
      state.show = false;
    },
    togglePostingModal(state, action) {
      state.show = !state.show;
    },
  },
});

export const postingModalActions = postingModalSlice.actions;
export const postingModalSliceName = postingModalSlice.name;
export default postingModalSlice;
