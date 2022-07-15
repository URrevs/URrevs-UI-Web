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
      // make list of comments and replies
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

    addNewReplyLocally(state, action: { payload: { newComment: APIComment } }) {
      const index = state.newComments.findIndex((element) => {
        return (
          element._id.toString() ===
          action.payload.newComment.commentId.toString()
        );
      });

      const comment = action.payload.newComment;
      state.newComments[index].replies = [
        comment,
        ...state.newComments[index].replies,
      ];
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

      if (targetReview !== -1) {
        state.newComments[targetReview].liked = action.payload.isLiked;
        action.payload.isLiked
          ? state.newComments[targetReview].likes++
          : state.newComments[targetReview].likes--;
      }
    },

    setReplyIsLiked(
      state,
      action: PayloadAction<{
        commentId: string;
        replyId: string;
        isLiked: boolean;
      }>
    ) {
      console.log(action.payload.commentId, action.payload.replyId);

      const targetComment = state.newComments.findIndex((element) => {
        return element._id.toString() === action.payload.commentId.toString();
      });

      const targetReply = state.newComments[targetComment].replies.findIndex(
        (element) => {
          return element._id.toString() === action.payload.replyId.toString();
        }
      );
      console.log(targetComment, targetReply);

      if (targetReply !== -1) {
        state.newComments[targetComment].replies[targetReply].liked =
          action.payload.isLiked;
        action.payload.isLiked
          ? state.newComments[targetComment].replies[targetReply].likes++
          : state.newComments[targetComment].replies[targetReply].likes--;
      }
    },
  },
});

export const commentsListActions = commentsList.actions;
export const commentsListPostedScreenActions = commentsList.actions;
export const commentsListSliceName = commentsList.name;
export default commentsList;
