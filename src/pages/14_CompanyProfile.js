import { Box } from "@mui/material";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { CompanyOverviewCard } from "../Components/OverviewCard/CompanyOverviewCard";
import { StickyTabbar } from "../Components/Tabbar/Desktop/StickyTabbar";
import { Tabbar } from "../Components/Tabbar/Tabbar";
import ROUTES_NAMES from "../RoutesNames";
import { useGetCompanyStatsInfoQuery } from "../services/companies";
import { CompanyQuestions } from "./CompanyProfileTabs/CompanyQuestions";
import { CompanyReviews } from "./CompanyProfileTabs/CompanyReviews";
export const CompanyProfile = () => {
  const [value, setValue] = React.useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const companyId = searchParams.get("cid");

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
      <CustomAppBar
        label="company name"
        showLabel
        showBackBtn
        showProfile
        englishName
        showSearch
      >
        {
          <Fragment>
            <StickyTabbar
              arrayOfTabs={listOfItems}
              userName="company"
            ></StickyTabbar>
            <Outlet />
          </Fragment>
        }
      </CustomAppBar>
    </React.Fragment>
  );
};
