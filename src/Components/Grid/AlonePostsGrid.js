import { Grid } from "@mui/material";
import React from "react";

export const AlonePostsGrid = ({ children }) => {
  return (
    <Grid container>
      <Grid item xl={3} lg={2} md={2} sm={0} xs={0}></Grid>
      <Grid item xl={6} lg={8} md={8} sm={12} xs={12}>
        {children}
      </Grid>
      <Grid item xl={3} lg={2} md={2} sm={0} xs={0}></Grid>
    </Grid>
  );
};
