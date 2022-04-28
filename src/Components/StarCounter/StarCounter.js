import React from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Box, styled, Typography } from "@mui/material";
import Star from "../Icons/star";
import { useTheme } from "@emotion/react";

export const StarCounter = (props) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 14,
    borderRadius: 30,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.starCounter.backgroundColor,
      // border: ` 0.2px solid ${theme.palette.starCounter.barBorder}`,
      //   boxSizing: "border-box",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 30,
      backgroundColor: theme.palette.starCounter.barColor,
    },
  }));
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Star size="25" color={theme.palette.starCounter.barColor}></Star>
        <Typography variant="S18W400C050505" sx={{ ml: "1.5px", mr: "1.5px" }}>
          {props.value}
        </Typography>
      </div>
      <Box sx={{ width: "100%" }}>
        <BorderLinearProgress dir="rtl" variant="determinate" {...props} />
      </Box>
    </Box>
  );
};
