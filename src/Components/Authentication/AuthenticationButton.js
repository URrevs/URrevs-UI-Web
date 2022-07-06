import { Button, styled, Typography } from "@mui/material";

const LoginButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ theme, color }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 13px",
  width: "100%",
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
  onClick,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: 48,
        width: "100%",
      }}
    >
      <LoginButton color={color} onClick={onClick}>
        {image}
        <div style={{ width: "10px" }}></div>
        <Typography variant={`S18W700C${textColor}`}>{text}</Typography>
      </LoginButton>
    </div>
  );
};
