import { AuthenticationButton } from "./AuthenticationButton";
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
export const FacebookButton = () => {
  const theme = useTheme();
  return (
    <AuthenticationButton
      alt="facebook logo"
      color={theme.palette.authenticationButtons.facebookButtonColor}
      text={authenticationPage.ar.FacebookButton}
      textColor="2196F3"
      image={
        <svg
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M37.1668 20C37.1668 10.8 29.7002 3.33334 20.5002 3.33334C11.3002 3.33334 3.8335 10.8 3.8335 20C3.8335 28.0667 9.56683 34.7833 17.1668 36.3333V25H13.8335V20H17.1668V15.8333C17.1668 12.6167 19.7835 10 23.0002 10H27.1668V15H23.8335C22.9168 15 22.1668 15.75 22.1668 16.6667V20H27.1668V25H22.1668V36.5833C30.5835 35.75 37.1668 28.65 37.1668 20Z"
            fill="#1372E6"
          />
        </svg>
      }
    ></AuthenticationButton>
  );
};
