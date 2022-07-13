import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React from "react";
import { InteractionCard } from "./InteractionCard";
import { Link } from "react-router-dom";
import ROUTES_NAMES from "../../RoutesNames";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useTheme } from "@emotion/react";
import { useAppSelector } from "../../store/hooks";
import CheckIcon from "@mui/icons-material/Check";

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
  showCorrectIcon,
  reportFunction = () => {},
}) => {
  const [showReportMenu, setShowReportMenu] = React.useState(false);
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const uid = useAppSelector((state) => state.auth.uid);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      onMouseEnter={() => {
        setShowReportMenu(true);
      }}
      onMouseLeave={() => {
        setShowReportMenu(false);
      }}
    >
      <div
        style={{
          maxWidth: "calc(100% - 20px)",
          whiteSpace: "pre-line",
          wordBreak: "break-word",
        }}
      >
        <Box sx={{ display: "flex" }}>
          {showCorrectIcon ? (
            <CheckIcon
              sx={{
                fontSize: "40px",
                padding: 0,
                color: theme.palette.interactionCard.iconColor,
              }}
            ></CheckIcon>
          ) : null}
          <Link to={`../../${ROUTES_NAMES.USER_PROFILE}?userId=${userId}`}>
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
              {!theme.isMobile && showReportMenu && userId !== uid && (
                <div
                  style={{
                    position: "absolute",
                    left: theme.direction === "rtl" && "-34px",
                    right: theme.direction === "ltr" && "-34px",
                  }}
                >
                  <IconButton onClick={handleClick}>
                    <MoreHorizIcon
                      sx={{
                        fontSize: "16px",
                      }}
                    />
                  </IconButton>
                  <Menu
                    open={anchorEl !== null}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        reportFunction();
                        handleClose();
                        setShowReportMenu(false);
                      }}
                    >
                      {textContainer.report}
                    </MenuItem>
                  </Menu>
                </div>
              )}
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
    </div>
  );
};
