import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { DialogTemplate } from "./DialogTemplate";

export const PrizeDialog = ({ prize, prizeImgSrc }) => {
  return (
    <Fragment>
      <DialogTemplate title="جائزة المسابقة:">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="S22W800C050505">{prize}</Typography>
          <img
            alt=""
            src={prizeImgSrc}
            style={{
              alignSelf: "center",
              margin: "10px 0px",
              height: "120px",
              width: "auto",
            }}
          />
        </Box>
      </DialogTemplate>
    </Fragment>
  );
};
