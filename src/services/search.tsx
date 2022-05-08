import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/search`,
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
    searchAll: builder.mutation({
      query: (searchWord: string) => {
        return {
          url: `/all?q=${searchWord}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        return { phones: response.phones, companies: response.companies };
      },
    }),

    addToMyRecentSearches: builder.mutation({
      query: ({ id: productId, type }) => {
        return {
          url: `/recent`,
          method: "PUT",
          body: { _id: productId, type: type },
        };
      },
    }),
    deleteRecentSearches: builder.mutation({
      query: ({ id: productId }) => {
        return {
          url: `/recent`,
          method: "DELETE",
          body: { _id: productId },
        };
      },
    }),
    searchPhonesOnly: builder.mutation({
      query: (searchWord: string) => {
        return {
          url: `/products/phones?q=${searchWord}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        return response.phones;
      },
    }),
    getMyRecentSearches: builder.query({
      query: () => `/recent`,
      transformResponse: (response: any) => {
        return response.recent;
      },
    }),
  }),
});

//auto-generated hooks
export const {
  useSearchAllMutation,
  useGetMyRecentSearchesQuery,
  useSearchPhonesOnlyMutation,
  useAddToMyRecentSearchesMutation,
  useDeleteRecentSearchesMutation,
} = searchApi;
