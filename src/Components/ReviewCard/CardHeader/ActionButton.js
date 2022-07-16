import { MoreVertOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { detectDeviceType } from "../../../functions/detectDevice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { snackbarActions } from "../../../store/uiSnackbarSlice";

export default function ActionButton({
  actionBtnFunction,
  reportFunction,
  verificationRatio = null,
  userId,
  verifyPhone,
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const currentUser = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

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

  return (
    <Stack direction="row" spacing={1}>
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
                    {/* i dont like this */}
                    {currentUser.uid !== userId ? (
                      <React.Fragment>
                        <MenuItem
                          sx={{
                            padding: "10px 28px",
                            minHeight: 0,
                            justifyContent:'center'
                          }}
                          onClick={actionBtnFunction}
                        >
                          <Typography variant="S16W700C050505">
                            {textContainer.iDontLikeThis}
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          sx={{
                            padding: "10px 28px",
                            minHeight: 0,
                            justifyContent:'center'
                          }}
                          onClick={reportFunction}
                        >
                          <Typography variant="S16W700C050505">
                            {textContainer.report}
                          </Typography>
                        </MenuItem>
                      </React.Fragment>
                    ) : (
                      <MenuItem
                        sx={{
                          padding: "10px 28px",
                          minHeight: 0,
                          justifyContent:'center'
                        }}
                        onClick={() => {
                          if (detectDeviceType() !== "mobile") {
                            dispatch(
                              snackbarActions.showSnackbar({
                                message:
                                  textContainer.youMustVerifyFromSameMobileDevice,
                              })
                            );
                          } else {
                            verifyPhone();
                          }
                          setOpen(false);
                        }}
                      >
                        <Typography variant="S16W700C050505">
                          {textContainer.verify}
                        </Typography>
                      </MenuItem>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
