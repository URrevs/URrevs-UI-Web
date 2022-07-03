import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { snackbarActions } from "./uiSnackbarSlice";
import { RootState } from "./store";
import Dictionary from "../Dictionary";

const correspondingErrorMessage = (
  serverMessage: string,
  textContainer: Dictionary
): string => {
  switch (serverMessage) {
    case "invalid token":
      return textContainer.invalidToken;
    case "you are not an admin":
      return textContainer.youAreNotAdmin;
    default:
      return textContainer.internalServerError;
      break;
  }
};

export const snackbarErrorHandle: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const { dispatch, getState } = api;

    const state = getState();
    const textContainer = (state as RootState).language.textContainer;

    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      const serverMessage: string = action.payload.data.status;

      const message: string = correspondingErrorMessage(
        serverMessage,
        textContainer
      );

      dispatch(
        snackbarActions.showSnackbar({
          message: message,
        })
      );
      console.log(action);
    }

    return next(action);
  };
