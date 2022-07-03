import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { snackbarActions } from "./uiSnackbarSlice";
import { RootState } from "./store";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const { dispatch, getState } = api;

    const state = getState();

    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      const serverMessage: string = action.payload.data.status;

      dispatch(
        snackbarActions.showSnackbar({
          message: "message",
        })
      );
      console.warn(action);
    }

    return next(action);
  };
