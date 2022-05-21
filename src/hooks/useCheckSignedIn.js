import { useAppSelector, useAppDispatch } from "../store/hooks";
import { regDialogActions } from "../store/uiRegisterDialogSlice";

export const useCheckSignedIn = () => {
  const currentUser = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  function checkSignedIn() {
    if (!currentUser.isLoggedIn) {
      console.log("show reg");
      dispatch(regDialogActions.toggleRegistration());
      return false;
    }
    return true;
  }

  return checkSignedIn;
};
