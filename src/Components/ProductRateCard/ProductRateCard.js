import React from "react";
import { Box, Card, styled, Typography } from "@mui/material";
import { CARD_BORDER_RADIUS } from "../../constants";
const CardStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: `${CARD_BORDER_RADIUS}px`,
}));
export const ProductRateCard = () => {
  return (
    <React.Fragments>
      <CardStyled>
        <Typography variant="S14W400C050505">100</Typography>
      </CardStyled>
    </React.Fragments>
  );
};
