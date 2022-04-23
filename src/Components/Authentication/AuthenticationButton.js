import { Button, styled, Typography } from "@mui/material";
import React, { Fragment } from "react";

const LoginButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ theme, color }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  padding: "12px 24px",
  height: "48px",
  boxShadow: `0px 2px 6px 0px ${color} `,
  border: `1.5px solid  ${color}`,
  borderRadius: "26px",
}));
export const AuthenticationButton = ({
  text,
  textColor,
  imageSrc,
  alt,
  color,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <LoginButton color={color}>
        <img
          src={imageSrc}
          alt={alt}
          width="40 px"
          height="40 px"
          style={{
            margin: "0px 16px",
          }}
        />
        <Typography variant={`S18W700C${textColor}`}>{text}</Typography>
      </LoginButton>
    </div>
  );
};
