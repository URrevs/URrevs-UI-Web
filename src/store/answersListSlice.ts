import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import APIAnswer from "../models/interfaces/APIAnswer.model";

interface InitialState {
  newComments: APIAnswer[];
  acceptedAnswer: APIAnswer;
}

const initialState: InitialState = {
  newComments: [],
  acceptedAnswer: <APIAnswer>{},
};

const answersList = createSlice({
  name: "answersList",
  initialState,
  reducers: {
    addToLoaddedComments(state, action: PayloadAction<InitialState>) {
      // make list of comments and replies
      const loadedComments = action.payload.newComments;

      state.newComments.push(...loadedComments);
    },

    addAcceptedAnswer(
      state,
      action: { payload: { acceptedAnswer: APIAnswer } }
    ) {
      const answer = { ...action.payload.acceptedAnswer, isAccepted: true };

      state.newComments = [answer, ...state.newComments];
    },

    addNewCommentLocally(
      state,
      action: { payload: { newComment: APIAnswer } }
    ) {
      const comment = action.payload.newComment;
      state.newComments = [comment, ...state.newComments];
    },

    addNewReplyLocally(state, action: { payload: { newComment: APIAnswer } }) {
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
        if (state.newComments[targetReview].isReply) {
          state.newComments[targetReview].liked = action.payload.isLiked;
          action.payload.isLiked
            ? state.newComments[targetReview].likes++
            : state.newComments[targetReview].likes--;
        } else {
          state.newComments[targetReview].upvoted = action.payload.isLiked;
          action.payload.isLiked
            ? state.newComments[targetReview].upvotes++
            : state.newComments[targetReview].upvotes--;
        }
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

    setIsAccepted(
      state,
      action: PayloadAction<{
        id: string;
        isAccepted: boolean;
      }>
    ) {
      state.newComments.forEach((element) => {
        if (element.isAccepted && element._id !== action.payload.id) {
          element.isAccepted = false;
        }
      });

      const targetReview = state.newComments.findIndex((element) => {
        return element._id.toString() === action.payload.id.toString();
      });

      if (targetReview !== -1) {
        state.newComments[targetReview].isAccepted = action.payload.isAccepted;
      }
    },
  },
});

export const answersListActions = answersList.actions;
export const answersListPostedScreenActions = answersList.actions;
export const answersListSliceName = answersList.name;
export default answersList;
