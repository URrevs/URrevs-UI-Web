import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";

export const FooterButton = ({ number, icon, isClickable, onClickHandler }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        display: "flex",
        verticalAlign: "middle",
        cursor: isClickable ? "pointer" : "default",
      }}
      onClick={onClickHandler}
    >
      {icon}
      {/* spaceing between icon and number */}
      <div style={{ width: "6px" }}></div>
      {/* counter beside icon*/}
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
