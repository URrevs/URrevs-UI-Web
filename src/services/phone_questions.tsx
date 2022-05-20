import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import APIComment from "../models/interfaces/APIComment.model";
import { APIQuestion } from "../models/interfaces/APIQuestion.model";
import { RootState } from "../store/store";
import { snackbarActions } from "../store/uiSnackbarSlice";

export const phoneQuestionsApi = createApi({
  reducerPath: "phoneQuestionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/questions`,
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
      query: (round = 1) => `/phone/by/me?round=${1}`,
      transformResponse: (response: { reviews: APIQuestion[] }) => {
        return response.reviews;
      },
    }),

    getCertainPhoneQuestion: builder.query<APIQuestion, string>({
      keepUnusedDataFor: 0,
      query: (id: string) => `/phone/${id}`,
      transformResponse: (response: { question: APIQuestion }) => {
        return response.question;
      },
    }),

    getPhoneQuestions: builder.query<
      APIQuestion[],
      { round: number; pid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, pid }) => `/phone/on/${pid}?round=${round}`,
      transformResponse: (response: { reviews: APIQuestion[] }) => {
        return response.reviews;
      },
    }),

    addPhoneQuestion: builder.mutation({
      query: (question) => {
        return {
          url: `/phone`,
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

    likePhoneQuestion: builder.mutation({
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
        } catch (e) {
          payload.unDoFn();
        }
      },
    }),

    unLikePhoneQuestion: builder.mutation({
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
        } catch (e) {
          payload.unDoFn();
        }
      },
    }),

    getUserPhoneQuestions: builder.query<APIQuestion[], number>({
      keepUnusedDataFor: 0,
      query: (round = 1) => `/phone/by/me?round=${round}`,
      transformResponse: (response: { reviews: APIQuestion[] }) => {
        return response.reviews;
      },
    }),

    getOtherUserPhoneQuestions: builder.query<
      APIQuestion[],
      { round: number; uid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, uid }) => `/phone/by/${uid}?round=${round}`,
      transformResponse: (response: { reviews: APIQuestion[] }) => {
        return response.reviews;
      },
    }),

    addCommentOnPhoneQuestion: builder.mutation({
      query: ({ reviewId, comment }) => {
        return {
          url: `/phone/${reviewId}/answers`,
          method: "POST",
          body: { content: comment },
        };
      },
    }),

    getPhoneQuestionComments: builder.query<
      APIComment[],
      { reviewId: string; round: number }
    >({
      keepUnusedDataFor: 0,
      query: ({ reviewId, round = 1 }) =>
        `/phone/${reviewId}/answers?round=${round}`,
      transformResponse: (response: { comments: APIComment[] }) => {
        return response.comments;
      },
    }),

    addReplyOnPhoneQuestion: builder.mutation({
      query: ({ commentId, reply }) => {
        return {
          url: `/phone/answers/${commentId}/replies`,
          method: "POST",
          body: { content: reply },
        };
      },
    }),

    likePhoneQuestionReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/phone/answers/${commentId}/replies/${replyId}/like`,
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

    unLikePhoneQuestionReply: builder.mutation({
      query: ({ commentId, replyId }) => {
        return {
          url: `/phone/answers/${commentId}/replies/${replyId}/unlike`,
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
    likePhoneQuestionComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/phone/answers/${commentId}/like`,
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

    unLikePhoneQuestionComment: builder.mutation({
      query: ({ commentId }) => {
        return {
          url: `/phone/answers/${commentId}/unlike`,
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

    idontLikeThisPhoneQuestion: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `/phone/${reviewId}/hate`,
          method: "POST",
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
  useLikePhoneQuestionMutation,
  useUnLikePhoneQuestionMutation,
  useGetUserPhoneQuestionsQuery,
  useGetOtherUserPhoneQuestionsQuery,
  useAddCommentOnPhoneQuestionMutation,
  useGetPhoneQuestionCommentsQuery,
  useAddReplyOnPhoneQuestionMutation,
  useLikePhoneQuestionCommentMutation,
  useUnLikePhoneQuestionCommentMutation,
  useLikePhoneQuestionReplyMutation,
  useUnLikePhoneQuestionReplyMutation,
  useIdontLikeThisPhoneQuestionMutation,
} = phoneQuestionsApi;
