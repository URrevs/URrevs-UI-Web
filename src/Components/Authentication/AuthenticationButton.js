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
  en: {
    GoogleButton: "Continue with Google",
    FacebookButton: "Continue with Facebook",
  },
};
const LoginButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ theme, color }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "12px 24px",
  height: "48px",
  boxShadow: `0px 2px 6px 0px ${color} `,
  border: `1.5px solid  ${color}`,
  borderRadius: "26px",
}));
export const AuthenticationButton = ({ text, imageSrc, alt, color }) => {
  console.log(color);
  const theme = useTheme();
  return (
    <Fragment>
      <LoginButton color={color}>
        <img
          src={imageSrc}
          alt={alt}
          width="40 px"
          height="40 px"
          style={{
            margin: "0px 3px",
          }}
        />
        <Typography variant="S18W700C65676B">{text}</Typography>
      </LoginButton>
    </Fragment>
  );
};
