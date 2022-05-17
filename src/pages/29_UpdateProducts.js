import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import CompanyList from "../Components/ProductList/CompanyList";
import ProductList from "../Components/ProductList/ProductList";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import {
  useGetLastUpdateInfoQuery,
  useUpdateMutation,
} from "../services/update";
import { convertDateToString } from "../functions/convertDateToString";
import OrangeGradientButton from "../Components/Buttons/OrangeGradientButton";

export const UpdateProducts = () => {
  const { data, error, isLoading } = useGetLastUpdateInfoQuery();

  const [updateProductsList] = useUpdateMutation();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const textContainer = useSelector((state) => state.language.textContainer);
  const language = useSelector((state) => state.language.language);

  const pageDictionary = {
    updateProductsList: textContainer.updateProductsList,
    lastUpdateDone: "اخر تحديث تم",
    in: "في",
    auto: "تلقائي",
    manual: "يدوي",
    completeSuccess: "اكتمل بنجاح",
    updateFailed: "فشل التحديث",
    updateProducts: textContainer.updateProducts,
    updating: textContainer.updating,
  };

  const handleUpdateProducts = async () => {
    try {
      setButtonLoading(true);
      await updateProductsList();
      setButtonLoading(false);
    } catch (e) {
      setButtonLoading(false);
      setUpdateError(e.data.status);
      console.log(e);
    }
  };

  return (
    <CustomAppBar
      showBackBtn
      showLabel
      label={pageDictionary.updateProductsList}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : error || updateError ? (
        <div>{error.data.status + "\n" + updateError.data.status}</div>
      ) : (
        <div style={{ margin: "0px 14.6px" }}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "5px",
            }}
          >
            <Typography variant="S18W700C000000">
              {`${pageDictionary.lastUpdateDone} ${
                data.automatic ? pageDictionary.auto : pageDictionary.manual
              } ${pageDictionary.in} ${convertDateToString(
                data.date,
                language
              )}`}
            </Typography>
            <Typography variant="S16W400C65676b">
              {data.failed
                ? pageDictionary.updateFailed
                : pageDictionary.completeSuccess}
            </Typography>
          </Box>
          <Box>
            <ProductList list={data.phones} />
            <br></br>
            <CompanyList list={data.companies} />
          </Box>
          {data.isUpdating || buttonLoading ? (
            <div>Update is currently working...</div>
          ) : (
            <Box
              style={{
                bottom: 0,
                marginTop: 16,
              }}
            >
              <OrangeGradientButton
                color="red"
                style={{
                  width: "100%",
                }}
                onClick={() => handleUpdateProducts()}
              >
                <UpdateOutlinedIcon
                  sx={{ fontSize: "28", marginRight: "5px" }}
                />
                <Typography variant="S18W700Cffffff">
                  {pageDictionary.updateProducts}
                </Typography>
              </OrangeGradientButton>
            </Box>
          )}
        </div>
      )}
    </CustomAppBar>
  );
};
