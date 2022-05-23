import { Avatar, Box } from "@mui/material";
import React from "react";
import { InteractionCard } from "./InteractionCard";

export const InteractionBody = ({
  user,
  text,
  ownedAt,
  likes,
  children,
  renderIcon,
  avatar,
  avatarSize = "44px",
}) => {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Avatar
          src={avatar}
          sx={{ marginRight: "6px", height: avatarSize, width: avatarSize }}
        ></Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <InteractionCard
            user={user}
            text={text}
            ownedAt={ownedAt}
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
