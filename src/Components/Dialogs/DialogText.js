import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { DialogTemplate } from "./DialogTemplate";

export const DialogText = ({ text, handleClose }) => {
  return (
    <Fragment>
      <DialogTemplate handleClose={handleClose}>
        <Typography variant="S14W500C050505">{text}</Typography>
      </DialogTemplate>
    </Fragment>
  );
};
