import { useTheme } from "@emotion/react";
import { Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

const BottomCardActionBtn = ({ icon, title, onClickAction, isHighlighted }) => {
  const theme = useTheme();
  return (
    <Button
      onClick={onClickAction}
      startIcon={icon}
      style={{
        width: "100%",
        color: isHighlighted
          ? theme.palette.reviewCard.actionBtnIconHighlight
          : theme.palette.reviewCard.actionBtnIcon,
        "&:hover": { backgroundColor: "#000" },
        "&:active": {
          backgroundColor: "#fff",
        },
      }}
      size="large"
    >
      <Typography variant={isHighlighted ? "S16W700C2196F3" : "S16W700C606266"}>
        {title}
      </Typography>
    </Button>
  );
};

export default BottomCardActionBtn;
