import React from "react";
import { styled, Button, Typography, Box } from "@mui/material";
const CommentButton = styled(
  Button,
  {}
)((theme) => ({
  margin: 0,
  padding: 0,
  lineHeight: 0,
  //   fontFamily: "Tajawal",
}));

export const CommentFooter = ({ date, buttons }) => {
  return (
    <div>
      {buttons.map((button) => (
        <CommentButton key={button}>
          <Typography variant="S13W700C050505">{button}</Typography>
        </CommentButton>
      ))}
      <Typography variant="S13W400C65676B">{date}</Typography>
    </div>
  );
};
