import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import React from "react";
import { useConvertNumberToHumanLanguage } from "../../hooks/useMillify";
import { RoundedStar } from "../Icons/star";

export default function StarWithCount({ value, textStyle, starSize }) {
  const theme = useTheme();

  return (
    <div style={{ display: "flex", alignItems: "end" }}>
      <RoundedStar
        color={theme.palette.reviewCard.filledStarColor}
        size={starSize}
      />
      <Typography variant={textStyle}>
        {useConvertNumberToHumanLanguage(value)}
      </Typography>
    </div>
  );
}
