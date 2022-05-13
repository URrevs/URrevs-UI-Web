import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import APIComment from "../models/interfaces/APIComment.model";

interface InitialState {
  newComments: APIComment[];
}

const initialState: InitialState = {
  newComments: [],
};

const commentsList = createSlice({
  name: "commentsList",
  initialState,
  reducers: {
    addToLoaddedComments(state, action: PayloadAction<InitialState>) {
      const loadedComments = action.payload.newComments;
      state.newComments.push(...loadedComments);
    },
    addNewCommentLocally(
      state,
      action: { payload: { newComment: APIComment } }
    ) {
      const comment = action.payload.newComment;
      state.newComments = [comment, ...state.newComments];
    },
    clearComments(state) {
      state.newComments = [];
    },

    setIsLiked(
      state,
      action: PayloadAction<{
        id: string;
        isLiked: boolean;
      }>
    ) {
      const targetReview = state.newComments.findIndex((element) => {
        return element._id.toString() === action.payload.id.toString();
      });

      if (targetReview != -1) {
        state.newComments[targetReview].liked = action.payload.isLiked;
        action.payload.isLiked
          ? state.newComments[targetReview].likes++
          : state.newComments[targetReview].likes--;
      }
    },
  },
});

export const commentsListActions = commentsList.actions;
export const commentsListPostedScreenActions = commentsList.actions;
export const commentsListSliceName = commentsList.name;
export default commentsList;
