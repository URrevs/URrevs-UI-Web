import { useTheme } from "@emotion/react";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTES_NAMES from "../RoutesNames";
import { useAppSelector } from "../store/hooks";

import { MoreVertOutlined } from "@mui/icons-material";
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
} from "@mui/material";

export default function PhoneListItem({
  title,
  id,
  verificationIcon,
  verificationRatio,
  verifyPhone,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const currentUserId = useAppSelector((state) => state.auth.uid);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  /////////////////////////////////////////////
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const verifyMenu = () => {
    return (
      <Stack key={id} direction="row" spacing={1}>
        <div>
          <IconButton
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            sx={{}}
          >
            <MoreVertOutlined />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper
                  sx={{
                    borderRadius: "15px",
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      sx={{ padding: "0" }}
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        sx={{ padding: "10px 28px", minHeight: 0 }}
                        onClick={() => {
                          verifyPhone(id);
                          setOpen(false);
                        }}
                      >
                        <Typography variant="S16W700C050505">
                          {textContainer.verify}
                        </Typography>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
    );
  };

  return (
    <React.Fragment key={id}>
      <ListItem
        secondaryAction={
          verificationRatio === 0 && currentUserId === userId && verifyMenu()
        }
        sx={{ padding: 0, margin: 0, lineHeight: 0 }}
      >
        <ListItemButton
          sx={{
            padding: 0,
            padding: "0 12px",
          }}
          onClick={() => {
            navigate(
              `/${ROUTES_NAMES.PHONE_PROFILE}/${ROUTES_NAMES.SPECS}?pid=${id}`
            );
          }}
        >
          <ListItemIcon>
            <SmartphoneRoundedIcon sx={{ fontSize: 40 }} />
          </ListItemIcon>
          <div style={{ padding: "12px 6px" }}>
            <span>
              <Typography
                style={{
                  ...theme.typography.S20W700C050505,
                  lineHeight: 1,
                }}
              >
                {title}
                {verificationIcon(verificationRatio)}
              </Typography>
            </span>

            <Typography
              style={{
                ...theme.typography.S18W400C65676B,
              }}
            >
              {textContainer.smartphone}
            </Typography>
          </div>
        </ListItemButton>
      </ListItem>
      <Divider sx={{ padding: 0, color: theme.palette.divider }} />
    </React.Fragment>
  );
}
