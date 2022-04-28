import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

export const CircularProductRate = ({
  value,
  barPrimaryColor,
  barSecondaryColor,
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        sx={{
          color: barSecondaryColor,
          // animationDuration: "550ms",
          position: "absolute",
          left: 0,
        }}
        variant="determinate"
        value="100"
        size="56px"
      />
      <CircularProgress
        size="56px"
        sx={
          {
            // color: barPrimaryColor,
          }
        }
        variant="determinate"
        value={(value * 100) / 5}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="S20W500C050505">{`${value}/5`}</Typography>
      </Box>
    </Box>
  );
};
