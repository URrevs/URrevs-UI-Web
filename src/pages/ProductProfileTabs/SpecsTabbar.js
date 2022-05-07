import { useTheme } from "@emotion/react";
import CompareOutlinedIcon from "@mui/icons-material/CompareOutlined";
import HelpIcon from "@mui/icons-material/Help";
import {
  Box,
  Button,
  Card,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ButtonPage from "../../Components/Buttons/ButtonPage";
import { CompareDialog } from "../../Components/Dialogs/CompareDialog/CompareDialog";
import LoadingSpinner from "../../Components/Loaders/LoadingSpinner";
import { ProductOverviewCard } from "../../Components/OverviewCard/ProductOverviewCard";
import ProductDetailsTable from "../../Components/ProductDetailsTable";
import { CARD_BORDER_RADIUS } from "../../constants";
import { useGetPhoneSpecsQuery } from "../../services/phones";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("pid");
  const textContainer = useSelector((state) => state.language.textContainer);
  const componentDictionary = {
    productImage: textContainer.productImage,
    specs: textContainer.tabBarSpecs,
    similarPhones: textContainer.similarPhones,
    compareWithAnotherProduct: textContainer.compareWithAnotherProduct,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isLoading, error, isFetching, data } = useGetPhoneSpecsQuery(paramId);

  const theme = useTheme();
  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
            <img alt="im" src={data.picture}></img>
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
            <img alt="im" src={data.picture}></img>
          </CardStyled>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <ButtonPage
              sx={{ background: theme.palette.defaultPageBtn }}
              onClick={handleOpen}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <CompareOutlinedIcon
                  sx={{ fontSize: "28px", color: "#FFFFFF" }}
                />
                <Typography variant="S14W700Cffffff">
                  {componentDictionary.compareWithAnotherProduct}
                </Typography>
              </Box>
            </ButtonPage>
            <Modal open={open} onClose={handleClose}>
              <CompareDialog item={data.name} handleClose={handleClose} />
            </Modal>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};