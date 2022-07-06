import { AuthenticationButton } from "./AuthenticationButton";
import React from "react";
import { useTheme } from "@emotion/react";
import FacebookIcon from "../Icons/FacebookIcon";
import { useAppSelector } from "../../store/hooks";

export const FacebookButton = ({ onClick }) => {
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
