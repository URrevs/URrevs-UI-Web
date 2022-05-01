import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

export const CircularProductRate = ({
  value,
  barPrimaryColor,
  barSecondaryColor,
  thickness = 2.5,
}) => {
  return (
    <Box>
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
          thickness={2.5}
        />
        <CircularProgress
          size="56px"
          sx={{
            color: barPrimaryColor,
          }}
          variant="determinate"
          value={(value * 100) / 5}
          thickness={thickness}
        />

        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            // padding: "16px 13px 11px 14px",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography variant="S24W500C050505">{value}</Typography>
            <Typography variant="S20W500C050505">{`/5`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
