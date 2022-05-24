import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Review from "../models/classes/Review";
import APIAnswer from "../models/interfaces/APIAnswer.model";
import { APIQuestion } from "../models/interfaces/APIQuestion.model";

interface InitialState {
  newReviews: APIQuestion[];
  acceptedAnswer: APIAnswer;
  page: number;
  currentIndex: number;
}

const initialState: InitialState = {
  newReviews: [],
  acceptedAnswer: <APIAnswer>{},
  page: 1,
  currentIndex: 0,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addToLoaddedReviews(state, action: PayloadAction<InitialState>) {
      const loadedReviews = action.payload.newReviews;
      console.log(loadedReviews);

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
      const targetReview = state.acceptedAnswer;

      console.log(action.payload);

      if (targetReview !== null) {
        state.acceptedAnswer.upvoted = action.payload.isLiked;
        action.payload.isLiked
          ? state.acceptedAnswer.upvotes++
          : state.acceptedAnswer.upvotes--;
      }
    },
  },
});

export const questionsActions = questionsSlice.actions;
export const questionsPostedScreenActions = questionsSlice.actions;
export const questionsSliceName = questionsSlice.name;
export default questionsSlice;
