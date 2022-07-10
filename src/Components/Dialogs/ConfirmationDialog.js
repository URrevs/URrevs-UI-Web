import { useTheme } from "@emotion/react";
import { Button, Modal, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { confirmationActions } from "../../store/uiConfirmationModalSlice";
import { ConfirmationBody } from "./ConfiramtionBody";
import { DialogTemplate } from "./DialogTemplate";
//Will be used in all confirmations in the application
export const ConfirmationDialog = () => {
  const show = useAppSelector((state) => state.confirmation.show);
  const title = useAppSelector((state) => state.confirmation.title);
  const warningText = useAppSelector((state) => state.confirmation.warningText);
  const yesAction = useAppSelector((state) => state.confirmation.yesAction);
  const noAction = useAppSelector((state) => state.confirmation.noAction);
  const textContainer = useAppSelector((state) => state.language.textContainer);

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const handleClose = () => {
    dispatch(confirmationActions.hideConfirmation());
  };
  return (
    <Modal open={show} onClose={handleClose} dir={theme.direction}>
      <div>
        <ConfirmationBody
          title={title}
          warningText={warningText}
          yesAction={yesAction}
          noAction={noAction}
        />
      </div>
    </Modal>
  );
};
