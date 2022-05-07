import React from "react";
import { useSearchParams } from "react-router-dom";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";

export const ProductProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("pid");
  console.log(paramId);
  return (
    <React.Fragment>
      <CustomAppBar
        showBackBtn
        englishName
        showLabel
        label="Nokia 7 Plus"
        showProfile
        showSearch
      ></CustomAppBar>
    </React.Fragment>
  );
};
