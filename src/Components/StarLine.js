import { Grid, Typography } from "@mui/material";
import React from "react";
import StarRating from "./Form/StarRating";

export const StarLine = ({ label, value, readOnly = false }) => {
  return (
    <Grid container>
      <Grid item xs={0} sm={1.5} md={2}></Grid>
      <Grid
        item
        xs={12}
        sm={9}
        md={8}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="S14W500C050505">{label}:</Typography>
        <StarRating starValue={value} isVertical={false} readOnly />
      </Grid>
      <Grid item xs={0} sm={1.5} md={2}></Grid>
    </Grid>
  );
};
