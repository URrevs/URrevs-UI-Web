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
    getStatisticalInfo: builder.query({
      query: (pid) => {
        return {
          url: `${pid}/stats`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        return response.stats;
      },
    }),
    getManufacturingCompany: builder.mutation({
      query: (pid) => {
        return {
          url: `${pid}/company`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => {
        return response.company;
      },
    }),
  }),
});

//auto-generated hooks
export const {
  useGetPhoneSpecsQuery,
  useGetSimilarPhonesQuery,
  useGetManufacturingCompanyMutation,
  useGetStatisticalInfoQuery,
} = phoneApi;
