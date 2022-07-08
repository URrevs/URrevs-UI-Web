import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import APIAnswer from "../models/interfaces/APIAnswer.model";
import { APIQuestion } from "../models/interfaces/APIQuestion.model";
import { RootState } from "../store/store";
import { postingModalActions } from "../store/uiPostingModalSlice";
import { snackbarActions } from "../store/uiSnackbarSlice";

export const companyQuestionsApi = createApi({
  reducerPath: "companyQuestionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/questions/company`,
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

    getCertainCompanyQuestion: builder.query<APIQuestion, string>({
      keepUnusedDataFor: 0,
      query: (id: string) => `/${id}`,
      transformResponse: (response: { question: APIQuestion }) => {
        return response.question;
      },
    }),

    getCompanyQuestions: builder.query<
      APIQuestion[],
      { round: number; cid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, cid }) => `/on/${cid}?round=${round}`,
      transformResponse: (response: { questions: APIQuestion[] }) => {
        return response.questions;
      },
    }),

    addCompanyQuestion: builder.mutation({
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
              actionNavPath: `../company-question?id=${response.data.question._id}`,
            })
          );
          dispatch(postingModalActions.hidePostingModal());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),

    likeCompanyQuestion: builder.mutation({
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
          console.log(e.error.data.status);
          if (e.error.data.status !== "already liked") {
            payload.unDoFn();
          }
        }
      },
    }),

    unLikeCompanyQuestion: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/${reviewId}/unlike`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn();
        console.log("a");

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

    getUserCompanyQuestions: builder.query<APIQuestion[], number>({
      keepUnusedDataFor: 0,
      query: (round = 1) => `/by/me?round=${round}`,
      transformResponse: (response: { questions: APIQuestion[] }) => {
        return response.questions;
      },
    }),

    getOtherUserCompanyQuestions: builder.query<
      APIQuestion[],
      { round: number; uid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, uid }) => `/by/${uid}?round=${round}`,
      transformResponse: (response: { questions: APIQuestion[] }) => {
        return response.questions;
      },
    }),

    addCommentOnCompanyQuestion: builder.mutation({
      query: ({ reviewId, content, phoneId }) => {
        return {
          url: `/${reviewId}/answers`,
          method: "POST",
          body: { content: content, companyId: phoneId },
        };
      },
    }),

    getCompanyQuestionComments: builder.query<
      APIAnswer[],
      { reviewId: string; round: number }
    >({
      keepUnusedDataFor: 0,
      query: ({ reviewId, round = 1 }) => `/${reviewId}/answers?round=${round}`,
      transformResponse: (response: { answers: APIAnswer[] }) => {
        return response.answers;
      },
    }),

    addReplyOnCompanyQuestion: builder.mutation({
      query: ({ commentId, reply }) => {
        return {
          url: `/answers/${commentId}/replies`,
          method: "POST",
          body: { content: reply },
        };
      },
    }),

    likeCompanyQuestionReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/answers/${commentId}/replies/${replyId}/like`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn(payload.replyId);

        try {
          await queryFulfilled;
        } catch (e: any) {
          if (
            e.error.data.status === "not found" ||
            e.error.data.status === "already liked"
          ) {
          } else {
            payload.unDoFn(payload.replyId);
          }
        }
      },
    }),

    unLikeCompanyQuestionReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/answers/${commentId}/replies/${replyId}/unlike`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn(payload.replyId);

        try {
          await queryFulfilled;
        } catch (e: any) {
          if (
            e.error.data.status === "not found" ||
            e.error.data.status === "already liked"
          ) {
          } else {
            payload.unDoFn(payload.replyId);
          }
        }
      },
    }),

    // comments likes
    likeCompanyQuestionComment: builder.mutation({
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
            e.error.data.status === "not found" ||
            e.error.data.status === "already liked"
          ) {
          } else {
            payload.unDoFn(payload.commentId);
          }
        }
      },
    }),

    unLikeCompanyQuestionComment: builder.mutation({
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
          if (e.error.data.status === "not found") {
          } else {
            payload.unDoFn(payload.commentId);
          }
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

    idontLikeThisCompanyQuestion: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/${reviewId}/hate`,
          method: "POST",
        };
      },
    }),

    userPressesFullScreenCompanyQuestion: builder.mutation({
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
  useGetCertainCompanyQuestionQuery,
  useGetCompanyQuestionsQuery,
  useAddCompanyQuestionMutation,
  useLikeCompanyQuestionMutation,
  useUnLikeCompanyQuestionMutation,
  useGetUserCompanyQuestionsQuery,
  useGetOtherUserCompanyQuestionsQuery,
  useAddCommentOnCompanyQuestionMutation,
  useGetCompanyQuestionCommentsQuery,
  useLazyGetCompanyQuestionCommentsQuery,
  useAddReplyOnCompanyQuestionMutation,
  useLikeCompanyQuestionCommentMutation,
  useUnLikeCompanyQuestionCommentMutation,
  useLikeCompanyQuestionReplyMutation,
  useUnLikeCompanyQuestionReplyMutation,
  useMarkAnswerAsAcceptedMutation,
  useUnmarkAnswerAsAcceptedMutation,
  useIdontLikeThisCompanyQuestionMutation,
  useUserPressesFullScreenCompanyQuestionMutation,
  useIncreaseShareCounterMutation,
} = companyQuestionsApi;
