import { Avatar, Box } from "@mui/material";
import React from "react";
import { InteractionCard } from "./InteractionCard";

export const InteractionBody = ({
  user,
  text,
  buttonName,
  subtitle,
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
            subtitle={subtitle}
            likes={likes}
            renderIcon={renderIcon}
          ></InteractionCard>
          <Box
            sx={{
              display: "flex",
              marginLeft: "8px",
              paddingTop: "2px",
              alignItems: "center",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </div>
  );
};
