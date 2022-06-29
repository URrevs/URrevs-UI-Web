import { useTheme } from "@emotion/react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { StickyTabbar } from "../Components/Tabbar/Desktop/StickyTabbar";
import { PathTabbar } from "../Components/Tabbar/PathTabbar";
import ROUTES_NAMES from "../RoutesNames";
import { useGetCompanyStatsInfoQuery } from "../services/companies";
export const CompanyProfile = () => {
  const isMobile = useTheme().isMobile;

  const [searchParams, setSearchParams] = useSearchParams();
  const companyId = searchParams.get("cid");

  const {
    isLoading: companyStatsIsLoading,
    error: companyStatsError,
    isFetching: companyStatsIsFetching,
    data: companyStatsData,
  } = useGetCompanyStatsInfoQuery(companyId);

  const textContainer = useSelector((state) => state.language.textContainer);
  const pageDictionary = {
    tabBarReviews: textContainer.tabBarReviews,
    tabBarQuestionsAndAnswers: textContainer.tabBarQuestionsAndAnswers,
    company: textContainer.company,
  };

  const pageDictionry = {
    reviews: textContainer.tabBarReviews,
    questions: textContainer.tabBarQuestionsAndAnswers,
  };

  const listOfItems = [
    {
      title: pageDictionry.reviews,
      to: `${ROUTES_NAMES.REVIEWS}?cid=${companyId}`,
    },
    {
      title: pageDictionry.questions,
      to: `${ROUTES_NAMES.QUESTIONS}?cid=${companyId}`,
    },
  ];

  return (
    <React.Fragment>
      {companyStatsIsLoading ? (
        <LoadingSpinner />
      ) : companyStatsError ? (
        <div>{companyStatsError.data.status}</div>
      ) : (
        <CustomAppBar
          label={companyStatsData.name}
          showLabel
          showBackBtn
          showProfile
          englishName
          showSearch
        >
          {
            <Fragment>
              {!isMobile ? (
                <StickyTabbar
                  arrayOfTabs={listOfItems}
                  userName={companyStatsData.name}
                ></StickyTabbar>
              ) : (
                <PathTabbar arrayOfTabs={listOfItems} />
              )}
              <Outlet />
            </Fragment>
          }
        </CustomAppBar>
      )}
    </React.Fragment>
  );
};
