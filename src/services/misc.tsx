import { authActions } from "../store/authSlice";
import { RootState } from "../store/store";
import { confirmationActions } from "../store/uiConfirmationModalSlice";
import { snackbarActions } from "../store/uiSnackbarSlice";
import { mainApi } from "./main";

const miscApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    deleteAccount: build.mutation({
      query: () => {
        return {
          url: `/misc/mydata/delete`,
          method: "POST",
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            authActions.setRequestedDelete({
              requestedDelete: true,
            })
          );
          // dispatch(
          //   snackbarActions.showSnackbar({
          //     message: `${textContainer.postedSuccessfully}. ${textContainer.youHaveEarned} ${response.data.earnedPoints} ${textContainer.point}`,
          //     showActionBtn: true,
          //     actionBtnText: textContainer.seePost,
          //     actionNavPath: `../phone-review?id=${response.data.review._id}`,
          //   })
          // );
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
    undoDeleteRequest: build.mutation({
      query: () => {
        return {
          url: "/misc/mydata/delete/undo",
          method: "PUT",
        };
      },
      async onQueryStarted(payload, { dispatch, getState, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const state = getState();
          const textContainer = (state as RootState).language.textContainer;
          dispatch(
            authActions.setRequestedDelete({
              requestedDelete: false,
            })
          );
          // dispatch(
          //   snackbarActions.showSnackbar({
          //     message: `${textContainer.postedSuccessfully}. ${textContainer.youHaveEarned} ${response.data.earnedPoints} ${textContainer.point}`,
          //     showActionBtn: true,
          //     actionBtnText: textContainer.seePost,
          //     actionNavPath: `../phone-review?id=${response.data.review._id}`,
          //   })
          // );
        } catch (e: any) {
          console.error(e);
        }
      },
    }),
  }),

  overrideExisting: false,
});
export const { useDeleteAccountMutation, useUndoDeleteRequestMutation } =
  miscApi;
