import { useTheme } from "@emotion/react";
import { Button, Modal, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { confirmationActions } from "../../store/uiConfirmationModalSlice";
import { DialogTemplate } from "./DialogTemplate";
//Will be used in all confirmations in the application
export const ConfirmationBody = ({
  title,
  warningText,
  yesAction,
  noAction,
}) => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const theme = useTheme();
  return (
    <React.Fragment>
      <DialogTemplate handleClose={noAction} title={title}>
        <Typography variant="S16W500C050505">{warningText}</Typography>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="text"
            // type="submit"
            sx={{
              color: theme.colors.ce41d1d,
            }}
            onClick={(e) => {
              yesAction();
            }}
          >
            {textContainer.yes}
          </Button>
          <Button
            variant="text"
            sx={{
              color: "#050505",
            }}
            onClick={noAction}
          >
            {textContainer.no}
          </Button>
        </div>
      </DialogTemplate>
    </React.Fragment>
  );
};
