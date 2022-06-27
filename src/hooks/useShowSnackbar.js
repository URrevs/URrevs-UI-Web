import { useAppSelector, useAppDispatch } from "../store/hooks";
import { snackbarActions } from "../store/uiSnackbarSlice";

export const useShowSnackbar = (message) => {
  const dispatch = useAppDispatch();
  const textContainer = useAppSelector((state) => state.language.textContainer);

  function showSnackBar(message) {
    console.log("show snackbar");
    dispatch(snackbarActions.showSnackbar({ message: message }));
  }

  return showSnackBar;
};
