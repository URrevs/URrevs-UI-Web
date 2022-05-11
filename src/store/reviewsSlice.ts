import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Review from "../models/classes/Review";
import { APIReview } from "../models/interfaces/APIReview.model";

interface InitialState {
  newReviews: APIReview[];
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
    clearReviews(state) {
      state.newReviews = [];
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
      console.log(action.payload.currentIndex);
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

      if (targetReview != -1) {
        state.newReviews[targetReview].liked = action.payload.isLiked;
        action.payload.isLiked
          ? state.newReviews[targetReview].likes++
          : state.newReviews[targetReview].likes--;
      }
    },
  },
});

export const reviewsActions = reviewsSlice.actions;
export const reviewsPostedScreenActions = reviewsSlice.actions;
export const reviewsSliceName = reviewsSlice.name;
export default reviewsSlice;
