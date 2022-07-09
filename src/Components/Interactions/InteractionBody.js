import { Avatar, Box, Grid, IconButton, Stack } from "@mui/material";
import React from "react";
import { InteractionCard } from "./InteractionCard";
import { Link } from "react-router-dom";
import ROUTES_NAMES from "../../RoutesNames";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useTheme } from "@emotion/react";

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
  const [showReportMenu, setShowReportMenu] = React.useState(true);
  const theme = useTheme();
  return (
    <div
      style={{
        whiteSpace: "pre-line",
        wordBreak: "break-all",
      }}
      onMouseEnter={() => {
        setShowReportMenu(true);
      }}
      onMouseLeave={() => {
        setShowReportMenu(false);
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Link to={`../${ROUTES_NAMES.USER_PROFILE}?userId=${userId}`}>
          <Avatar
            src={avatar}
            sx={{ marginRight: "6px", height: avatarSize, width: avatarSize }}
          ></Avatar>
        </Link>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <InteractionCard
              userName={userName}
              userId={userId}
              text={text}
              ownedAt={ownedAt}
              likes={likes}
              renderIcon={renderIcon}
            />
            <div style={{ position: "absolute", left: "-34px" }}>
              {!theme.isMobile && showReportMenu && (
                // <div>...</div>
                <IconButton>
                  <MoreHorizIcon
                    sx={{
                      fontSize: "16px",
                    }}
                  />
                </IconButton>
              )}
            </div>
          </div>
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
