import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Review from "../models/classes/Review";
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
  },
});

export const questionsActions = questionsSlice.actions;
export const questionsPostedScreenActions = questionsSlice.actions;
export const questionsSliceName = questionsSlice.name;
export default questionsSlice;
