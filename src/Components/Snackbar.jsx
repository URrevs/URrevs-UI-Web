import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { snackbarActions } from "../store/uiSnackbarSlice";

export default function CustomizedSnackbar() {
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
        <Button color="secondary" size="small" onClick={actionFn}>
          {actionText}
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
