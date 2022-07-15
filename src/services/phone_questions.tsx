import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import APIAnswer from "../models/interfaces/APIAnswer.model";
import { APIQuestion } from "../models/interfaces/APIQuestion.model";
import { RootState } from "../store/store";
import { postingModalActions } from "../store/uiPostingModalSlice";
import { snackbarActions } from "../store/uiSnackbarSlice";

export const phoneQuestionsApi = createApi({
  reducerPath: "phoneQuestionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/questions/phone`,
    // add token to all endpoints headers
    prepareHeaders: (headers, { getState, endpoint }) => {
      const state = getState();
      const token = (state as RootState).auth.apiToken;

      if (token && endpoint !== "authenticate") {
        headers.set("authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllQuestions: builder.query<APIQuestion[], number>({
      keepUnusedDataFor: 0,
      query: (round = 1) => `/by/me?round=${1}`,
      transformResponse: (response: { questions: APIQuestion[] }) => {
        return response.questions;
      },
    }),

    getCertainPhoneQuestion: builder.query<APIQuestion, string>({
      keepUnusedDataFor: 0,
      query: (id: string) => `/${id}`,
      transformResponse: (response: { question: APIQuestion }) => {
        return response.question;
      },
    }),

    getPhoneQuestions: builder.query<
      APIQuestion[],
      { round: number; pid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, pid }) => `/on/${pid}?round=${round}`,
      transformResponse: (response: { questions: APIQuestion[] }) => {
        return response.questions;
      },
    }),

    addPhoneQuestion: builder.mutation({
      query: (question) => {
        return {
          url: ``,
          method: "POST",
          body: question,
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: `${textContainer.postedSuccessfully}`,
              showActionBtn: true,
              actionBtnText: textContainer.seePost,
              actionNavPath: `../phone-question?id=${response.data.question._id}`,
            })
          );
          dispatch(postingModalActions.hidePostingModal());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),

    likePhoneQuestion: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/${reviewId}/like`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn();

        try {
          await queryFulfilled;
        } catch (e: any) {
          if (e.error.data.status !== "already liked") {
            payload.unDoFn();
          }
        }
      },
    }),

    unLikePhoneQuestion: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/${reviewId}/unlike`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn();

        try {
          await queryFulfilled;
        } catch (e: any) {
          if (
            e.error.data.status === "already unliked" ||
            e.error.data.status === "no likes"
          ) {
          } else {
            payload.unDoFn();
          }
        }
      },
    }),

    getUserPhoneQuestions: builder.query<APIQuestion[], number>({
      keepUnusedDataFor: 0,
      query: (round = 1) => `/by/me?round=${round}`,
      transformResponse: (response: { questions: APIQuestion[] }) => {
        return response.questions;
      },
    }),

    getOtherUserPhoneQuestions: builder.query<
      APIQuestion[],
      { round: number; uid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, uid }) => `/by/${uid}?round=${round}`,
      transformResponse: (response: { questions: APIQuestion[] }) => {
        return response.questions;
      },
    }),

    getMyPhonesQuestions: builder.query<APIQuestion[], any>({
      keepUnusedDataFor: 0,
      query: (round) => `/owned/by/me?round=${round}`,
      transformResponse: (response: { questions: APIQuestion[] }) => {
        return response.questions;
      },
    }),

    addCommentOnPhoneQuestion: builder.mutation({
      query: ({ reviewId, content, phoneId }) => {
        return {
          url: `/${reviewId}/answers`,
          method: "POST",
          body: { content: content, phoneId: phoneId },
        };
      },
    }),

    getPhoneQuestionComments: builder.query<
      APIAnswer[],
      { reviewId: string; round: number }
    >({
      keepUnusedDataFor: 0,
      query: ({ reviewId, round = 1 }) => `/${reviewId}/answers?round=${round}`,
      transformResponse: (response: { answers: APIAnswer[] }) => {
        return response.answers;
      },
    }),

    addReplyOnPhoneQuestion: builder.mutation({
      query: ({ commentId, reply }) => {
        return {
          url: `/answers/${commentId}/replies`,
          method: "POST",
          body: { content: reply },
        };
      },
    }),

    likePhoneQuestionReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/answers/${commentId}/replies/${replyId}/like`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn(payload.commentId, payload.replyId);

        try {
          await queryFulfilled;
        } catch (e: any) {
          if (
            // e.error.data.status === "not found" ||
            e.error.data.status === "already liked"
          ) {
          } else {
            payload.unDoFn(payload.commentId, payload.replyId);
          }
        }
      },
    }),

    unLikePhoneQuestionReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/answers/${commentId}/replies/${replyId}/unlike`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn(payload.commentId, payload.replyId);

        try {
          await queryFulfilled;
        } catch (e: any) {
          if (
            // e.error.data.status === "not found" ||
            e.error.data.status === "already liked"
          ) {
          } else {
            payload.unDoFn(payload.commentId, payload.replyId);
          }
        }
      },
    }),

    // comments likes
    likePhoneQuestionComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/answers/${commentId}/like`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn(payload.commentId);

        try {
          await queryFulfilled;
        } catch (e: any) {
          if (
            // e.error.data.status === "not found" ||
            e.error.data.status === "already liked"
          ) {
          } else {
            payload.unDoFn(payload.replyId);
          }
        }
      },
    }),

    unLikePhoneQuestionComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/answers/${commentId}/unlike`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn(payload.commentId);

        try {
          await queryFulfilled;
        } catch (e: any) {
          // if (e.error.data.status === "not found") {
          // } else {
          payload.unDoFn(payload.replyId);
          // }
        }
      },
    }),

    // answer acceptance
    markAnswerAsAccepted: builder.mutation({
      query: ({ questionId, answerId }) => {
        return {
          url: `/${questionId}/answers/${answerId}/accept`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn(payload.answerId);

        try {
          await queryFulfilled;
        } catch (e: any) {
          if (e.error.data.status === "already accepted") {
          } else {
            payload.unDoFn(payload.answerId);
          }
        }
      },
    }),

    unmarkAnswerAsAccepted: builder.mutation({
      query: ({ questionId, answerId }) => {
        return {
          url: `/${questionId}/answers/${answerId}/reject`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn(payload.answerId);

        try {
          await queryFulfilled;
        } catch (e: any) {
          if (e.error.data.status === "not yet") {
          } else {
            payload.unDoFn(payload.answerId);
          }
        }
      },
    }),

    idontLikeThisPhoneQuestion: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/${reviewId}/hate`,
          method: "POST",
        };
      },
    }),

    userPressesFullScreenPhoneQuestion: builder.mutation({
      query: (reviewId) => {
        return {
          url: `/${reviewId}/fullscreen`,
          method: "POST",
        };
      },
    }),

    increaseShareCounter: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/${reviewId}/share`,
          method: "PUT",
        };
      },
    }),
  }),
});
//auto-generated hooks
export const {
  useGetAllQuestionsQuery,
  useGetCertainPhoneQuestionQuery,
  useGetPhoneQuestionsQuery,
  useAddPhoneQuestionMutation,
  useGetMyPhonesQuestionsQuery,
  useLikePhoneQuestionMutation,
  useUnLikePhoneQuestionMutation,
  useGetUserPhoneQuestionsQuery,
  useGetOtherUserPhoneQuestionsQuery,
  useAddCommentOnPhoneQuestionMutation,
  useGetPhoneQuestionCommentsQuery,
  useLazyGetPhoneQuestionCommentsQuery,
  useAddReplyOnPhoneQuestionMutation,
  useLikePhoneQuestionCommentMutation,
  useUnLikePhoneQuestionCommentMutation,
  useLikePhoneQuestionReplyMutation,
  useUnLikePhoneQuestionReplyMutation,
  useMarkAnswerAsAcceptedMutation,
  useUnmarkAnswerAsAcceptedMutation,
  useIdontLikeThisPhoneQuestionMutation,
  useUserPressesFullScreenPhoneQuestionMutation,
  useIncreaseShareCounterMutation,
} = phoneQuestionsApi;
