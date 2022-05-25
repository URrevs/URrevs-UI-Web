import React, { Fragment } from "react";
import { DialogTemplate } from "../DialogTemplate";
import { CompareItem } from "./CompareItem";

export const CompareDialog = ({ item, handleClose }) => {
  return (
    <Fragment>
      <DialogTemplate handleClose={handleClose}>
        <CompareItem item={item} />
      </DialogTemplate>
    </Fragment>
  );
};
