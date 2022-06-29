import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import APIComment from "../models/interfaces/APIComment.model";
import { APIReview } from "../models/interfaces/APIReview.model";
import { RootState } from "../store/store";

export const companyReviewsApi = createApi({
  reducerPath: "companyReviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/reviews`,
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
    getCertainCompanyReview: builder.query<APIReview, string>({
      keepUnusedDataFor: 0,
      query: (id: string) => `/company/${id}`,
      transformResponse: (response: { review: APIReview }) => {
        return response.review;
      },
    }),

    getCompanyReviews: builder.query<
      APIReview[],
      { round: number; cid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, cid }) => `/company/on/${cid}?round=${round}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),

    getComoanyReviews: builder.query<
      APIReview[],
      { round: number; pid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, pid }) => `/company/on/${pid}?round=${round}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),

    likeCompanyReview: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/company/${reviewId}/like`,
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

    unLikeCompanyReview: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/company/${reviewId}/unlike`,
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

    getUserCompanyReviews: builder.query<APIReview[], number>({
      keepUnusedDataFor: 0,
      query: (round = 1) => `/company/by/me?round=${round}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),

    getOtherUserCompanyReviews: builder.query<
      APIReview[],
      { round: number; uid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, uid }) => `/company/by/${uid}?round=${round}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),

    addCommentOnCompanyReview: builder.mutation({
      query: ({ reviewId, comment }) => {
        return {
          url: `/company/${reviewId}/comments`,
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
        `/company/${reviewId}/comments?round=${round}`,
      transformResponse: (response: { comments: APIComment[] }) => {
        return response.comments;
      },
    }),

    addReplyOnCompanyReview: builder.mutation({
      query: ({ commentId, reply }) => {
        return {
          url: `/company/comments/${commentId}/replies`,
          method: "POST",
          body: { content: reply },
        };
      },
    }),

    likeCompanyReviewReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/company/comments/${commentId}/replies/${replyId}/like`,
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

    unLikeCompanyReviewReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/company/comments/${commentId}/replies/${replyId}/unlike`,
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
    likeCompanyReviewComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/company/comments/${commentId}/like`,
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

    unLikeCompanyReviewComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/company/comments/${commentId}/unlike`,
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

    idontLikeThisCompanyReview: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/company/${reviewId}/hate`,
          method: "POST",
        };
      },
    }),

    userPressFullScreen: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/company/${reviewId}/fullscreen`,
          method: "POST",
        };
      },
    }),

    userPressSeeMore: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/company/${reviewId}/seemore`,
          method: "POST",
        };
      },
    }),

    increaseViewCounter: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/company/${reviewId}/view`,
          method: "PUT",
        };
      },
    }),

    increaseShareCounter: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/company/${reviewId}/share`,
          method: "PUT",
        };
      },
    }),
  }),
});
//auto-generated hooks
export const {
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
  useUserPressFullScreenMutation,
  useUserPressSeeMoreMutation,
  useIncreaseViewCounterMutation,
  useIncreaseShareCounterMutation,
} = companyReviewsApi;
