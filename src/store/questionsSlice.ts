import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APIQuestion } from "../models/interfaces/APIQuestion.model";

interface InitialState {
  newReviews: APIQuestion[];
  page: number;
  currentIndex: number;
}

const initialState: InitialState = {
  newReviews: [],
  page: 1,
  currentIndex: 0,
};

const questionsSlice = createSlice({
  name: "questions",
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
        state.newReviews[targetReview].upvoted = action.payload.isLiked;
        action.payload.isLiked
          ? state.newReviews[targetReview].upvotes++
          : state.newReviews[targetReview].upvotes--;
      }
    },

    voteForAcceptedAnswer(
      state,
      action: PayloadAction<{
        id: string;
        isLiked: boolean;
      }>
    ) {
      const targetReview = state.newReviews.findIndex((element) => {
        return (
          element.acceptedAns._id.toString() === action.payload.id.toString()
        );
      });

      if (targetReview !== -1) {
        state.newReviews[targetReview].acceptedAns.upvoted =
          action.payload.isLiked;
        action.payload.isLiked
          ? state.newReviews[targetReview].acceptedAns.upvotes++
          : state.newReviews[targetReview].acceptedAns.upvotes--;
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
  },
});

export const questionsActions = questionsSlice.actions;
export const questionsPostedScreenActions = questionsSlice.actions;
export const questionsSliceName = questionsSlice.name;
export default questionsSlice;
