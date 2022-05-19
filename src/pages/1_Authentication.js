import { useTheme } from "@emotion/react";
import { getAuth } from "@firebase/auth";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  List,
  ListItem,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { logout, signIn } from "../Authentication/auth";
import { FacebookButton } from "../Components/Authentication/FacebookButton";
import { GoogleButton } from "../Components/Authentication/GoogleButton";
import {
  useAuthenticateMutation,
  useGetCurrentUserProfileMutation,
  useLogoutFromAllDevicesMutation,
} from "../services/users";
import { authActions } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { regDialogActions } from "../store/uiRegisterDialogSlice";
import { DialogTemplate } from "../Components/Dialogs/DialogTemplate";

const ModalBox = styled(
  Box,
  {}
)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  [theme.breakpoints.down("md")]: {
    width: "calc(100% - 32px)",
  },
  boxShadow: 24,
  padding: 16,
  borderRadius: 15,
  background: theme.palette.modalColor,
}));

const Registeration = ({}) => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const openRegistration = useAppSelector(
    (state) => state.regDialog.registration
  );
  const [isLoading, setIsLoading] = useState(false);

  const [signingError, setSigningError] = useState(null);
  const [signOutError, setSignOutError] = useState(null);

  const [getApiToken] = useAuthenticateMutation();
  const [getProfile] = useGetCurrentUserProfileMutation();
  const [logoutFromAllDevices] = useLogoutFromAllDevicesMutation();

  const theme = useTheme();

  const signInHandler = async (provider) => {
    // firebase sign-in
    const { user, error } = await signIn(provider);
    setSigningError(error);

    // auth api user
    try {
      setIsLoading(true);

      const { token: apiToken } = await getApiToken(user.accessToken).unwrap();
      const userProfile = await getProfile(apiToken).unwrap();

      dispatch(
        authActions.login({
          isLoggedIn: true,
          uid: userProfile.uid,
          refCode: userProfile.refCode,
          photo: userProfile.photo,
          apiToken: apiToken,
          name: userProfile.name,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          email: user.email,
          points: userProfile.points,
        })
      );
      setIsLoading(false);
      handleRegistrationClose();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const signout = () => {
    setSignOutError(logout());
    dispatch(authActions.logout());
  };

  const logOutFromAllDevices = async () => {
    try {
      await logoutFromAllDevices();
      await setSignOutError(logout());
      dispatch(authActions.logout());
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegistrationClose = () => {
    dispatch(regDialogActions.toggleRegistration());
  };

  return (
    <Modal
      aria-labelledby="register"
      aria-describedby="urrevs registeration"
      open={isLoading ? true : openRegistration}
      onClose={handleRegistrationClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      dir={theme.direction}
    >
      <Fade in={isLoading ? true : openRegistration}>
        <div>
          <DialogTemplate handleClose={() => handleRegistrationClose()}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {isLoading && <CircularProgress />}
              {!isLoggedIn && !isLoading && (
                <div>
                  <Typography
                    style={{ display: "flex", justifyContent: "center" }}
                    variant="S20W700C050505"
                  >
                    انضم الى يورفز
                  </Typography>
                  <List>
                    <ListItem>
                      <GoogleButton onClick={() => signInHandler("Google")} />
                    </ListItem>
                    <ListItem>
                      <FacebookButton
                        onClick={() => signInHandler("Facebook")}
                      />
                    </ListItem>
                  </List>
                </div>
              )}
              {/* {isLoggedIn && <Button onClick={() => signout()}>Logout</Button>}
              {isLoggedIn && (
                <Button onClick={() => logOutFromAllDevices()}>
                  Logout from all
                </Button>
              )} */}
            </div>
          </DialogTemplate>
        </div>
      </Fade>
    </Modal>
  );
};

export default Registeration;
