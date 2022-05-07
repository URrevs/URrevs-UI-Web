import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import OrangeGradientButton from "../Components/Buttons/OrangeGradientButton";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import CompanyList from "../Components/ProductList/CompanyList";
import ProductList from "../Components/ProductList/ProductList";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
=======
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import CompanyList from "../Components/ProductList/CompanyList";
import ProductList from "../Components/ProductList/ProductList";
import {
  useGetLastUpdateInfoQuery,
  useUpdateMutation,
} from "../services/update";
import { convertDateToString } from "../functions/convertDateToString";
import OrangeGradientButton from "../Components/Buttons/OrangeGradientButton";
>>>>>>> 961540a9bb5d4da20ce9d16a8d57a659ce2bd010

export const UpdateProducts = () => {
  const { data, error, isLoading } = useGetLastUpdateInfoQuery();

  const [updateProductsList] = useUpdateMutation();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const textContainer = useSelector((state) => state.language.textContainer);
<<<<<<< HEAD
  const pageDictionary = {
=======
  const language = useSelector((state) => state.language.language);

  const pageDictionry = {
>>>>>>> 961540a9bb5d4da20ce9d16a8d57a659ce2bd010
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
<<<<<<< HEAD
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
=======
      {isLoading ? (
        <LoadingSpinner />
      ) : error || updateError ? (
        <div>{error.data.status + "\n" + updateError.data.status}</div>
      ) : data.isUpdating ? (
        <div>Update is currently working...</div>
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
              {`${pageDictionry.lastUpdateDone} ${
                data.automatic ? pageDictionry.auto : pageDictionry.manual
              } ${pageDictionry.in} ${convertDateToString(
                data.date,
                language
              )}`}
            </Typography>
            <Typography variant="S16W400C65676b">
              {data.failed
                ? pageDictionry.updateFailed
                : pageDictionry.completeSuccess}
            </Typography>
          </Box>
          <ProductList list={data.phones} />
          <br></br>
          <CompanyList list={data.companies} />
          <OrangeGradientButton
            color="red"
            onClick={() => handleUpdateProducts()}
          />
        </div>
      )}
>>>>>>> 961540a9bb5d4da20ce9d16a8d57a659ce2bd010
    </CustomAppBar>
  );
};
