import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompareState {
  productId: number;
  compareId: number;
}

const initialCompareState: CompareState = {
  productId: 0, //instead of number get object of specs and make one query for comparedId
  compareId: 0,
};

const compareSlice = createSlice({
  name: "compare",
  initialState: initialCompareState,
  reducers: {
    compare(state, actions: PayloadAction<CompareState>) {
      state.productId = actions.payload.productId;
      state.compareId = actions.payload.compareId;
    },
  },
});

export const compareActions = compareSlice.actions;
export const compareSliceName = compareSlice.name;

export default compareSlice;
