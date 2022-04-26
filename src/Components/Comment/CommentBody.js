import React from "react";
import { Avatar, Box } from "@mui/material";
import { CommentCard } from "./CommentCard";
import { CommentFooter } from "./CommentFooter";

export const CommentBody = ({
  user,
  text,
  buttons,
  likes,
  date,
  avatar = "44px",
}) => {
  return (
    <div style={{ marginLeft: "20px" }}>
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{ marginRight: "6px", height: avatar, width: avatar }}
        ></Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CommentCard user={user} text={text} likes={likes}></CommentCard>
          <CommentFooter date={date} buttons={buttons}></CommentFooter>
        </Box>
      </Box>
    </div>
  );
};
