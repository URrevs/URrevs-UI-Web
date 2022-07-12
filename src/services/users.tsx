import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import User from "../models/classes/User";
import APIOwnedPhone from "../models/interfaces/APIOwnedPhone.model";
import APIUser from "../models/interfaces/APIUser.model";
import { RootState } from "../store/store";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/users`,
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
    xauthenticate: builder.query({
      query: (token) => {
        return {
          url: "/authenticate",
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    getCurrentUserProfile: builder.mutation<User, string>({
      query: (token) => {
        return {
          url: "/profile",
          method: "GET",
        };
      },
      transformResponse: (response: { user: APIUser }) => {
        return new User(response.user);
      },
    }),

    getOtherUserProfile: builder.query<User, { uid: string }>({
      query: (uid) => `/${uid}/profile`,
      transformResponse: (response: { user: APIUser }) => {
        return new User(response.user);
      },
    }),

    logoutFromAllDevices: builder.mutation({
      query: () => {
        return {
          url: "/logout",
          method: "GET",
        };
      },
    }),

    getMyOwnedPhones: builder.mutation<APIOwnedPhone, number>({
      query: (round) => {
        return {
          url: `/phones?round=${round}`,
          method: "GET",
        };
      },
    }),

    getOthersOwnedPhones: builder.query<
      APIOwnedPhone[],
      { round: number; uid: string }
    >({
      keepUnusedDataFor: 0,
      query: ({ round, uid }) => `/${uid}/phones?round=${round}`,
      transformResponse: (response: { phones: APIOwnedPhone[] }) => {
        return response.phones;
      },
    }),
  }),
});
//auto-generated hooks
export const {
  useLazyXauthenticateQuery,
  useGetCurrentUserProfileMutation,
  useLogoutFromAllDevicesMutation,
  useGetMyOwnedPhonesMutation,
  useGetOthersOwnedPhonesQuery,
  useGetOtherUserProfileQuery,
} = usersApi;
