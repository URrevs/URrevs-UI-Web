import { Button, styled, Typography } from "@mui/material";
import React, { Fragment } from "react";

const LoginButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ theme, color }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  width: "80%",
  boxShadow: `2px 2px 6px -2px ${color} `,
  border: `1.5px solid  ${color}`,
  borderRadius: "26px",
}));
export const AuthenticationButton = ({
  text,
  textColor,
  image,
  alt,
  color,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", minHeight: 48 }}>
      <LoginButton color={color}>
        {image}
        <div style={{ width: "10px" }}></div>
        <Typography variant={`S18W700C${textColor}`}>{text}</Typography>
      </LoginButton>
    </div>
  );
};
