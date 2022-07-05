import { useAppSelector, useAppDispatch } from "../store/hooks";
import { snackbarActions } from "../store/uiSnackbarSlice";
import { useShowSnackbar } from "./useShowSnackbar";

export const useShareSnackbar = (endpoint) => {
  const showSnackbar = useShowSnackbar();

  function showShareSnackbar(endpoint,text) {
    navigator.clipboard.writeText(endpoint);

    showSnackbar(text);
  }

  return showShareSnackbar;
};
