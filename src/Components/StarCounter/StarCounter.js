import React from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Box, styled, Typography } from "@mui/material";
import { RoundedStar } from "../Icons/star";
import { useTheme } from "@emotion/react";
import ProgressBar from "@ramonak/react-progress-bar";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 14,
  borderRadius: 30,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.progressBar.backgroundColor,
    // border: ` 0.2px solid ${theme.palette.starCounter.barBorder}`,
    //   boxSizing: "border-box",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 30,
    backgroundColor: theme.palette.progressBar.barColor,
  },
}));

export const StarCounter = ({ value }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <RoundedStar
          size="25"
          color={theme.palette.progressBar.barColor}
        ></RoundedStar>
        {/* <Typography variant="S18W400C050505" sx={{ ml: "1.5px", mr: "1.5px" }}>
          {value}
        </Typography> */}
      </div>
      <div style={{ width: 6 }}></div>
      <Box sx={{ width: "100%" }}>
        <ProgressBar
          dir={theme.direction}
          completed={value}
          isLabelVisible={false}
          borderRadius="30px"
          height="14px"
          bgColor={theme.palette.progressBar.barColor}
          baseBgColor={theme.palette.progressBar.backgroundColor}
        />
      </Box>
    </Box>
  );
};
