import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { Tabbar } from "../Components/Tabbar/Tabbar";

import {
  useGetPhoneSpecsQuery,
  useGetSimilarPhonesQuery,
} from "../services/phones";
import { ProductSpecsScreen } from "./ProductProfileTabs/10_ProductSpecs";

export const ProductProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("pid");

  const { isLoading, error, isFetching, data } = useGetPhoneSpecsQuery(paramId);
  const textContainer = useSelector((state) => state.language.textContainer);
  const [value, setValue] = React.useState(0);
  const pageDictionary = {
    reviews: textContainer.tabBarReviews,
    specs: textContainer.tabBarSpecs,
    QnA: textContainer.tabBarQuestionsAndAnswers,
  };

  const tabBarArray = [
    pageDictionary.reviews,
    pageDictionary.specs,
    pageDictionary.QnA,
  ];

  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <CustomAppBar
          showBackBtn
          englishName
          showLabel
          label={data.name}
          showSearch
          showProfile
        >
          <Box
            sx={{
              padding: "0px 6px",
            }}
          >
            <Tabbar
              arrayOfTabs={tabBarArray}
              value={value}
              setValue={setValue}
            />
            {value === 1 ? (
              <ProductSpecsScreen data={data}></ProductSpecsScreen>
            ) : null}
          </Box>
        </CustomAppBar>
      )}
    </React.Fragment>
  );
};
