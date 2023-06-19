import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { sendReportActions } from "../store/uiSendReportSlice";
import { snackbarActions } from "../store/uiSnackbarSlice";

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/reports`,
    // add token to all endpoints headers
    prepareHeaders: (headers, { getState, endpoint }) => {
      const state = getState();
      const token = (state as RootState).auth.apiToken;

      if (token) {
        headers.set("authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    reportPhoneReview: builder.mutation({
      query: ({ reportId, reportContent }) => {
        return {
          url: `/review/phone/${reportId}`,
          method: "POST",
          body: { reason: reportContent.reason, info: reportContent.info },
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: textContainer.successfullyReported,
            })
          );
          dispatch(sendReportActions.hideSendReport());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
    reportCompanyReview: builder.mutation({
      query: ({ reportId, reportContent }) => {
        return {
          url: `/review/company/${reportId}`,
          method: "POST",
          body: { reason: reportContent.reason, info: reportContent.info },
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: textContainer.successfullyReported,
            })
          );
          dispatch(sendReportActions.hideSendReport());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
    reportPhoneQuestion: builder.mutation({
      query: ({ reportId, reportContent }) => {
        return {
          url: `/question/phone/${reportId}`,
          method: "POST",
          body: { reason: reportContent.reason, info: reportContent.info },
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: textContainer.successfullyReported,
            })
          );
          dispatch(sendReportActions.hideSendReport());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
    reportCompanyQuestion: builder.mutation({
      query: ({ reportId, reportContent }) => {
        return {
          url: `/question/company/${reportId}`,
          method: "POST",
          body: { reason: reportContent.reason, info: reportContent.info },
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: textContainer.successfullyReported,
            })
          );
          dispatch(sendReportActions.hideSendReport());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
    reportAPhoneReviewComment: builder.mutation({
      query: ({ revId, commentId, reportContent }) => {
        return {
          url: `/review/phone/${revId}/comments/${commentId}`,
          method: "POST",
          body: { reason: reportContent.reason, info: reportContent.info },
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: textContainer.successfullyReported,
            })
          );
          dispatch(sendReportActions.hideSendReport());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
    reportACompanyReviewComment: builder.mutation({
      query: ({ revId, commentId, reportContent }) => {
        return {
          url: `/review/company/${revId}/comments/${commentId}`,
          method: "POST",
          body: { reason: reportContent.reason, info: reportContent.info },
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: textContainer.successfullyReported,
            })
          );
          dispatch(sendReportActions.hideSendReport());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
    reportAPhoneQuestionAnswer: builder.mutation({
      query: ({ quesId, answerId, reportContent }) => {
        return {
          url: `/question/phone/${quesId}/answers/${answerId}`,
          method: "POST",
          body: { reason: reportContent.reason, info: reportContent.info },
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: textContainer.successfullyReported,
            })
          );
          dispatch(sendReportActions.hideSendReport());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
    reportACompanyQuestionAnswer: builder.mutation({
      query: ({ quesId, answerId, reportContent }) => {
        return {
          url: `/question/company/${quesId}/answers/${answerId}`,
          method: "POST",
          body: { reason: reportContent.reason, info: reportContent.info },
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: textContainer.successfullyReported,
            })
          );
          dispatch(sendReportActions.hideSendReport());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
    reportAPhoneReviewCommentReply: builder.mutation({
      query: ({ revId, commentId, replyId, reportContent }) => {
        return {
          url: `/review/phone/${revId}/comments/${commentId}/replies/${replyId}`,
          method: "POST",
          body: { reason: reportContent.reason, info: reportContent.info },
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: textContainer.successfullyReported,
            })
          );
          dispatch(sendReportActions.hideSendReport());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
    ReportACompanyReviewCommentReply: builder.mutation({
      query: ({ revId, commentId, replyId, reportContent }) => {
        return {
          url: `/review/company/${revId}/comments/${commentId}/replies/${replyId}`,
          method: "POST",
          body: { reason: reportContent.reason, info: reportContent.info },
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: textContainer.successfullyReported,
            })
          );
          dispatch(sendReportActions.hideSendReport());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
    reportAPhoneQuestionAnswerReply: builder.mutation({
      query: ({ quesId, answerId, replyId, reportContent }) => {
        return {
          url: `/question/phone/${quesId}/answers/${answerId}/replies/${replyId}`,
          method: "POST",
          body: { reason: reportContent.reason, info: reportContent.info },
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: textContainer.successfullyReported,
            })
          );
          dispatch(sendReportActions.hideSendReport());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
    reportACompanyQuestionAnswerReply: builder.mutation({
      query: ({ quesId, answerId, replyId, reportContent }) => {
        return {
          url: `/question/company/${quesId}/answers/${answerId}/replies/${replyId}`,
          method: "POST",
          body: { reason: reportContent.reason, info: reportContent.info },
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            snackbarActions.showSnackbar({
              message: textContainer.successfullyReported,
            })
          );
          dispatch(sendReportActions.hideSendReport());
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
  }),
});

//auto-generated hooks
export const {
  useReportPhoneReviewMutation,
  useReportCompanyReviewMutation,
  useReportPhoneQuestionMutation,
  useReportCompanyQuestionMutation,
  useReportACompanyQuestionAnswerMutation,
  useReportACompanyQuestionAnswerReplyMutation,
  useReportACompanyReviewCommentMutation,
  useReportACompanyReviewCommentReplyMutation,
  useReportAPhoneQuestionAnswerMutation,
  useReportAPhoneQuestionAnswerReplyMutation,
  useReportAPhoneReviewCommentMutation,
  useReportAPhoneReviewCommentReplyMutation,
} = reportsApi;
