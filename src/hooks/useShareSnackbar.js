import { useAppSelector, useAppDispatch } from "../store/hooks";
import { snackbarActions } from "../store/uiSnackbarSlice";
import { useShowSnackbar } from "./useShowSnackbar";

export const useShareSnackbar = (endpoint) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const showSnackbar = useShowSnackbar();

  function showShareSnackbar(endpoint) {
    console.log("show snackbar");
    navigator.clipboard.writeText(`http://localhost:3000${endpoint}`);
    showSnackbar("تم نسخ رابط المنشور");
  }

  return showShareSnackbar;
};
