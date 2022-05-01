import { Grid, Typography } from "@mui/material";
import React from "react";
import StarRating from "./Form/StarRating";

export const StarLine = ({ label, value }) => {
  return (
    <Grid container>
      <Grid item xs={0} md={2}></Grid>
      <Grid
        item
        xs={12}
        md={8}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="S14W500C050505">{label}:</Typography>
        <StarRating starValue={value} isVertical={false} readOnly />
      </Grid>
      <Grid item xs={0} md={2}></Grid>
    </Grid>
  );
};
