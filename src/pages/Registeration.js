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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { logout, signIn } from "../Authentication/auth";
import { authActions } from "../store/authSlice";
import {
  useAuthenticateMutation,
  useGetCurrentUserProfileMutation,
} from "../services/users";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const Registeration = ({
  handleRegistrationClose,
  openRegistration = false,
}) => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const us = useAppSelector((state) => state.auth);
  console.log(us);

  const [signingError, setSigningError] = useState(null);

  const [getApiToken] = useAuthenticateMutation();
  const [getProfile] = useGetCurrentUserProfileMutation();

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
    logout();
    dispatch(authActions.logout());
  };

  useEffect(() => {
    async function signIn(user) {
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
    }

    getAuth().onAuthStateChanged((user) => {
      if (user) {
        signIn(user);
        try {
        } catch (error) {
          console.log(error);
        }
      }
    });
  }, []);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openRegistration}
      onClose={handleRegistrationClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openRegistration}>
        <Box sx={{ ...modalStyle, bgcolor: theme.palette.modalColor }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {!isLoggedIn && (
              <List>
                <ListItem>
                  <FacebookLoginButton
                    variant="contained"
                    style={{ width: "240px" }}
                    onClick={() => signInHandler("Facebook")}
                  >
                    Facebook
                  </FacebookLoginButton>
                </ListItem>
                <ListItem>
                  <GoogleLoginButton
                    variant="contained"
                    style={{ width: "240px" }}
                    onClick={() => signInHandler("Google")}
                  >
                    Google
                  </GoogleLoginButton>
                </ListItem>
              </List>
            )}
            {isLoggedIn && <Button onClick={() => signout()}>Logout</Button>}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Registeration;
