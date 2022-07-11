import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrangeGradientButton from "../Components/Buttons/OrangeGradientButton";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import CompanyList from "../Components/ProductList/CompanyList";
import ProductList from "../Components/ProductList/ProductList";
import { convertDateToString } from "../functions/convertDateToString";
import {
  useGetLastUpdateInfoQuery,
  useUpdateMutation,
} from "../services/update";
import { FormSubmitButton } from "./PostingScreen/FormSubmitButton";

export const UpdateProducts = () => {
  const [refetch, setRefetch] = useState(false);

  const { data, error, isLoading } = useGetLastUpdateInfoQuery(refetch, {
    refetchOnMountOrArgChange: true,
  });

  const [updateProductsList] = useUpdateMutation();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const textContainer = useSelector((state) => state.language.textContainer);
  const language = useSelector((state) => state.language.language);

  const pageDictionary = {
    updateProductsList: textContainer.updateProductsList,
    lastUpdateDone: textContainer.lastUpdateWasDone,
    updating: textContainer.updating,
    in: textContainer.inPreposition,
    auto: textContainer.automatically,
    manual: textContainer.manually,
    completeSuccess: textContainer.successfullyCompleted,
    noUpdateOperationsYet: textContainer.noUpdateOperationsYet,
    updateFailed: textContainer.updateHasNotBeenCompleted,
    updateProducts: textContainer.updateProducts,
    updating: textContainer.updating,
  };

  const handleUpdateProducts = async () => {
    try {
      setButtonLoading(true);
      await updateProductsList();
      await setTimeout(() => {
        setButtonLoading(false);
        setRefetch(!refetch);
      }, 1000);
    } catch (e) {
      setButtonLoading(false);
      setUpdateError(e.data.status);
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
      ) : updateError ? (
        <div>{updateError}</div>
      ) : (
        <div style={{ margin: "0px 14.6px" }}>
          {error ? (
            <Box>{pageDictionary.noUpdateOperationsYet}</Box>
          ) : (
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
                {data.isUpdating
                  ? pageDictionary.updating
                  : data.failed
                  ? pageDictionary.updateFailed
                  : pageDictionary.completeSuccess}
              </Typography>
            </Box>
          )}
          {!error && (
            <Box>
              <ProductList list={data.phones} />
              <br></br>
              <CompanyList list={data.companies} />
            </Box>
          )}
          {!error && (data.isUpdating || buttonLoading) ? (
            <Box
              style={{
                bottom: 0,
                marginTop: 22,
              }}
            >
              <FormSubmitButton loading>
                {buttonLoading ? (
                  <LoadingSpinner size={20} />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <UpdateOutlinedIcon
                      sx={{ fontSize: "28", marginRight: "5px" }}
                    />
                    <Typography variant="S18W700Cffffff">
                      {pageDictionary.updating}
                    </Typography>
                  </div>
                )}
              </FormSubmitButton>
            </Box>
          ) : (
            <Box
              style={{
                bottom: 0,
                marginTop: 22,
              }}
            >
              <OrangeGradientButton
                color="red"
                style={{
                  width: "100%",
                }}
                onClick={() => handleUpdateProducts()}
              >
                {buttonLoading ? (
                  <LoadingSpinner size={20} />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <UpdateOutlinedIcon
                      sx={{ fontSize: "28", marginRight: "5px" }}
                    />
                    <Typography variant="S18W700Cffffff">
                      {pageDictionary.updateProducts}
                    </Typography>
                  </div>
                )}
              </OrangeGradientButton>
            </Box>
          )}
        </div>
      )}
    </CustomAppBar>
  );
};
