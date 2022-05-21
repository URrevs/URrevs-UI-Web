import { useAppSelector, useAppDispatch } from "../store/hooks";
import { snackbarActions } from "../store/uiSnackbarSlice";

export const useCheckOwnership = ({ ownerId, message }) => {
  const currentUser = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  function checkOwnership() {
    if (currentUser.uid === ownerId) {
      dispatch(
        snackbarActions.showSnackbar({
          message: message,
        })
      );
      return false;
    }
    return true;
  }

  return checkOwnership;
};
