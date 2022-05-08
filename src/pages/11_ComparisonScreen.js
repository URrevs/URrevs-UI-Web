import React from "react";
import { useSelector } from "react-redux";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import ProductDetailsTable from "../Components/ProductDetailsTable";

export const ComparisonScreen = () => {
  const textContainer = useSelector((state) => state.language.textContainer);
  return (
    <CustomAppBar showBackBtn showLabel label={textContainer.comparison}>
      <ProductDetailsTable isComparison={true} />
    </CustomAppBar>
  );
};
