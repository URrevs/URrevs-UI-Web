import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ProductDetailsTable from "../Components/ProductDetailsTable";
import {
  useGetPhoneSpecsQuery,
  useIndicateUserComparingMutation,
} from "../services/phones";

export const ComparisonScreen = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  // const compareId = useSelector((state) => state.compare.compareId);
  // const productId = useSelector((state) => state.compare.productId);
  const [searchParams, setSearchParams] = useSearchParams();
  const pid = searchParams.get("pid");
  const cid = searchParams.get("cid");

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

  const [indicateComparison] = useIndicateUserComparingMutation();

  useEffect(() => {
    try {
      indicateComparison({ pid1: pid, pid2: cid });
    } catch (e) {
      console.log(e);
    }
  }, []);

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
