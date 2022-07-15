import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue, createAsyncThunk } from "@reduxjs/toolkit";
import { authActions } from "../authSlice";
import { RootState } from "../store";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const { dispatch, getState } = api;

    const state = getState();

    // TODO:
    // update token if expiry date is soon
    // const expirationDate: Date = new Date(
    //   (state as RootState).auth.expiration * 1000
    // );
    // const isRefreshing: boolean = (state as RootState).auth.refetch;
    // const currentDate: Date = new Date();

    // if (expirationDate.getTime()) {
    //   const timeLeft: boolean =
    //     expirationDate.getTime() - currentDate.getTime() < 1000;

    //   if (timeLeft && isRefreshing === false) {
    //     dispatch(authActions.toggleRefetch({ refetch: true }));
    //   }
    // }

    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn(action);
      const serverMessage: string = action.payload.data.status;

      if (serverMessage === "invalid token") {
        // to get new token
        document.location.reload();
        dispatch(authActions.toggleRefetch({ refetch: true }));
      }
      createAsyncThunk("", action);
    }

    return next(action);
  };
