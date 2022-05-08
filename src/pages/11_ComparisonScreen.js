import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ProductDetailsTable from "../Components/ProductDetailsTable";
import { useGetPhoneSpecsQuery } from "../services/phones";

export const ComparisonScreen = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  // const compareId = useSelector((state) => state.compare.compareId);
  // const productId = useSelector((state) => state.compare.productId);
  const [searchParams, setSearchParams] = useSearchParams();
  const pid = searchParams.get("pid");
  const cid = searchParams.get("cid");
  console.log(pid);
  console.log(cid);
  const {
    isLoading: compLoading,
    error: compError,
    data: compData,
  } = useGetPhoneSpecsQuery(cid);
  const {
    isLoading: productLoading,
    error: productError,
    data: productData,
  } = useGetPhoneSpecsQuery(pid);

  return (
    <CustomAppBar showBackBtn showLabel label={textContainer.comparison}>
      {productLoading || compLoading ? (
        <LoadingSpinner />
      ) : compError || productError ? (
        <div>{compError.data.status + productError.data.status}</div>
      ) : (
        <ProductDetailsTable
          comparedPhoneData={compData}
          phoneData={productData}
          isComparison={true}
        />
      )}
    </CustomAppBar>
  );
};
