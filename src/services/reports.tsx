import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import {
  sendReportActions,
  sendReportSliceName,
} from "../store/uiSendReportSlice";
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
          const response = await queryFulfilled;
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
export const { useReportPhoneReviewMutation } = reportsApi;
