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
      let newList: APIAnswer[] = [];
      const loadedComments = action.payload.newComments;

      loadedComments.forEach((comment) => {
        newList.push({ ...comment, isReply: false });
        if (comment.replies) {
          comment.replies.forEach((reply) => {
            newList.push({ ...reply, commentId: comment._id, isReply: true });
          });
        }
      });
      state.newComments.push(...newList);
    },

    addAcceptedAnswer(
      state,
      action: { payload: { acceptedAnswer: APIAnswer } }
    ) {
      const answer = { ...action.payload.acceptedAnswer, isAccepted: true };
      console.log(answer);
      let answerReplies: any = [];
      answer.replies.forEach((reply, i) => {
        console.log(reply);
        answerReplies.push({
          ...reply,
          commentId: answer._id,
          isReply: true,
          acceptedReply: true,
        });
      });

      state.newComments = [answer, ...answerReplies, ...state.newComments];
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
      state.newComments.splice(index + 1, 0, comment);
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

      console.log(action.payload);

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

        state.newComments[targetReview].replies.forEach((reply, i) => {
          console.log(state.newComments[targetReview]);
          state.newComments[targetReview].replies[i].acceptedReply =
            action.payload.isAccepted;
        });
        // upvotes
        // action.payload.isAccepted
        //   ? state.newComments[targetReview].upvotes++
        //   : state.newComments[targetReview].upvotes--;
      }
    },
  },
});

export const answersListActions = answersList.actions;
export const answersListPostedScreenActions = answersList.actions;
export const answersListSliceName = answersList.name;
export default answersList;
