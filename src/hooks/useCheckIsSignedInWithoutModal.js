import { useAppSelector } from "../store/hooks";

export const useCheckSignedInWithoutModal = () => {
  const currentUser = useAppSelector((state) => state.auth);

  function checkSignedIn() {
    if (!currentUser.isLoggedIn) {
      return false;
    }
    return true;
  }

  return checkSignedIn;
};
