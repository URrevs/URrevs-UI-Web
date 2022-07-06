import { useTheme } from "@emotion/react";
import { useAppSelector } from "../../store/hooks";
import GoogleIcon from "../Icons/GoogleIcon";
import { AuthenticationButton } from "./AuthenticationButton";

export const GoogleButton = ({ onClick }) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const theme = useTheme();
  return (
    <AuthenticationButton
      alt="google logo"
      onClick={onClick}
      color={theme.palette.authenticationButtons.googleButtonColor}
      text={textContainer.googleAuth}
      textColor="65676B"
      image={<GoogleIcon />}
    ></AuthenticationButton>
  );
};
