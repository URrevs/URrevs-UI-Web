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

    getReview: builder.query<Review, string>({
      query: (id: string) => `/phone/${id}`,
      transformResponse: (response: { review: APIReview }) =>
        new Review(response.review),
    }),

    getCompanyReviews: builder.query<
      APIReview[],
      { round: number; cid: string }
    >({
      query: ({ round, cid }) => `/company/on/${cid}?round=${round}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),
    getPhoneReviews: builder.query<APIReview[], { round: number; pid: string }>(
      {
        query: ({ round, pid }) => `/phone/on/${pid}?round=${round}`,
        transformResponse: (response: { reviews: APIReview[] }) => {
          return response.reviews;
        },
      }
    ),
    addPhoneReview: builder.mutation({
      query: (review) => {
        return {
          url: `/phone`,
          method: "POST",
          body: review,
          // {
          //   phoneId: review.phoneId,
          //   companyId: review.companyId,
          //   ownedDate: review.ownedDate,
          //   generalRating: review.generalRating,
          //   uiRating: review.uiRating,
          //   manQuality: review.manQuality,
          //   valFMon: review.valFMon,
          //   camera: review.camera,
          //   callQuality: review.callQuality,
          //   battery: review.battery,
          //   pros: review.pros,
          //   cons: review.cons,
          //   refCode: review.refCode,
          //   companyRating: review.companyRating,
          //   compPros: review.compPros,
          //   compCons: review.compCons,
          // },
        };
      },
      // transformResponse: (response: { review: APIReview }) =>
      //   new Review(response.review),
    }),

    likePhoneReview: builder.mutation<
      void,
      Pick<APIReview, "_id"> & Partial<APIReview>
    >({
      query: (reviewId) => {
        return {
          url: `/phone/${reviewId}/like`,
          method: "POST",
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          reviewsApi.util.updateQueryData(
            "getReview",
            "6274051f8cc1cefd58621d57",
            (draft) => {
              return Object.assign(draft, { liked: true });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (e) {
          patchResult.undo();
        }
      },
    }),

    unLikePhoneReview: builder.mutation<
      void,
      Pick<APIReview, "_id"> & Partial<APIReview>
    >({
      query: (reviewId) => {
        return {
          url: `/phone/${reviewId}/unlike`,
          method: "POST",
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          reviewsApi.util.updateQueryData(
            "getReview",
            "6274051f8cc1cefd58621d57",
            (draft) => {
              return Object.assign(draft, { liked: false });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (e) {
          patchResult.undo();
        }
      },
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
    getOtherUserPhoneReviews: builder.query<
      APIReview[],
      { round: number; uid: string }
    >({
      query: ({ round, uid }) => `/phone/by/${uid}?round=${round}`,
      transformResponse: (response: { reviews: APIReview[] }) => {
        return response.reviews;
      },
    }),

    getOtherUserCompanyReviews: builder.query<
      APIReview[],
      { round: number; uid: string }
    >({
      query: ({ round, uid }) => `/company/by/${uid}?round=${round}`,
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
  useGetCompanyReviewsQuery,
  useGetPhoneReviewsQuery,
  useAddPhoneReviewMutation,
  useLikePhoneReviewMutation,
  useUnLikePhoneReviewMutation,
  useGetUserPhoneReviewsQuery,
  useGetUserCompanyReviewsQuery,
  useGetOtherUserPhoneReviewsQuery,
  useGetOtherUserCompanyReviewsQuery,
} = reviewsApi;
