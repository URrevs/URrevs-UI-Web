import { useShowSnackbar } from "./useShowSnackbar";

export const useShareSnackbar = (endpoint) => {
  const showSnackbar = useShowSnackbar();

  function showShareSnackbar(endpoint,text) {
    navigator.clipboard.writeText(endpoint);

    showSnackbar(text);
  }

  return showShareSnackbar;
};
