import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIQuestion } from "../models/interfaces/APIQuestion.model";
import { APIReview } from "../models/interfaces/APIReview.model";
import { RootState } from "../store/store";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/home`,
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
    getRecommended: builder.query({
      keepUnusedDataFor: 0,
      query: (round = 1) => `/recommended?round=${round}`,
      transformResponse: (response: {
        phoneRevs: APIReview[];
        companyRevs: APIReview[];
        phoneQuestions: APIQuestion[];
        companyQuestions: APIQuestion[];
        total: String[];
      }) => {
        const phoneRevs = response.phoneRevs.map((rev) => {
          return {
            ...rev,
            type: "phoneRev",
          };
        });
        const companyRevs = response.companyRevs.map((rev) => {
          return {
            ...rev,
            type: "companyRev",
          };
        });
        const phoneQuestions = response.phoneQuestions.map((rev) => {
          return {
            ...rev,
            type: "phoneQuestion",
          };
        });
        const companyQuestions = response.companyQuestions.map((rev) => {
          return {
            ...rev,
            type: "companyQuestion",
          };
        });

        let posts = [
          ...phoneRevs,
          ...companyRevs,
          ...phoneQuestions,
          ...companyQuestions,
        ];

        let sortedPosts: any = [];
        posts.forEach((post, i) => {
          let toBeAppendedPost = posts.find(
            (post) => post._id === response.total[i]
          );
          if (toBeAppendedPost) sortedPosts.push(toBeAppendedPost);
        });

        return sortedPosts;
      },
    }),
  }),
});
//auto-generated hooks
export const { useGetRecommendedQuery } = homeApi;
