import React from "react";
import { styled, Button, Typography, ButtonBase } from "@mui/material";
const CommentButton = styled(
  ButtonBase,
  {}
)((theme) => ({
  marginRight: "8px",
  padding: 0,
  lineHeight: 0,
  ".MuiTypography-root": {
    fontFamily: "Tajawal",
  },
}));

export const InteractionFooter = ({
  date,
  buttonName,
  onClickHandler,
  condition,
  reply,
}) => {
  return (
    <React.Fragment>
      <div style={{ marginLeft: "4px" }}>
        <CommentButton onClick={onClickHandler}>
          <Typography variant={condition ? "S13W700C2196F3" : "S13W700C050505"}>
            {buttonName}
          </Typography>
        </CommentButton>
        {!reply ? (
          <CommentButton>
            <Typography variant={"S13W700C050505"}>رد</Typography>
          </CommentButton>
        ) : null}
      </div>
      <Typography variant="S13W400C65676B">{date}</Typography>
    </React.Fragment>
  );
};
