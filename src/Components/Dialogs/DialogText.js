import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { DialogTemplate } from "./DialogTemplate";

export const DialogText = ({ text }) => {
  return (
    <Fragment>
      <DialogTemplate>
        <Typography variant="S14W500C050505">{text}</Typography>
      </DialogTemplate>
    </Fragment>
  );
};
