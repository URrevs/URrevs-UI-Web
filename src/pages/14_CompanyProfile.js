import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../Components/Loaders/LoadingSpinner";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import { CompanyOverviewCard } from "../Components/OverviewCard/CompanyOverviewCard";
import { Tabbar } from "../Components/Tabbar/Tabbar";
import ROUTES_NAMES from "../RoutesNames";
import { useGetCompanyStatsInfoQuery } from "../services/companies";
import { CompanyReviews } from "./CompanyProfileTabs/CompanyReviews";
export const CompanyProfile = () => {
  const [value, setValue] = React.useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const companyId = searchParams.get("cid");
  const { isLoading, error, isFetching, data } =
    useGetCompanyStatsInfoQuery(companyId);
  const textContainer = useSelector((state) => state.language.textContainer);
  const pageDictionary = {
    tabBarReviews: textContainer.tabBarReviews,
    tabBarQuestionsAndAnswers: textContainer.tabBarQuestionsAndAnswers,
    company: textContainer.company,
  };
  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <CustomAppBar
          label={data.name}
          showLabel
          showBackBtn
          showProfile
          englishName
          showSearch
        >
          <Tabbar
            arrayOfTabs={[
              pageDictionary.tabBarReviews,
              pageDictionary.tabBarQuestionsAndAnswers,
            ]}
            value={value}
            setValue={setValue}
          />
          {value === 0 ? (
            <CompanyReviews
              viewer={data.views}
              companyRating={data.rating.toPrecision(2)}
              companyName={data.name}
              type={pageDictionary.company}
            />
          ) : (
            <div>كستنائي</div>
          )}
        </CustomAppBar>
      )}
    </React.Fragment>
  );
};
