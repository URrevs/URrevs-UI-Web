import { AuthenticationButton } from "./AuthenticationButton";
import React from "react";
import { useTheme } from "@emotion/react";
import FacebookIcon from "../Icons/FacebookIcon";
import { useAppSelector } from "../../store/hooks";

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
export const FacebookButton = ({onClick}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const theme = useTheme();
  return (
    <AuthenticationButton
      alt="facebook logo"
      onClick={onClick}
      color={theme.palette.authenticationButtons.facebookButtonColor}
      text={textContainer.facebookAuth}
      textColor="2196F3"
      image={<FacebookIcon />}
    ></AuthenticationButton>
  );
};
