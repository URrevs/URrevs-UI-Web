import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Review from "../models/classes/Review";

interface InitialState {
  newReviews: Review[];
  page: number;
  currentIndex: number;
}

const initialState: InitialState = {
  newReviews: [],
  page: 1,
  currentIndex: 0,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addToLoaddedReviews(state, action: PayloadAction<InitialState>) {
      const loadedReviews = action.payload.newReviews;
      state.newReviews.push(...loadedReviews);
    },
    setIsExpanded(
      state,
      action: PayloadAction<{
        index: number;
        isExpanded: boolean;
      }>
    ) {
      state.newReviews[action.payload.index].isExpanded =
        action.payload.isExpanded;
    },
    increasePage(state) {
      state.page = state.page + 1;
    },
    setIndex(state, action) {
      console.log(action.payload.currentIndex);
      state.currentIndex = action.payload.currentIndex;
    },
    setIsLiked(
      state,
      action: PayloadAction<{
        index: number;
        isLiked: boolean;
      }>
    ) {
      state.newReviews[action.payload.index].liked = action.payload.isLiked;
      action.payload.isLiked
        ? state.newReviews[action.payload.index].likes++
        : state.newReviews[action.payload.index].likes--;
    },
  },
});

export const reviewsActions = reviewsSlice.actions;
export const reviewsSliceName = reviewsSlice.name;
export default reviewsSlice;
