import { Grid } from "@mui/material";
import React from "react";

export const FixedGrid = ({ children }) => {
  return (
    <Grid container style={{}}>
      <Grid item md={2} sm={0.5} xs={0}></Grid>
      <Grid item md={8} sm={11} xs={12}>
        {children}
      </Grid>
      <Grid item md={2} sm={0.5} xs={0}></Grid>
    </Grid>
  );
};
