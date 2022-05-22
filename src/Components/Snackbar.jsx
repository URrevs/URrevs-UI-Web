import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { snackbarActions } from "../store/uiSnackbarSlice";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

export default function CustomizedSnackbar() {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const open = useAppSelector((state) => state.snackbar.show);
  const message = useAppSelector((state) => state.snackbar.message);
  const actionFn = useAppSelector((state) => state.snackbar.actionBtnFunction);
  const actionText = useAppSelector((state) => state.snackbar.actionBtnText);
  const showActionBtn = useAppSelector((state) => state.snackbar.showActionBtn);

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
          onClick={actionFn}
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
