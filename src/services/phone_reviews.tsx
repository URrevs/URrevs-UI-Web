import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import APIComment from "../models/interfaces/APIComment.model";
import { APIReview } from "../models/interfaces/APIReview.model";
import { RootState } from "../store/store";
import { postingModalActions } from "../store/uiPostingModalSlice";
import { snackbarActions } from "../store/uiSnackbarSlice";
import { mainApi } from "./main";

export const phoneReviewsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<APIReview[], number>({
      keepUnusedDataFor: 0,
      query: (round = 1) => `/reviews/phone/by/me?round=${1}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),

    getCertainPhoneReview: builder.query<APIReview, string>({
      keepUnusedDataFor: 0,
      query: (id: string) => `/reviews/phone/${id}`,
      transformResponse: (response: { review: APIReview }) => {
        return response.review;
      },
    }),

    getPhoneReviews: builder.query<APIReview[], { round: number; pid: string }>(
      {
        keepUnusedDataFor: 0,
        query: ({ round, pid }) => `/reviews/phone/on/${pid}?round=${round}`,
        transformResponse: (response: { reviews: APIReview[] }) => {
          return response.reviews;
        },
      }
    ),

    addPhoneReview: builder.mutation({
      query: (review) => {
        return {
          url: `/reviews/phone`,
          method: "POST",
          body: review,
          headers: {
            "user-agent": navigator.userAgent,
          },
        };
      },
      invalidatesTags: ["phoneStats"],

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

          if (response.data.review.verificationRatio === 0) {
            setTimeout(() => {
              dispatch(
                snackbarActions.showSnackbar({
                  message:
                    "حتى تتمكن من توثيق المراجعة عليك فتح الموقع باستخدام هذا الهاتف",
                })
              );
            }, 3000);
          }
        } catch (e: any) {
          console.error(e);
        }
      },
    }),

    verifyPhoneReview: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/reviews/phone/${reviewId}/verify`,
          method: "PUT",
        };
      },
      invalidatesTags: ["phoneStats"],
    }),

    likePhoneReview: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/reviews/phone/${reviewId}/like`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn();

        try {
          const response = await queryFulfilled;

          // dispatch(
          //   snackbarActions.showSnackbar({
          //     message: "asdas",
          //   })
          // );

          // dispatch(
          //   snackbarActions.showSnackbar({
          //     message:
          //       "حتى تتمكن من توثيق المراجعة عليك فتح الموقع باستخدام هذا الهاتف",
          //   })
          // );
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
          url: `/reviews/phone/${reviewId}/unlike`,
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

    getUserPhoneReviews: builder.query<APIReview[], number>({
      keepUnusedDataFor: 0,
      query: (round = 1) => `/reviews/phone/by/me?round=${round}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),

    getOtherUserPhoneReviews: builder.query<
      APIReview[],
      { round: number; uid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, uid }) => `/reviews/phone/by/${uid}?round=${round}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),

    addCommentOnPhoneReview: builder.mutation({
      query: ({ reviewId, comment }) => {
        return {
          url: `/reviews/phone/${reviewId}/comments`,
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
        `/reviews/phone/${reviewId}/comments?round=${round}`,
      transformResponse: (response: { comments: APIComment[] }) => {
        return response.comments;
      },
    }),

    addReplyOnPhoneReview: builder.mutation({
      query: ({ commentId, reply }) => {
        return {
          url: `/reviews/phone/comments/${commentId}/replies`,
          method: "POST",
          body: { content: reply },
        };
      },
    }),

    likePhoneReviewReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/reviews/phone/comments/${commentId}/replies/${replyId}/like`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn(payload.replyId);

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

    unLikePhoneReviewReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/reviews/phone/comments/${commentId}/replies/${replyId}/unlike`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        payload.doFn(payload.replyId);

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

    // comments likes
    likePhoneReviewComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/reviews/phone/comments/${commentId}/like`,
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
            payload.unDoFn(payload.commentId);
          }
        }
      },
    }),

    unLikePhoneReviewComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/reviews/phone/comments/${commentId}/unlike`,
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
          payload.unDoFn(payload.commentId);
          // }
        }
      },
    }),

    idontLikeThisPhoneReview: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/reviews/phone/${reviewId}/hate`,
          method: "POST",
        };
      },
    }),

    userPressFullScreen: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/reviews/phone/${reviewId}/fullscreen`,
          method: "POST",
        };
      },
    }),

    userPressSeeMore: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/reviews/phone/${reviewId}/seemore`,
          method: "POST",
        };
      },
    }),

    increaseViewCounter: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/reviews/phone/${reviewId}/view`,
          method: "PUT",
        };
      },
    }),

    increaseShareCounter: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/reviews/phone/${reviewId}/share`,
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
  useVerifyPhoneReviewMutation,
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
