import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import React from "react";
import { useConvertNumberToHumanLanguage } from "../../hooks/useMillify";
import { RoundedStar } from "../Icons/star";

export default function StarWithCount({
  value,
  textStyle,
  starSize,
  isWinner = false,
}) {
  const theme = useTheme();

  return (
    <div style={{ display: "flex", alignItems: "end" }}>
      {isWinner && <div>icon</div>}
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
