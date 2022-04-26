import { AuthenticationButton } from "./AuthenticationButton";
import React from "react";
import { useTheme } from "@emotion/react";
import FacebookIcon from "../Icons/FacebookIcon";

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
export const FacebookButton = () => {
  const theme = useTheme();
  return (
    <AuthenticationButton
      alt="facebook logo"
      color={theme.palette.authenticationButtons.facebookButtonColor}
      text={authenticationPage.ar.FacebookButton}
      textColor="2196F3"
      image={<FacebookIcon />}
    ></AuthenticationButton>
  );
};
