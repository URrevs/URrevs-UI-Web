import { AuthenticationButton } from "./AuthenticationButton";
import { styled } from "@mui/styles";
import React from "react";
import { useTheme } from "@emotion/react";

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
export const GoogleButton = () => {
  const theme = useTheme();
  return (
    <AuthenticationButton
      alt="google logo"
      color={theme.palette.authenticationButtons.googleButtonColor}
      text={authenticationPage.ar.GoogleButton}
      textColor="65676B"
      imageSrc="./images/google.png"
    ></AuthenticationButton>
  );
};
