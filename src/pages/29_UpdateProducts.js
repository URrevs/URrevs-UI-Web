import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import CompanyList from "../Components/ProductList/CompanyList";
import ProductList from "../Components/ProductList/ProductList";
import { useGetLastUpdateInfoQuery } from "../services/update";
import {useConvertDateToString} from '../hooks/useConvertDateToString'

export const UpdateProducts = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const pageDictionry = {
    updateProductsList: textContainer.updateProductsList,
    lastUpdate: "اخر تحديث تم يدوياً/ذاتياً في (تاريخ)",
    completeSuccess: "اكتمل بنجاح",
    updateFailed: "فشل التحديث",
  };

  const { isLoading, isFetching, isError, error, data } =
    useGetLastUpdateInfoQuery();

  const isAutomatic = data.automatic;
  const updateDate = useConvertDateToString(data.date);

  return (
    <CustomAppBar
      showBackBtn
      showLabel
      label={pageDictionry.updateProductsList}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <div>{error.data.status}</div>
      ) : (
        <div style={{ margin: "0px 14.6px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "5px",
            }}
          >
            <Typography variant="S18W700C000000">
              {pageDictionry.lastUpdate}
            </Typography>
            <Typography variant="S16W400C65676b">
              {pageDictionry.completeSuccess}
            </Typography>
          </Box>
          <ProductList />
          <br></br>
          <CompanyList />
        </div>
      )}
    </CustomAppBar>
  );
};
