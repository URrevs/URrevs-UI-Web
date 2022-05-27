import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/companies`,
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
    getCompanyStatsInfo: builder.query({
      keepUnusedDataFor: 0,
      query: (cid) => {
        return {
          url: `${cid}/stats`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        return response.stats;
      },
    }),
  }),
});

//auto-generated hooks
export const { useGetCompanyStatsInfoQuery } = companyApi;
