import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import OrangeGradientButton from "../Components/Buttons/OrangeGradientButton";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import CompanyList from "../Components/ProductList/CompanyList";
import ProductList from "../Components/ProductList/ProductList";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";

export const UpdateProducts = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const pageDictionary = {
    updateProductsList: textContainer.updateProductsList,
    lastUpdate: "اخر تحديث تم يدوياً/ذاتياً في (تاريخ)",
    completeSuccess: "اكتمل بنجاح",
    updateFailed: "فشل التحديث",
    updateProducts: textContainer.updateProducts,
    updating: textContainer.updating,
  };
  return (
    <CustomAppBar
      showBackBtn
      showLabel
      label={pageDictionary.updateProductsList}
    >
      <div style={{ margin: "0px 14.6px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "5px",
          }}
        >
          <Typography variant="S18W700C000000">
            {pageDictionary.lastUpdate}
          </Typography>
          <Typography variant="S16W400C65676b">
            {pageDictionary.completeSuccess}
          </Typography>
        </Box>
        <ProductList />
        <br></br>
        <CompanyList />

        <OrangeGradientButton
          color="red"
          sx={{
            width: "100%",
            marginTop: "275px", //CHANGE IT AFTER REMOVING THE DOUBLE APPBAR
          }}
        >
          <UpdateRoundedIcon sx={{ fontSize: "28px", marginRight: "6.5px" }} />
          <Typography variant="S18W700Cffffff">
            {pageDictionary.updateProducts}
          </Typography>
        </OrangeGradientButton>
      </div>
    </CustomAppBar>
  );
};
