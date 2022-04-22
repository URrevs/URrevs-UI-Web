import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Review } from "../models/Review.model";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/urrevs`,
  }),

  endpoints: (builder) => ({
    getAllReviews: builder.query<Review[], number>({
      query: (page = 0) => `/reviews?page=${page}`,
    }),
    // postReview: builder.mutation({
    //   query: ({ review }) => {
    //     return {
    //       url: "/review",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Content-Length": "<calculated when request is sent>",
    //         Host: "<calculated when request is sent>",
    //         "User-Agent": "PostmanRuntime/7.28.4",
    //         Accept: "*/*",
    //         "Accept-Encoding": "gzip, deflate, br",
    //         Connection: "keep-alive",
    //       },
    //       method: "POST",
    //       body: JSON.stringify({ ...review }),
    //     };
    //   },
    // }),
  }),
});
//auto-generated hooks
export const { useGetAllReviewsQuery } = reviewsApi;
