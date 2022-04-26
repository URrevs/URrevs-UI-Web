import React from "react";
import { Avatar, Box } from "@mui/material";
import { InteractionCard } from "./InteractionCard";
import { InteractionFooter } from "./InteractionFooter";

export const InteractionBody = ({
  user,
  text,
  buttonName,
  likes,
  date,
  condition,
  children,
  reply,
  onClickHandler,
  renderIcon,
  avatar = "44px",
}) => {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{ marginRight: "6px", height: avatar, width: avatar }}
        ></Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <InteractionCard
            user={user}
            text={text}
            likes={likes}
            renderIcon={renderIcon}
          ></InteractionCard>
          {children}
        </Box>
      </Box>
    </div>
  );
};
