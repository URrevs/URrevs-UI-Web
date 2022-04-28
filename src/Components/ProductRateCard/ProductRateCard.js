import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import { Box, Button, Card, Grid, styled, Typography } from "@mui/material";
import React from "react";

import { CARD_BORDER_RADIUS } from "../../constants";
import { useConvertNumberToHumanLanguage } from "../../hooks/useMillify";
import StarRating from "../Form/StarRating";
import { CircularProductRate } from "./CircularProductRate";
const CardStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: `${CARD_BORDER_RADIUS}px`,
}));
const textContainer = {
  addProduct: "تعين كمنتج ممتلك",
  generalProductReview: "التقيم العام للمنتج",
  generalBrandReview: "التقيم العام للشركة",
  ui: "واجهة المستخدم",
  manufactureQuality: "جودة التصنيع",
  price: "القيمة للسعر",
  camera: "الكاميرا",
  callQuality: "جودة المكالمة",
  battery: "البطارية",
};
export const ProductRateCard = ({ viewer, phone, type }) => {
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
          <Button variant="outlined">{textContainer.addProduct}</Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CircularProductRate></CircularProductRate>
          <CircularProductRate></CircularProductRate>
        </Box>
        <Box>
          <StarRating text="asdasd" isVertical={false}></StarRating>
          <StarRating text="asdasd" isVertical={false}></StarRating>
          <StarRating text="asdasd" isVertical={false}></StarRating>
          <StarRating text="asdasd" isVertical={false}></StarRating>
          <StarRating text="asdasd" isVertical={false}></StarRating>
          <StarRating text="asdasd" isVertical={false}></StarRating>
          <StarRating text="asdasd" isVertical={false}></StarRating>
        </Box>
      </CardStyled>
    </React.Fragment>
  );
};
