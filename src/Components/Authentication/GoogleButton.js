import { AuthenticationButton } from "./AuthenticationButton";
import { styled } from "@mui/styles";
import React from "react";
import { useTheme } from "@emotion/react";
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
export const GoogleButton = () => {
  const theme = useTheme();
  return (
    <AuthenticationButton
      alt="google logo"
      color={theme.palette.authenticationButtons.googleButtonColor}
      text={authenticationPage.ar.GoogleButton}
      textColor="65676B"
      image={
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_195_684)">
            <path
              d="M35.8166 20.3032C35.8166 18.9755 35.7089 18.0067 35.4757 17.002H20.3154V22.9943H29.2142C29.0348 24.4835 28.066 26.7261 25.913 28.2331L25.8829 28.4337L30.6763 32.1471L31.0084 32.1803C34.0583 29.3635 35.8166 25.219 35.8166 20.3032"
              fill="#2196F3"
            />
            <path
              d="M20.3154 36.0915C24.6751 36.0915 28.335 34.6561 31.0084 32.1803L25.913 28.2331C24.5495 29.184 22.7195 29.8478 20.3154 29.8478C16.0454 29.8478 12.4213 27.0311 11.1294 23.1379L10.9401 23.154L5.95581 27.0114L5.89062 27.1926C8.5459 32.4672 14 36.0915 20.3154 36.0915Z"
              fill="#34A853"
            />
            <path
              d="M11.1294 23.1379C10.7885 22.1332 10.5913 21.0567 10.5913 19.9444C10.5913 18.8319 10.7885 17.7555 11.1115 16.7508L11.1025 16.5368L6.05573 12.6175L5.89061 12.6961C4.79625 14.8849 4.1683 17.3429 4.1683 19.9444C4.1683 22.5458 4.79625 25.0037 5.89061 27.1926L11.1294 23.1379"
              fill="#FBBC05"
            />
            <path
              d="M20.3154 10.0408C23.3474 10.0408 25.3927 11.3505 26.5589 12.445L31.116 7.99551C28.3172 5.39404 24.6751 3.79727 20.3154 3.79727C14 3.79727 8.5459 7.42137 5.89062 12.696L11.1115 16.7508C12.4213 12.8576 16.0454 10.0408 20.3154 10.0408"
              fill="#EB4335"
            />
          </g>
          <defs>
            <clipPath id="clip0_195_684">
              <rect
                width="31.6667"
                height="32.4055"
                fill="white"
                transform="translate(4.16666 3.79725)"
              />
            </clipPath>
          </defs>
        </svg>
      }
    ></AuthenticationButton>
  );
};
