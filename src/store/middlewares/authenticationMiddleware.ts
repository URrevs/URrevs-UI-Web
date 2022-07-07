import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { getMutationCacheKey } from "@reduxjs/toolkit/dist/query/core/buildSlice";
import { authActions } from "../authSlice";
import { RootState } from "../store";
import { snackbarActions } from "../uiSnackbarSlice";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const { dispatch, getState } = api;

    const state = getState();

    // TODO:
    // update token if expiry date is soon
    // new Date(expiryDate) - new Date() < 900 000 (15 min)
    // to get new token
    // dispatch(authActions.toggleRefetch());

    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      const expirationDate = (state as RootState).auth.expiration;
      console.log(expirationDate);

      console.warn(action);
      const serverMessage: string = action.payload.data.status;

      if (serverMessage === "invalid token") {
        // to get new token
        dispatch(authActions.toggleRefetch());
      }
    }

    return next(action);
  };
