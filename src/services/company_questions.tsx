import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import APIComment from "../models/interfaces/APIComment.model";
import { APIQuestion } from "../models/interfaces/APIQuestion.model";
import { RootState } from "../store/store";
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
      { round: number; pid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, pid }) => `/on/${pid}?round=${round}`,
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
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            snackbarActions.showSnackbar({ message: "تم نشر سؤالك بنجاح" })
          );
        } catch (e: any) {
          dispatch(
            snackbarActions.showSnackbar({ message: e.error.data.status })
          );
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
        } catch (e) {
          payload.unDoFn();
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
        } catch (e) {
          payload.unDoFn();
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
      query: ({ reviewId, comment }) => {
        return {
          url: `/${reviewId}/answers`,
          method: "POST",
          body: { content: comment },
        };
      },
    }),

    getCompanyQuestionComments: builder.query<
      APIComment[],
      { reviewId: string; round: number }
    >({
      keepUnusedDataFor: 0,
      query: ({ reviewId, round = 1 }) =>
        `/${reviewId}/answers?round=${round}`,
      transformResponse: (response: { comments: APIComment[] }) => {
        return response.comments;
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
        } catch (e) {
          payload.unDoFn(payload.replyId);
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
        } catch (e) {
          payload.unDoFn(payload.replyId);
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
        } catch (e) {
          payload.unDoFn(payload.commentId);
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
        } catch (e) {
          payload.unDoFn(payload.commentId);
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
  useAddReplyOnCompanyQuestionMutation,
  useLikeCompanyQuestionCommentMutation,
  useUnLikeCompanyQuestionCommentMutation,
  useLikeCompanyQuestionReplyMutation,
  useUnLikeCompanyQuestionReplyMutation,
  useIdontLikeThisCompanyQuestionMutation,
} = companyQuestionsApi;
