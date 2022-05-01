import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIReview } from "../models/APIReview.model";
import Review from "../models/Review";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/reviews`,
  }),

  endpoints: (builder) => ({
    getAllReviews: builder.query<Review[], number>({
      query: (page = 0) => `/?page=${page}`,
      transformResponse: (response: APIReview[]) => {
        return response.map((review) => new Review(review));
      },
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
