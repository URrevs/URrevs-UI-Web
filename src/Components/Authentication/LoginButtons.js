import { useTheme } from "@emotion/react";
import { Button, styled, Typography } from "@mui/material";
import React, { Fragment } from "react";
import GoogleLogo from "../Icons/google";

// To be added to text.ts file
const authenticationPage = {
  ar: {
    GoogleButton: "أكمل بإستخدام جوجل",
    FacebookButton: "أكمل بإستخدام فيسبوك",
  },
};
const GoogleButton = styled(
  Button,
  {}
)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "12px 6px 12px 12px",

  position: "absolute",
  width: "280px",
  height: "48px",
  left: "64px",
  top: "354px",
  boxShadow: `0px 2px 6px ${theme.palette.authenticationButtons.googleButtonColor}`,
  border: `1.5px solid ${theme.palette.authenticationButtons.googleButtonColor}`,
  borderRadius: "26px",
}));
export const AuthenticationButtons = () => {
  const theme = useTheme();
  return (
    <div>
      <Fragment>
        <GoogleButton>
          <Typography variant="S18W700C65676B">
            {authenticationPage.ar.GoogleButton}
          </Typography>
          <img
            src="./images/google.png"
            alt="google logo"
            width="40 px"
            height="40 px"
            style={{
              left: "230px",
              top: "4px",
              flex: "none",
              order: "1",
              flexGrow: "0",
              margin: "0px 3px",
            }}
          />
        </GoogleButton>
      </Fragment>
    </div>
  );
};
