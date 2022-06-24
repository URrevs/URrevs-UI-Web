import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import FacebookIcon from "../Icons/FacebookIcon";
import GoogleBadge from "../Icons/GooglePlayStoreBadge";
import LinkedIn from "../Icons/LinkedIn";

export const Footer = () => {
  const textContainer = useAppSelector((state) => state.language.textContainer);
  const pageContainer = {
    followUs: textContainer.followUs,
    downloadTheApp: textContainer.downloadTheApp,
  };
  return (
    <Paper>
      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={2}>
          <Typography variant="S18W400C050505">
            {pageContainer.downloadTheApp}
          </Typography>
          <div style={{ height: "12px" }}></div>
          <GoogleBadge />
        </Grid>
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          item
          md={7}
        >
          <div
            style={{
              height: "100%",
            }}
          ></div>
          <Typography variant="S18W400C050505">
            Copyrights © URrevs 2022{" "}
          </Typography>
        </Grid>
        <Grid item md={1}>
          <Typography variant="S18W400C050505">
            {pageContainer.followUs}
          </Typography>
          <Box sx={{ display: "flex", padding: "15px 0px 10px 0px" }}>
            <FacebookIcon />
            <div style={{ width: "12px" }}></div>
            <LinkedIn />
          </Box>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>
    </Paper>
  );
};
