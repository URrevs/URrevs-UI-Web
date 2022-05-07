import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import APIUpdate from "../models/interfaces/APIUpdate.model";
import { RootState } from "../store/store";

export const updateApi = createApi({
  reducerPath: "updateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}/targets`,
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
    getLastUpdateInfo: builder.query<APIUpdate, any>({
      query: () => "/update/latest",
    }),

    update: builder.mutation({
      query: () => {
        return {
          url: "/updat",
          method: "GET",
        };
      },
    }),
  }),
});
//auto-generated hooks
export const { useGetLastUpdateInfoQuery, useUpdateMutation } = updateApi;
