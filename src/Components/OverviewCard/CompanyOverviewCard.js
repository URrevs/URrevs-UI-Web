import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { CircularProductRate } from "./CircularProductRate";
import { OverviewCard } from "./OverviewCard";

export const CompanyOverviewCard = ({
  viewer,
  companyName,
  type,
  companyRating,
}) => {
  const theme = useTheme();
  const textContainer = useSelector((state) => {
    return state.language.textContainer;
  });
  return (
    <React.Fragment>
      <OverviewCard viewer={viewer} title={companyName} subtitle={type}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProductRate
            barPrimaryColor={theme.palette.productRateCard.barPrimaryColor}
            barSecondaryColor={theme.palette.productRateCard.barSecondaryColor}
            value={companyRating}
          />
          <Typography variant="S14W500C050505">
            {textContainer.generalCompanyRating}
          </Typography>
        </Box>
      </OverviewCard>
    </React.Fragment>
  );
};
