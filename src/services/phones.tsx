import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

export const phoneApi = createApi({
  reducerPath: "phoneApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/phones`,
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
    getPhoneSpecs: builder.query({
      query: (pid) => {
        return {
          url: `${pid}/specs`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        return response.specs;
      },
    }),

    getSimilarPhones: builder.query({
      query: (pid) => {
        return {
          url: `${pid}/similar`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        return response.phones;
      },
    }),

    // addToMyRecentSearches: builder.mutation({
    //   query: ({ id: productId, type }) => {
    //     return {
    //       url: `/recent`,
    //       method: "PUT",
    //       body: { _id: productId, type: type },
    //     };
    //   },
    // }),

    // deleteRecentSearches: builder.mutation({
    //   query: ({ id: productId }) => {
    //     return {
    //       url: `/recent`,
    //       method: "DELETE",
    //       body: { _id: productId },
    //     };
    //   },
    // }),

    // getMyRecentSearches: builder.query({
    //   query: () => `/recent`,
    //   transformResponse: (response: any) => {
    //     return response.recent;
    //   },
    // }),
  }),
});

//auto-generated hooks
export const { useGetPhoneSpecsQuery, useGetSimilarPhonesQuery } = phoneApi;
