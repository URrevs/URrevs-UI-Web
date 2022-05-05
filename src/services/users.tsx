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
      console.log(token);
      if (token && endpoint !== "authenticate") {
        headers.set("authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    authenticate: builder.mutation({
      query: (token) => {
        return {
          url: "/authenticate",
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getCurrentUserProfile: builder.mutation<User, string>({
      query: (token) => {
        return {
          url: "/profile",
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
          },
        };
      },
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
    getMyOwnedPhones: builder.query<APIOwnedPhone, number>({
      query: (round) => `/phones?round=${round}`,
    }),
  }),
});
//auto-generated hooks
export const {
  useAuthenticateMutation,
  useGetCurrentUserProfileMutation,
  useLogoutFromAllDevicesMutation,
  useGetMyOwnedPhonesQuery,
} = usersApi;
