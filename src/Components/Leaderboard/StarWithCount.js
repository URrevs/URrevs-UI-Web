import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import React from "react";
import { useConvertNumberToHumanLanguage } from "../../hooks/useMillify";
import { RoundedStar } from "../Icons/star";

export default function StarWithCount({
  value,
  textStyle,
  starSize,
  prizeIcon = null,
}) {
  const theme = useTheme();

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "end" }}
    >
      {prizeIcon}
      <RoundedStar
        color={theme.palette.reviewCard.filledStarColor}
        size={starSize}
      />

      <Typography
        sx={{
          minWidth: "20px",
        }}
        variant={textStyle}
      >
        {useConvertNumberToHumanLanguage(value)}
      </Typography>
    </div>
  );
}
