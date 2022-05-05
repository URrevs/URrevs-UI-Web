import { useTheme } from "@emotion/react";
import { getAuth } from "@firebase/auth";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  List,
  ListItem,
  Modal,
  styled,
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

const Registeration = ({
  handleRegistrationClose,
  openRegistration = false,
}) => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const us = useAppSelector((state) => state.auth);
  console.log(us);

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

      handleRegistrationClose();
    } catch (error) {
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

  // useEffect(() => {
  //   const signIn = async (user) => {
  //     const { token: apiToken } = await getApiToken(user.accessToken).unwrap();
  //     const userProfile = await getProfile(apiToken).unwrap();

  //     dispatch(
  //       authActions.login({
  //         isLoggedIn: true,
  //         uid: userProfile.uid,
  //         refCode: userProfile.refCode,
  //         photo: userProfile.photo,
  //         apiToken: apiToken,
  //         name: userProfile.name,
  //         accessToken: user.accessToken,
  //         refreshToken: user.refreshToken,
  //         email: user.email,
  //         points: userProfile.points,
  //       })
  //     );
  //   };

  //   getAuth().onAuthStateChanged(async (user) => {
  //     if (user) {
  //       await signIn(user);
  //       try {
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   });
  // }, []);

  return (
    <Modal
      aria-labelledby="register"
      aria-describedby="urrevs registeration"
      open={openRegistration}
      onClose={handleRegistrationClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      dir={theme.direction}
    >
      <Fade in={openRegistration}>
        <ModalBox>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {!isLoggedIn && (
              <List>
                <ListItem>
                  <GoogleButton onClick={() => signInHandler("Google")} />
                </ListItem>
                <ListItem>
                  <FacebookButton onClick={() => signInHandler("Facebook")} />
                </ListItem>
              </List>
            )}
            {isLoggedIn && <Button onClick={() => signout()}>Logout</Button>}
            {isLoggedIn && (
              <Button onClick={() => logOutFromAllDevices()}>
                Logout from all
              </Button>
            )}
          </div>
        </ModalBox>
      </Fade>
    </Modal>
  );
};

export default Registeration;
