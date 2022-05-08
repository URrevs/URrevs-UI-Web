import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { CompanyOverviewCard } from "../../Components/OverviewCard/CompanyOverviewCard";
import CompanyReview from "../../Components/ReviewCard/CompanyReview";

export const CompanyReviews = ({
  viewer,
  companyRating,
  companyName,
  type,
}) => {
  const textContainer = useSelector((state) => state.language.textContainer);
  const pageDictionary = {
    tabBarReviews: textContainer.tabBarReviews,
    company: textContainer.company,
  };
  return (
    //TODO VIRTUAL SCROLLING + CompanyReviewCard
    <Box sx={{ marginTop: "7px" }}>
      <CompanyOverviewCard
        viewer={viewer}
        companyRating={companyRating}
        companyName={companyName}
        type={type}
      />
      <Typography variant="S18W700C000000">
        {pageDictionary.tabBarReviews + ":"}
      </Typography>
      {/* <CompanyReview /> */}
    </Box>
  );
};
