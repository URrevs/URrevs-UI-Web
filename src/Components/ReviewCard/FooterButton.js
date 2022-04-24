import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";

export const FooterButton = ({ number, icon, isClickable }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        display: "flex",
        verticalAlign: "middle",
        cursor: isClickable ? "pointer" : "default",
      }}
    >
      {icon}
      <div style={{ width: "6px" }}></div>
      <Typography
        sx={{
          "&:hover": {
            textDecoration: isClickable ? "underline" : "none",
          },
        }}
        variant="S14W400C65676b"
      >
        {number}
      </Typography>
    </div>
  );
};

export default FooterButton;
