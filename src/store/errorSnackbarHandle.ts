import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { snackbarActions } from "./uiSnackbarSlice";
import { RootState } from "./store";
import Dictionary from "../Dictionary";
import { createSecureServer } from "http2";

interface Error {
  message: string;
  isError: boolean;
}

const correspondingErrorMessage = (
  serverMessage: string,
  textContainer: Dictionary
): Error => {
  let error: Error = {
    message: "",
    isError: true,
  };

  switch (serverMessage) {
    case "invalid token":
      error.message = textContainer.invalidToken;
      break;
    case "process failed":
      error.message = textContainer.processFailed;
      break;
    case "no update operations yet":
      error.message = textContainer.noUpdateOperationsYet;
      break;
    case "you are not an admin":
      error.message = textContainer.youAreNotAdmin;
      break;
    case "there is a running update operation right now":
      error.message = textContainer.thereIsARunningUpdateOperationRightNow;
      break;
    case "bad request":
      error.message = textContainer.badRequest;
      break;
    //TO DO : WRITE TRANSLATIONS AND FIND MORE ERRORS
    // case "track internal server error":
    //   error.message = textContainer.trackInternalServerError;
    //   break;
    // case "already liked":
    //   error.message = textContainer.alreadyLiked;
    //   break;
    // case "already unliked":
    //   error.message = textContainer.alreadyUnliked;
    //   break;
    // case "no likes":
    //   error.message = textContainer.noLikes;
    //   break;
    // case "not found":
    //   error.message = textContainer.notFound;
    //   break;
    // case "not owned":
    //   error.message = textContainer.notOwned;
    //   break;
    // case "not yet":
    //   error.message = textContainer.notYet;
    //   break;
    // case "not accepted":
    //   error.message = textContainer.notAccepted;
    //   break;
    // case "already reviewed":
    //   error.message = textContainer.alreadyReviewed;
    //   break;
    // case "invalid referral code":
    //   error.message = textContainer.invalidReferralCode;
    //   break;
    // case "already reported":
    //   error.message = textContainer.alreadyReported;
    //   break;
    // case "blocked":
    //   error.message = textContainer.blocked;
    //   break;
    // case "already accepted":
    //   error.message = textContainer.alreadyAccepted;
    //   break;
    default:
      error.message = textContainer.internalServerError;
  }
  return error;
};

export const snackbarErrorHandle: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const { dispatch, getState } = api;

    const state = getState();
    const textContainer = (state as RootState).language.textContainer;

    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      const serverMessage: string = action.payload.data.status;

      const message: Error = correspondingErrorMessage(
        serverMessage,
        textContainer
      );
      if (message.isError) {
        dispatch(
          snackbarActions.showSnackbar({
            message: message.message,
          })
        );
      }
      console.log(action);
    }

    return next(action);
  };
