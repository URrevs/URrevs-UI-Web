import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIReview } from "../models/interfaces/APIReview.model";
import Review from "../models/classes/Review";
import { RootState } from "../store/store";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
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
      query: (round = 1) => `/phone/by/me?round=${1}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),
    getReview: builder.query<Review, number>({
      query: (id: number) => `/phone/${id}`,
      transformResponse: (response: { review: APIReview }) =>
        new Review(response.review),
    }),

    getUserPhoneReviews: builder.query<APIReview[], number>({
      query: (round = 1) => `/phone/by/me?round=${round}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),
    getUserCompanyReviews: builder.query<APIReview[], number>({
      query: (round = 1) => `/company/by/me?round=${round}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),
  }),
});
//auto-generated hooks
export const {
  useGetAllReviewsQuery,
  useGetReviewQuery,
  useGetUserPhoneReviewsQuery,
  useGetUserCompanyReviewsQuery,
} = reviewsApi;
