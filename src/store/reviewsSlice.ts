import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIReview } from "../models/interfaces/APIReview.model";

interface InitialState {
  newReviews: APIReview[];
  page: number;
  currentIndex: number;
  reset: boolean;
}

const initialState: InitialState = {
  newReviews: [],
  page: 1,
  currentIndex: 0,
  reset: false,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addToLoaddedReviews(state, action: PayloadAction<InitialState>) {
      const loadedReviews = action.payload.newReviews;
      state.newReviews.push(...loadedReviews);
    },
    clearReviews(state) {
      state.newReviews = [];
      state.reset = !state.reset;
    },
    // setIsExpanded(
    //   state,
    //   action: PayloadAction<{
    //     index: number;
    //     isExpanded: boolean;
    //   }>
    // ) {
    //   state.newReviews[action.payload.index].isExpanded =
    //     action.payload.isExpanded;
    // },
    increasePage(state) {
      state.page = state.page + 1;
    },
    setIndex(state, action) {
      state.currentIndex = action.payload.currentIndex;
    },
    setIsLiked(
      state,
      action: PayloadAction<{
        id: string;
        isLiked: boolean;
      }>
    ) {
      const targetReview = state.newReviews.findIndex((element) => {
        return element._id.toString() === action.payload.id.toString();
      });

      if (targetReview !== -1) {
        state.newReviews[targetReview].liked = action.payload.isLiked;
        action.payload.isLiked
          ? state.newReviews[targetReview].likes++
          : state.newReviews[targetReview].likes--;
      }
    },

    increaseShareCounter(
      state,
      action: PayloadAction<{
        id: string;
      }>
    ) {
      const targetReview = state.newReviews.findIndex((element) => {
        return element._id.toString() === action.payload.id.toString();
      });

      if (targetReview !== -1) {
        state.newReviews[targetReview].shares++;
      }
    },

    setReviewAsVerified(
      state,
      action: PayloadAction<{
        id: string;
        verificationRatio: number;
      }>
    ) {
      const targetReview = state.newReviews.findIndex((element) => {
        return element._id.toString() === action.payload.id.toString();
      });

      if (targetReview !== -1) {
        state.newReviews[targetReview].verificationRatio =
          action.payload.verificationRatio;
      }
    },
  },
});

export const reviewsActions = reviewsSlice.actions;
export const reviewsPostedScreenActions = reviewsSlice.actions;
export const reviewsSliceName = reviewsSlice.name;
export default reviewsSlice;
