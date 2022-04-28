import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

export const CircularProductRate = () => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value="60" />
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
        <Typography variant="caption" component="div" color="text.secondary">
          {`3/5`}
        </Typography>
      </Box>
    </Box>
  );
};
