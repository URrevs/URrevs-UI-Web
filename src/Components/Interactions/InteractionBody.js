import {
  Avatar,
  Box,
  Card,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { InteractionCard } from "./InteractionCard";
import { Link } from "react-router-dom";
import ROUTES_NAMES from "../../RoutesNames";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useTheme } from "@emotion/react";
import { useAppSelector } from "../../store/hooks";
import CheckIcon from "@mui/icons-material/Check";
import { useCheckSignedIn } from "../../hooks/useCheckSignedIn";

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
  reportFunction = null,
}) => {
  const checkSignedIn = useCheckSignedIn();
  const [showReportMenu, setShowReportMenu] = React.useState(false);
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const uid = useAppSelector((state) => state.auth.uid);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [timeoutId, setTimeoutId] = React.useState();
  const [modal, setModal] = React.useState("");
  const handleClick = (event) => {
    if (checkSignedIn()) setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      onMouseEnter={() => {
        setShowReportMenu(Boolean(reportFunction) && true);
      }}
      onMouseLeave={() => {
        setShowReportMenu(false);
      }}
      onTouchStart={(e) => {
        setTimeoutId(
          setTimeout(() => {
            if (checkSignedIn()) setModal("report");
          }, 500)
        );
      }}
      onTouchEnd={() => {
        clearTimeout(timeoutId);
      }}
    >
      <Modal
        open={modal === "report" && Boolean(reportFunction)}
        direction={theme.direction}
        onClose={() => {
          setModal("");
        }}
      >
        <Card
          sx={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            borderRadius: "15px 15px 0px 0px",
            padding: "15px",
          }}
          onClick={(e) => {
            e.stopPropagation();
            reportFunction();
            setModal("");
          }}
        >
          <Typography variant="S18W700C050505">
            {textContainer.report}
          </Typography>
        </Card>
      </Modal>
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
              alt={`${userName} profile picture`}
            >
              <Avatar />
            </Avatar>
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
