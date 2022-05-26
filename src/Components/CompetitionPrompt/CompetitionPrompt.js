import { Card, styled } from "@mui/material";
import React from "react";
import { DialogTemplate } from "../Dialogs/DialogTemplate";
import { CompetitionBody } from "./CompetitionBody";

export const CompetitionPrompt = ({ handleClose }) => {
  return (
    <React.Fragment>
      <DialogTemplate handleClose={handleClose}>
        <CompetitionBody />
      </DialogTemplate>
    </React.Fragment>
  );
};
