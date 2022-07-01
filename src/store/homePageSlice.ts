import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIQuestion } from "../models/interfaces/APIQuestion.model";
import { APIReview } from "../models/interfaces/APIReview.model";

interface InitialState {
  newReviews: any[];
  page: number;
  currentIndex: number;
}

const initialState: InitialState = {
  newReviews: [],
  page: 1,
  currentIndex: 0,
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    addToLoaddedReviews(state, action: any) {
      const loadedReviews = action.payload.newReviews;
      state.newReviews = [...state.newReviews, ...loadedReviews];
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
    setReviewIsLiked(
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

    setQuestionIsLiked(
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
        state.newReviews[targetReview].upvoted = action.payload.isLiked;
        action.payload.isLiked
          ? state.newReviews[targetReview].upvotes++
          : state.newReviews[targetReview].upvotes--;
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

      console.log(targetReview);

      if (targetReview != -1) {
        state.newReviews[targetReview].shares++;
      }
    },
  },
});

export const homePageActions = homePageSlice.actions;
export const homePageSliceName = homePageSlice.name;
export default homePageSlice;
