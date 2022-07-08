import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import APIComment from "../models/interfaces/APIComment.model";
import { APIReview } from "../models/interfaces/APIReview.model";
import { RootState } from "../store/store";
import { postingModalActions } from "../store/uiPostingModalSlice";
import { snackbarActions } from "../store/uiSnackbarSlice";

export const phoneReviewsApi = createApi({
  reducerPath: "phoneReviewsApi",
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
    getAllReviews: builder.query<APIReview[], number>({
      keepUnusedDataFor: 0,
      query: (round = 1) => `/phone/by/me?round=${1}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),

    getCertainPhoneReview: builder.query<APIReview, string>({
      keepUnusedDataFor: 0,
      query: (id: string) => `/phone/${id}`,
      transformResponse: (response: { review: APIReview }) => {
        return response.review;
      },
    }),

    getPhoneReviews: builder.query<APIReview[], { round: number; pid: string }>(
      {
        keepUnusedDataFor: 0,
        query: ({ round, pid }) => `/phone/on/${pid}?round=${round}`,
        transformResponse: (response: { reviews: APIReview[] }) => {
          return response.reviews;
        },
      }
    ),

    addPhoneReview: builder.mutation({
      query: (review) => {
        return {
          url: `/phone`,
          method: "POST",
          body: review,
          headers: {
            "user-agent": navigator.userAgent,
          },
        };
      },

      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: `${textContainer.postedSuccessfully}. ${textContainer.youHaveEarned} ${response.data.earnedPoints} ${textContainer.point}`,
              showActionBtn: true,
              actionBtnText: textContainer.seePost,
              actionNavPath: `../phone-review?id=${response.data.review._id}`,
            })
          );
          dispatch(postingModalActions.hidePostingModal());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),

    likePhoneReview: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/phone/${reviewId}/like`,
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

    unLikePhoneReview: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/phone/${reviewId}/unlike`,
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

    getUserPhoneReviews: builder.query<APIReview[], number>({
      keepUnusedDataFor: 0,
      query: (round = 1) => `/phone/by/me?round=${round}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),

    getOtherUserPhoneReviews: builder.query<
      APIReview[],
      { round: number; uid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, uid }) => `/phone/by/${uid}?round=${round}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),

    addCommentOnPhoneReview: builder.mutation({
      query: ({ reviewId, comment }) => {
        return {
          url: `/phone/${reviewId}/comments`,
          method: "POST",
          body: { content: comment },
        };
      },
    }),

    getPhoneReviewComments: builder.query<
      APIComment[],
      { reviewId: string; round: number }
    >({
      keepUnusedDataFor: 0,
      query: ({ reviewId, round = 1 }) =>
        `/phone/${reviewId}/comments?round=${round}`,
      transformResponse: (response: { comments: APIComment[] }) => {
        return response.comments;
      },
    }),

    addReplyOnPhoneReview: builder.mutation({
      query: ({ commentId, reply }) => {
        return {
          url: `/phone/comments/${commentId}/replies`,
          method: "POST",
          body: { content: reply },
        };
      },
    }),

    likePhoneReviewReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/phone/comments/${commentId}/replies/${replyId}/like`,
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

    unLikePhoneReviewReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/phone/comments/${commentId}/replies/${replyId}/unlike`,
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
    likePhoneReviewComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/phone/comments/${commentId}/like`,
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

    unLikePhoneReviewComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/phone/comments/${commentId}/unlike`,
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

    idontLikeThisPhoneReview: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/phone/${reviewId}/hate`,
          method: "POST",
        };
      },
    }),

    userPressFullScreen: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/phone/${reviewId}/fullscreen`,
          method: "POST",
        };
      },
    }),

    userPressSeeMore: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/phone/${reviewId}/seemore`,
          method: "POST",
        };
      },
    }),

    increaseViewCounter: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/phone/${reviewId}/view`,
          method: "PUT",
        };
      },
    }),

    increaseShareCounter: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/phone/${reviewId}/share`,
          method: "PUT",
        };
      },
    }),
  }),
});
//auto-generated hooks
export const {
  useGetAllReviewsQuery,
  useGetCertainPhoneReviewQuery,
  useGetPhoneReviewsQuery,
  useAddPhoneReviewMutation,
  useLikePhoneReviewMutation,
  useUnLikePhoneReviewMutation,
  useGetUserPhoneReviewsQuery,
  useGetOtherUserPhoneReviewsQuery,
  useLazyGetOtherUserPhoneReviewsQuery,
  useAddCommentOnPhoneReviewMutation,
  useGetPhoneReviewCommentsQuery,
  useLazyGetPhoneReviewCommentsQuery,
  useAddReplyOnPhoneReviewMutation,
  useLikePhoneReviewCommentMutation,
  useUnLikePhoneReviewCommentMutation,
  useLikePhoneReviewReplyMutation,
  useUnLikePhoneReviewReplyMutation,
  useIdontLikeThisPhoneReviewMutation,
  useUserPressFullScreenMutation,
  useUserPressSeeMoreMutation,
  useIncreaseViewCounterMutation,
  useIncreaseShareCounterMutation,
} = phoneReviewsApi;
