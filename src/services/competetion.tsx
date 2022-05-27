import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

export const competetionApi = createApi({
  reducerPath: "competetionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/competitions`,
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
    getLatestCompetetion: builder.query({
      keepUnusedDataFor: 0,
      query: () => `/latest`,
      transformResponse: (response: any) => {
        return response.competition;
      },
    }),

    getTopCompetetionUsers: builder.query({
      keepUnusedDataFor: 0,
      query: () => `/top`,
      transformResponse: (response: any) => {
        return response.users;
      },
    }),

    getMyCurrentRank: builder.query({
      keepUnusedDataFor: 0,
      query: () => `/rank`,
      transformResponse: (response: any) => {
        return response.user;
      },
    }),

    addCompetetion: builder.mutation({
      query: (data) => {
        return {
          url: "",
          method: "POST",
          body: data
        };
      },
    }),
  }),
});
//auto-generated hooks
export const {
  useGetLatestCompetetionQuery,
  useGetMyCurrentRankQuery,
  useGetTopCompetetionUsersQuery,
  useAddCompetetionMutation,
} = competetionApi;
