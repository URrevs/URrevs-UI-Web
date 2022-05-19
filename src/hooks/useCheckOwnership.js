import { useAppSelector, useAppDispatch } from "../store/hooks";
import { snackbarActions } from "../store/uiSnackbarSlice";

export const useCheckOwnership = ({ ownerId, message }) => {
  const currentUser = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (currentUser.uid === ownerId) {
    dispatch(
      snackbarActions.showSnackbar({
        message: "You can not like your own comment",
      })
    );
    return false;
  }
  return true;
};
