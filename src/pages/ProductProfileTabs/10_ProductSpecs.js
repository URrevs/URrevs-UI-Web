import { useTheme } from "@emotion/react";
import CompareOutlinedIcon from "@mui/icons-material/CompareOutlined";
import HelpIcon from "@mui/icons-material/Help";
import { Box, Card, Grid, IconButton, Modal, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { FaButton } from "../../Components/Buttons/FaButton";
import { CompareDialog } from "../../Components/Dialogs/CompareDialog/CompareDialog";
import { CompareItem } from "../../Components/Dialogs/CompareDialog/CompareItem";
import { HorizontalPhoneList } from "../../Components/HorizontalPhoneList/HorizontalPhoneList";
import LoadingSpinner from "../../Components/Loaders/LoadingSpinner";
import { ProductOverviewCard } from "../../Components/OverviewCard/ProductOverviewCard";
import ProductDetailsTable from "../../Components/ProductDetailsTable";
import { CARD_BORDER_RADIUS } from "../../constants";
import {
  useGetPhoneSpecsQuery,
  useGetSimilarPhonesQuery,
  useGetStatisticalInfoQuery,
} from "../../services/phones";

const CardStyled = styled(
  Card,
  {}
)((theme) => ({
  borderRadius: `${CARD_BORDER_RADIUS}px`,
  marginBottom: "15px",
  padding: "16px",
  display: "flex",
  justifyContent: "center",
}));

export const ProductSpecsScreen = () => {
  const textContainer = useSelector((state) => state.language.textContainer);

  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("pid");

  let { isLoading, error, isFetching, data } = useGetPhoneSpecsQuery(paramId);

  const componentDictionary = {
    productImage: textContainer.productImage,
    specs: textContainer.tabBarSpecs,
    similarPhones: textContainer.similarPhones,
    compareWithAnotherProduct: textContainer.compareWithAnotherProduct,
  };

  const [open, setOpen] = React.useState(false);

  const {
    data: statistical,
    isLoading: statisticalLoading,
    error: statisticalError,
  } = useGetStatisticalInfoQuery(data._id, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: similarPhones,
    isLoading: similarPhoneLoading,
    error: similarPhoneError,
  } = useGetSimilarPhonesQuery(data._id);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const ComparePaper = (item) => (
    <CardStyled>
      <CompareItem item={item} />
    </CardStyled>
  );

  const overviewCard = () =>
    statisticalLoading ? (
      <LoadingSpinner />
    ) : statisticalError ? (
      <div>{statisticalError.data.status}</div>
    ) : (
      <div
        style={{
          marginTop: "10px",
        }}
      >
        <ProductOverviewCard
          productRating={statistical.generalRating}
          companyRating={statistical.companyRating}
          viewer={statistical.views}
          owned={statistical.owned}
          ratings={[
            statistical.uiRating,
            statistical.manufacturingQuality,
            statistical.valueForMoney,
            statistical.camera,
            statistical.callQuality,
            statistical.battery,
          ]}
          paramId={paramId}
          phone={data.name}
          type="هاتف ذكي"
        />
      </div>
    );

  const compareWithOtherProducts = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <FaButton
        icon={
          <CompareOutlinedIcon sx={{ fontSize: "28px", color: "#FFFFFF" }} />
        }
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
          <Typography variant="S14W700Cffffff">
            {componentDictionary.compareWithAnotherProduct}
          </Typography>
        </Box>
      </FaButton>
      <Modal open={open} onClose={handleClose}>
        <CompareDialog item={data} handleClose={handleClose} />
      </Modal>
    </Box>
  );

  const similarPhonesComponent = () => (
    <div>
      {similarPhoneLoading ? (
        <LoadingSpinner />
      ) : similarPhoneError ? (
        <div>{similarPhoneError.data.status}</div>
      ) : (
        <Fragment>
          <Typography variant="S18W700C050505">
            {componentDictionary.similarPhones + ":"}
          </Typography>
          <HorizontalPhoneList items={similarPhones} />
        </Fragment>
      )}
    </div>
  );

  return (
    <React.Fragment>
      <Grid container>
        {/* Right Grid */}
        <Grid item xl={2} lg={1} md={0.5} xs={0}></Grid>
        {/* Center Grid */}
        <Grid item xl={5.2} lg={5} md={5} xs={12}>
          {!theme.isMobile && <div style={{ height: "20px" }}></div>}

          {theme.isMobile && overviewCard()}
          <Typography variant="S18W700C050505">
            {componentDictionary.productImage + ":"}
          </Typography>
          <CardStyled elevation={3}>
            <img alt="im" src={data.picture}></img>
          </CardStyled>
          {/* Padding on Desktop 32px  */}
          {!theme.isMobile && <div style={{ height: "32px" }}></div>}
          <Typography
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
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
          <ProductDetailsTable phoneData={data} />
          {theme.isMobile ? similarPhonesComponent() : null}
          {theme.isMobile ? compareWithOtherProducts() : null}
        </Grid>
        <Grid item xl={0.5} lg={0.5} md={0.5} xs={0}></Grid>
        {/* Left Grid*/}
        <Grid item xl={3.8} lg={5} md={6} xs={0}>
          {theme.isMobile ? null : (
            <div
              style={{
                height: "100%",
                // margin: "-50px 50px 0px 0px",
              }}
            >
              <div
                style={{
                  position: "sticky",
                  top: "65px",
                  // padding: "65px 0px",
                  maxHeight: "90vh",
                  overflowY: "auto",
                }}
              >
                <div style={{ height: "36.5px" }}></div>
                {overviewCard()}
                <div style={{ height: "19px" }}></div>
                {similarPhonesComponent()}
                <div style={{ height: "23px" }}></div>
                {ComparePaper(data)}
              </div>
            </div>
          )}
        </Grid>
        <Grid item xl={0.5} lg={0.5} md={0.5} xs={0}></Grid>
      </Grid>
    </React.Fragment>
  );
};
