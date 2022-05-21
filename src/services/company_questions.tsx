import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import APIComment from "../models/interfaces/APIComment.model";
import { APIReview } from "../models/interfaces/APIReview.model";
import { RootState } from "../store/store";

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
    addCompanyQuestion: builder.mutation({
      query: (question) => {
        return {
          url: `/`,
          method: "POST",
          body: question,
        };
      },
    }),

    getCertainCompanyReview: builder.query<APIReview, string>({
      keepUnusedDataFor: 0,
      query: (id: string) => `/${id}`,
      transformResponse: (response: { review: APIReview }) => {
        return response.review;
      },
    }),

    getCompanyReviews: builder.query<
      APIReview[],
      { round: number; cid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, cid }) => `/on/${cid}?round=${round}`,
      transformResponse: (response: { questions: APIReview[] }) => {
        return response.questions;
      },
    }),

    getComoanyReviews: builder.query<
      APIReview[],
      { round: number; pid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, pid }) => `/on/${pid}?round=${round}`,
      transformResponse: (response: { questions: APIReview[] }) => {
        return response.questions;
      },
    }),

    likeCompanyReview: builder.mutation({
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

    unLikeCompanyReview: builder.mutation({
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

    getUserCompanyReviews: builder.query<APIReview[], number>({
      keepUnusedDataFor: 0,
      query: (round = 1) => `/by/me?round=${round}`,
      transformResponse: (response: { questions: APIReview[] }) => {
        return response.questions;
      },
    }),

    getOtherUserCompanyReviews: builder.query<
      APIReview[],
      { round: number; uid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, uid }) => `/by/${uid}?round=${round}`,
      transformResponse: (response: { questions: APIReview[] }) => {
        return response.questions;
      },
    }),

    addCommentOnCompanyReview: builder.mutation({
      query: ({ reviewId, comment }) => {
        return {
          url: `/${reviewId}/comments`,
          method: "POST",
          body: { content: comment },
        };
      },
    }),

    getCompanyReviewComments: builder.query<
      APIComment[],
      { reviewId: string; round: number }
    >({
      keepUnusedDataFor: 0,
      query: ({ reviewId, round = 1 }) =>
        `/${reviewId}/comments?round=${round}`,
      transformResponse: (response: { comments: APIComment[] }) => {
        return response.comments;
      },
    }),

    addReplyOnCompanyReview: builder.mutation({
      query: ({ commentId, reply }) => {
        return {
          url: `/comments/${commentId}/replies`,
          method: "POST",
          body: { content: reply },
        };
      },
    }),

    likeCompanyReviewReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/comments/${commentId}/replies/${replyId}/like`,
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

    unLikeCompanyReviewReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/comments/${commentId}/replies/${replyId}/unlike`,
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
    likeCompanyReviewComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/comments/${commentId}/like`,
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

    unLikeCompanyReviewComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/comments/${commentId}/unlike`,
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

    idontLikeThisCompanyReview: builder.mutation({
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
  useAddCompanyQuestionMutation,
  useGetCertainCompanyReviewQuery,
  useGetCompanyReviewsQuery,
  useLikeCompanyReviewMutation,
  useUnLikeCompanyReviewMutation,
  useGetUserCompanyReviewsQuery,
  useGetOtherUserCompanyReviewsQuery,
  useAddCommentOnCompanyReviewMutation,
  useGetCompanyReviewCommentsQuery,
  useAddReplyOnCompanyReviewMutation,
  useLikeCompanyReviewCommentMutation,
  useUnLikeCompanyReviewCommentMutation,
  useLikeCompanyReviewReplyMutation,
  useUnLikeCompanyReviewReplyMutation,
  useIdontLikeThisCompanyReviewMutation,
} = companyQuestionsApi;
