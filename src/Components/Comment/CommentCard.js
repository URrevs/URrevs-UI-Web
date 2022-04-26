import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Card, styled, Typography } from "@mui/material";

const CommentCardStyle = styled(
  Card,
  {}
)(({ theme }) => ({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  overflow: "unset",
  padding: "8px 12px",
  borderRadius: "12px",
  backgroundColor: theme.palette.commentCard.backgroundColor,
}));
const LikeCounterStyle = styled(
  Card,
  {}
)(({ theme }) => ({
  padding: "0px 3px",
  minHeight: "15px",
  minWidth: "33px",
  borderRadius: "50px",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  bottom: "-4px",
  right: "-15px",
}));

export const CommentCard = ({ user, text, likes }) => {
  return (
    <div>
      <CommentCardStyle>
        <Typography variant="S14W700C050505">{user}</Typography>
        <Typography variant="S14W400C000000">{text}</Typography>
        <LikeCounterStyle>
          <ThumbUpIcon
            sx={{
              fontSize: "14px",
              color: "#2196F3",
            }}
          />
          <div style={{ width: "3px" }}></div>
          <Typography variant="S14W400C050505">{likes}</Typography>
        </LikeCounterStyle>
      </CommentCardStyle>
    </div>
  );
};
