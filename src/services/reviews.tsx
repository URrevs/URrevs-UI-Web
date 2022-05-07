import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIReview } from "../models/interfaces/APIReview.model";
import Review from "../models/classes/Review";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/reviews`,
  }),

  endpoints: (builder) => ({
    getAllReviews: builder.query<Review[], number>({
      keepUnusedDataFor: 2000,
      query: (page = 0) => `/?page=${page}`,
      transformResponse: (response: APIReview[]) => {
        return response.map((review) => new Review(review));
      },
    }),
    getReview: builder.query<Review, number>({
      query: (id: number) => `/phone/${id}`,
      transformResponse: (response: { review: APIReview }) =>
        new Review(response.review),
    }),
  }),
});
//auto-generated hooks
export const { useGetAllReviewsQuery, useGetReviewQuery } = reviewsApi;
