import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import HelpIcon from "@mui/icons-material/Help";
import { ProductOverviewCard } from "../../Components/OverviewCard/ProductOverviewCard";
import { CARD_BORDER_RADIUS } from "../../constants";
import { useTheme } from "@emotion/react";
import ProductDetailsTable from "../../Components/ProductDetailsTable";
import OrangeGradientButton from "../../Components/Buttons/OrangeGradientButton";
import CompareOutlinedIcon from "@mui/icons-material/CompareOutlined";
const CardStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: `${CARD_BORDER_RADIUS}px`,
  marginBottom: "15px",
  padding: "10px 12px 19px 21px",
  display: "flex",
  justifyContent: "center",
}));
export const SpecsTabbar = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const componentDictionary = {
    productImage: textContainer.productImage,
    specs: textContainer.tabBarSpecs,
    similarPhones: textContainer.similarPhones,
    compareWithAnotherProduct: textContainer.compareWithAnotherProduct,
  };
  const theme = useTheme();
  return (
    <React.Fragment>
      <Box sx={{ padding: "10px 12px" }}>
        <ProductOverviewCard
          productRating={3}
          companyRating={3}
          viewer="100"
          phone="Nokia 7 Plus"
          type="هاتف ذكي"
        />
        <Typography variant="S18W700C050505">
          {componentDictionary.productImage + ":"}
        </Typography>
        <CardStyled elevation={3}>
          <img alt="im" src="https://picsum.photos/300/250"></img>
        </CardStyled>
        <Typography
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          variant="S18W700C050505"
        >
          {componentDictionary.specs + ":"}
          <IconButton
            sx={{
              padding: 0,
              marginLeft: "4px",
            }}
          >
            <HelpIcon
              sx={{
                padding: 0,
                fontSize: "25px",
                color: theme.palette.defaultIconColor,
              }}
            />
          </IconButton>
        </Typography>
        <ProductDetailsTable />
        <Typography variant="S18W700C050505">
          {componentDictionary.similarPhones + ":"}
        </Typography>
        <CardStyled elevation={3}>
          <img alt="im" src="https://picsum.photos/300/250"></img>
        </CardStyled>
        <Box
          sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
        >
          <Button
            onClick={() => {}}
            sx={{
              borderRadius: "16px",
              "&:hover": { background: "#fff" },
              "&:active": { background: "#fff" },
              "&:focus": { background: "#fff" },
            }}
          >
            <Typography variant="S18W700C050505">
              <CompareOutlinedIcon sx={{ fontSize: "30px" }} />
              {componentDictionary.compareWithAnotherProduct}
            </Typography>
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};
