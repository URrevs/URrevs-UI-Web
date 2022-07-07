import { Avatar, Box } from "@mui/material";
import React from "react";
import { InteractionCard } from "./InteractionCard";
import { Link } from "react-router-dom";
import ROUTES_NAMES from "../../RoutesNames";

export const InteractionBody = ({
  text,
  ownedAt,
  likes,
  children,
  renderIcon,
  avatar,
  avatarSize = "44px",
  userId,
  userName,
}) => {
  return (
    <div
      style={{
        whiteSpace: "pre-line",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Link to={`../${ROUTES_NAMES.USER_PROFILE}?userId=${userId}`}>
          <Avatar
            src={avatar}
            sx={{ marginRight: "6px", height: avatarSize, width: avatarSize }}
          ></Avatar>
        </Link>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <InteractionCard
            userName={userName}
            userId={userId}
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
