import { useAppDispatch } from "../store/hooks";
import { snackbarActions } from "../store/uiSnackbarSlice";

export const useShowSnackbar = (message) => {
  const dispatch = useAppDispatch();

  function showSnackBar(message) {
    dispatch(snackbarActions.showSnackbar({ message: message }));
  }

  return showSnackBar;
};
