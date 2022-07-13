import { useTheme } from "@emotion/react";
import {
  Backdrop,
  CircularProgress,
  Fade,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { signIn } from "../Authentication/auth";
import { FacebookButton } from "../Components/Authentication/FacebookButton";
import { GoogleButton } from "../Components/Authentication/GoogleButton";
import { DialogTemplate } from "../Components/Dialogs/DialogTemplate";
import { useLazyXauthenticateQuery } from "../services/users";
import { authActions } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { regDialogActions } from "../store/uiRegisterDialogSlice";

// const ModalBox = styled(
//   Box,
//   {}
// )(({ theme }) => ({
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "80%",
//   [theme.breakpoints.down("md")]: {
//     width: "calc(100% - 32px)",
//   },
//   boxShadow: 24,
//   padding: 16,
//   borderRadius: 15,
//   background: theme.palette.modalColor,
// }));

const Registeration = ({}) => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const openRegistration = useAppSelector(
    (state) => state.regDialog.registration
  );
  const [signingError, setSigningError] = useState(null);
  const [signOutError, setSignOutError] = useState(null);

  const theme = useTheme();

  const [getUserProfile, { isLoading }] = useLazyXauthenticateQuery();

  const signInHandler = async (provider) => {
    // firebase sign-in
    const { user, error } = await signIn(provider);
    setSigningError(error);

    // auth api user

    const { data } = await getUserProfile(user.accessToken);

    if (data) {
      dispatch(
        authActions.login({
          accessToken: user.accessToken,
          isLoggedIn: true,
          expiration: data.exp,
          apiToken: data.token,
          isAdmin: data.admin,
          uid: data.profile._id,
          refCode: data.profile.refCode,
          photo: data.profile.picture,
          name: data.profile.name,
          points: data.profile.points,
          requestedDelete: data.profile.requestedDelete,
        })
      );
    }

    handleRegistrationClose();
  };

  const handleRegistrationClose = () => {
    dispatch(regDialogActions.toggleRegistration());
  };

  const textContainer = useAppSelector((state) => state.language.textContainer);

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
                    {textContainer.joinUrrevs}
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
