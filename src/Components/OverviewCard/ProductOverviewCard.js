import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import { Box, Button, Card, Grid, styled, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { CARD_BORDER_RADIUS, BUTTON_BORDER_RADIUS } from "../../constants";
import { useConvertNumberToHumanLanguage } from "../../hooks/useMillify";
import StarRating from "../Form/StarRating";
import { CircularProductRate } from "./CircularProductRate";
import { useTheme } from "@emotion/react";
import { OverviewCard } from "./OverviewCard";
import { StarLine } from "../StarLine";
const CardStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: `${CARD_BORDER_RADIUS}px`,
}));
const ButtonStyled = styled(
  Button,
  {}
)((theme) => ({
  borderRadius: `${BUTTON_BORDER_RADIUS}px`,
  padding: "6px 3px 6px 6px",
  background: "#2196F359",
}));
export const ProductOverviewCard = ({
  viewer,
  phone,
  type,
  productRating,
  companyRating,
}) => {
  const textContainer = useSelector((state) => {
    return state.language.textContainer;
  });
  const theme = useTheme();
  const renderStarReview = (text, value) => (
    <StarLine label={text} value={value} />
  );
  return (
    <React.Fragment>
      <OverviewCard viewer={viewer} title={phone} subtitle={type}>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "5px 0px" }}
        >
          <ButtonStyled elevation="3" variant="contained">
            <PlaylistAddOutlinedIcon
              sx={{ color: theme.palette.productRateCard.addPlaylistIconColor }}
            ></PlaylistAddOutlinedIcon>
            <Typography variant="S14W400C050505">
              {textContainer.setAsOwnedPhone}
            </Typography>
          </ButtonStyled>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "0px 3px 19px 0px",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProductRate
              barPrimaryColor={theme.palette.productRateCard.barPrimaryColor}
              barSecondaryColor={
                theme.palette.productRateCard.barSecondaryColor
              }
              value={productRating}
            />
            <Typography variant="S14W500C050505">
              {textContainer.generalProductRating}
            </Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProductRate
              barPrimaryColor={theme.palette.productRateCard.barPrimaryColor}
              barSecondaryColor={
                theme.palette.productRateCard.barSecondaryColor
              }
              value={companyRating}
            />
            <Typography variant="S14W500C050505">
              {textContainer.generalCompanyRating}
            </Typography>
          </Box>
        </Box>
        <Box>
          {renderStarReview(textContainer.userInterface, 4)}
          {renderStarReview(textContainer.manufacturingQuality, 5)}
          {renderStarReview(textContainer.priceQuality, 4)}
          {renderStarReview(textContainer.camera, 3)}
          {renderStarReview(textContainer.callsQuality, 1)}
          {renderStarReview(textContainer.battery, 5)}
        </Box>
      </OverviewCard>
    </React.Fragment>
  );
};
