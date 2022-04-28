import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import { Box, Button, Card, styled, Typography } from "@mui/material";
import React from "react";
import { CARD_BORDER_RADIUS } from "../../constants";
import StarRating from "../Form/StarRating";
import { CircularProductRate } from "./CircularProductRate";
const CardStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: `${CARD_BORDER_RADIUS}px`,
}));
export const ProductRateCard = ({ viewer }) => {
  return (
    <React.Fragment>
      {/* <CardHeader
        title={
          <div>
            aaa aaaaaa aaaaaaa aaaa aaaa aaaaaaaa a
            <br />
            aaaaaa aaaaaaaaaaaa
          </div>
        }
        action={
          <Box sx={{ display: "flex" }}>
            <RemoveRedEyeRoundedIcon />
            <Typography variant="S14W400C050505">{viewer}</Typography>
          </Box>
        }
      ></CardHeader> */}
      <CardStyled>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="S18W700C050505">Nokia 7 Plus</Typography>
            <Typography variant="S14W400C65676B">Smart phone</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <RemoveRedEyeRoundedIcon />
            <Typography variant="S14W400C050505">{viewer}</Typography>
          </Box>
        </Box>
        <Button variant="outlined">AAAAAAAAAAAAAAAAAAa</Button>
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
