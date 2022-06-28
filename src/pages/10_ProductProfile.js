import { Box } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { StickyTabbar } from "../Components/Tabbar/Desktop/StickyTabbar";
import { Tabbar } from "../Components/Tabbar/Tabbar";
import ROUTES_NAMES from "../RoutesNames";

import {
  useGetPhoneSpecsQuery,
  useGetSimilarPhonesQuery,
} from "../services/phones";
import { ProductSpecsScreen } from "./ProductProfileTabs/10_ProductSpecs";
import { ProductReviews } from "./ProductProfileTabs/12_ProductReviews";
import { ProductQuestions } from "./ProductProfileTabs/13_ProductQuestions";

export const ProductProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("pid");

  let { isLoading, error, isFetching, data } = useGetPhoneSpecsQuery(paramId);

  const textContainer = useSelector((state) => state.language.textContainer);

  const pageDictionary = {
    reviews: textContainer.tabBarReviews,
    specs: textContainer.tabBarSpecs,
    QnA: textContainer.tabBarQuestionsAndAnswers,
  };

  const pageDictionry = {
    reviews: pageDictionary.reviews,
    specs: pageDictionary.specs,
    qAnda: pageDictionary.QnA,
  };

  const listOfItems = [
    {
      title: pageDictionry.reviews,
      to: `${ROUTES_NAMES.REVIEWS}?pid=${paramId}`,
    },
    {
      title: pageDictionry.specs,
      to: `${ROUTES_NAMES.SPECS}?pid=${paramId}`,
    },
    {
      title: pageDictionry.qAnda,
      to: `${ROUTES_NAMES.QUESTIONS}?pid=${paramId}`,
    },
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
          <Fragment>
            <StickyTabbar
              hasParent={false}
              arrayOfTabs={listOfItems}
              userName={data.name}
            />
            <Outlet />
          </Fragment>
        </CustomAppBar>
      )}
    </React.Fragment>
  );
};
