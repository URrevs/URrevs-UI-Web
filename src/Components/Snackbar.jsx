import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { snackbarActions } from "../store/uiSnackbarSlice";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import ROUTES_NAMES from "../RoutesNames";
import { useLocation, useNavigate } from "react-router-dom";

export default function CustomizedSnackbar() {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const open = useAppSelector((state) => state.snackbar.show);
  const message = useAppSelector((state) => state.snackbar.message);
  const actionFn = useAppSelector((state) => state.snackbar.actionBtnFunction);
  const actionText = useAppSelector((state) => state.snackbar.actionBtnText);
  const showActionBtn = useAppSelector((state) => state.snackbar.showActionBtn);
  const navPath = useAppSelector((state) => state.snackbar.actionNavPath);

  // for snackbar not to be hidden under bottom nav bar
  const navbarRoutes = [
    ROUTES_NAMES.ALL_PRODUCTS,
    ROUTES_NAMES.ADD_REVIEW,
    ROUTES_NAMES.HOME,
    ROUTES_NAMES.LEADERBOARD,
    ROUTES_NAMES.MENU,
  ];

  const location = useLocation();
  const marginBottom =
    theme.isMobile &&
    navbarRoutes.find((element) => `/${element}` === location.pathname) !==
      undefined
      ? "70px"
      : 0;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(snackbarActions.hideSnackbar());
  };

  const action = (
    <React.Fragment>
      {showActionBtn && (
        <Button
          onClick={
            //if path is given then onClick navigate to that path
            navPath === ""
              ? actionFn
              : () => {
                  navigate(navPath, { replace: true });
                }
          }
          sx={{
            textTransform: "none",
          }}
        >
          <Typography variant="S16W800C2196F3">{actionText}</Typography>
        </Button>
      )}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#C4C4C4",
            borderRadius: "12px",
            ...theme.typography.S16W500C050505,
            lineHeight: 1,
            marginBottom: marginBottom,
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}
