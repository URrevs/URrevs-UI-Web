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
export const ProductRateCard = ({
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="S14W500C050505">{`${text}:`}</Typography>
      <StarRating readOnly={true} starValue={value}></StarRating>
    </Box>
  );
  return (
    <React.Fragment>
      <CardStyled>
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="S18W700C050505">{phone}</Typography>
              <Typography variant="S14W400C65676B">{type}</Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <RemoveRedEyeRoundedIcon />
              <Typography variant="S14W400C050505">
                {useConvertNumberToHumanLanguage(viewer)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
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
            padding: "5px 19px 19px 21px",
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
              value={productRating}
            />
            <Typography variant="S14W500C050505">
              {textContainer.generalCompanyRating}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            padding: "0px 67px 19px 67px",
          }}
        >
          {renderStarReview(textContainer.userInterface, 4)}
          {renderStarReview(textContainer.manufacturingQuality, 5)}
          {renderStarReview(textContainer.priceQuality, 4)}
          {renderStarReview(textContainer.camera, 3)}
          {renderStarReview(textContainer.callsQuality, 1)}
          {renderStarReview(textContainer.battery, 5)}
        </Box>
      </CardStyled>
    </React.Fragment>
  );
};
