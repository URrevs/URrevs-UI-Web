import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import Dictionary from "../../Dictionary";
import { RootState } from "../store";
import { postingModalActions } from "../uiPostingModalSlice";
import { snackbarActions } from "../uiSnackbarSlice";

interface Error {
  message: string;
  isError: boolean;
  path: string;
}

const correspondingErrorMessage = (
  serverMessage: string,
  textContainer: Dictionary,
  action: any
): Error => {
  let error: Error = {
    message: "",
    isError: true,
    path: "",
  };
  console.log(action);
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
    case "past date":
      error.message = textContainer.youHaveSelectedDateBeforePhoneRelease;
      break;
    case "already reviewed":
      error.message = textContainer.youHaveAlreadyReviewedThisPhoneBefore;
      break;
    case "not owned":
      if (action.meta.arg.endpointName === "addCommentOnPhoneQuestion") {
        error.message = textContainer.youHaventReviewedThatPhone;
        error.path = `../phone/specs?pid=${action.meta.arg.originalArgs.phoneId}`;
      } else error.message = textContainer.youCantAnswerAQuestionMessage;
      break;
    //TO DO : WRITE TRANSLATIONS AND FIND MORE ERRORS
    // case "track internal server error":
    //   error.message = textContainer.trackInternalServerError;
    //   break;
    case "already liked":
      error.message = "textContainer.alreadyLiked";
      error.isError = false;
      break;
    case "already unliked":
      error.message = "textContainer.alreadyUnliked";
      error.isError = false;
      break;
    case "no likes":
      error.message = "textContainer.noLikes";
      error.isError = false;
      break;
    case "not found":
      error.message = "textContainer.notFound";
      error.isError = false;
      break;
    // case "not owned":
    //   error.message = textContainer.notOwned;
    //   break;
    case "not yet":
      error.message = "textContainer.notYet";
      error.isError = false;
      break;
    // case "not accepted":
    //   error.message = textContainer.notAccepted;
    //   break;
    // case "already reviewed":
    //   error.message = textContainer.alreadyReviewed;
    //   break;
    // case "invalid referral code":
    //   error.message = textContainer.invalidReferralCode;
    //   break;
    case "already reported":
      error.message = textContainer.youHaveAlreadyReportedThisElement;
      break;
    // case "blocked":
    //   error.message = textContainer.blocked;
    //   break;
    case "already accepted":
      error.message = "textContainer.alreadyAccepted";
      error.isError = false;
      break;
    default:
      error.message = textContainer.unknownNetworkError;
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
      // console.log(action);
      const serverMessage: string = action.payload.data.status;
      const message: Error = correspondingErrorMessage(
        serverMessage,
        textContainer,
        action
      );
      // console.log(message.isError);
      if (message.isError) {
        dispatch(
          snackbarActions.showSnackbar({
            message: message.message,
            showActionBtn: message.path !== "",
            actionBtnText: textContainer.reviewNow,
            //Edit Here Fady !!
            // actionBtnFunction: () => {
            //   dispatch(
            //     postingModalActions.showPostingModal({
            //       tab: 0, //Question Tab
            //       type:"phone",
            //       id:action.meta.arg.originalArgs.phoneId,
            //       name:""// Phone name
            //     })
            //   );
            // },
            actionNavPath: message.path,
          })
        );
      }
    }

    return next(action);
  };
